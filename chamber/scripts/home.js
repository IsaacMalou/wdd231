// --- Core UI Logic (Hamburger, Dark Mode, Footer) ---
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const hamburgerMenu = document.querySelector('#hamburger-menu');
const primaryNav = document.querySelector('#primary-nav');

hamburgerMenu.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    hamburgerMenu.textContent = primaryNav.classList.contains('open') ? '❌' : '☰';
});

const darkModeToggle = document.querySelector('#dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});


// --- OpenWeatherMap API Logic (Juba coordinates) ---
const apiKey = 'a290ef539dc31312cbb7e340af1fed75';
const lat = 4.85;
const lon = 31.58;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeatherData() {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (weatherResponse.ok && forecastResponse.ok) {
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();
            displayWeather(weatherData, forecastData);
        }
    } catch (error) {
        console.error('Weather API Error:', error);
    }
}

function displayWeather(current, forecast) {
    document.querySelector('#current-temp').textContent = Math.round(current.main.temp);
    document.querySelector('#weather-desc').textContent = current.weather[0].description;

    const iconCode = current.weather[0].icon;
    document.querySelector('#weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    document.querySelector('#weather-icon').alt = current.weather[0].description;

    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = '';

   
    const threeDayForecast = [];
    const seenDates = new Set();
    const todayString = new Date().toISOString().split('T')[0];

    for (let item of forecast.list) {
        const dateString = item.dt_txt.split(' ')[0];
        if (dateString !== todayString && !seenDates.has(dateString)) {
            threeDayForecast.push(item);
            seenDates.add(dateString);
            if (threeDayForecast.length === 3) break;
        }
    }

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);

        forecastContainer.innerHTML += `
            <div>
                <strong>${dayName}</strong><br>
                ${temp}&deg;F
            </div>
        `;
    });
}

// --- Member Spotlight Logic ---
const membersUrl = 'data/members.json';

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error("Failed to load member dataset for spotlights:", error);
    }
}

function displaySpotlights(members) {
    // Filter for levels 2 and 3
    const qualifiedMembers = members.filter(
        member => member.membershipLevel === 2 || member.membershipLevel === 3
    );

    // Shuffle the array
    qualifiedMembers.sort(() => 0.5 - Math.random());

    // Pick 3
    const selectedMembers = qualifiedMembers.slice(0, 3);
    const container = document.querySelector('#spotlight-container');
    container.innerHTML = "";

    selectedMembers.forEach(member => {
        let levelText = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

        container.innerHTML += `
            <div class="spotlight-item">
                <div class="image-placeholder" style="margin-bottom: 1rem;">
                    <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="120" height="80">
                </div>
                <h3>${member.name}</h3>
                <p class="spotlight-level">${levelText}</p>
                <div class="card-info">
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><strong>Web:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://www.', '')}</a></p>
                </div>
            </div>
        `;
    });
}

// Initialize fetches
getWeatherData();
getSpotlightMembers();