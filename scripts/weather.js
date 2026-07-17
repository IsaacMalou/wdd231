const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=4.85&lon=31.58&units=imperial&appid=YOUR_API_KEY_HERE';


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}


function displayResults(data) {

    currentTemp.innerHTML = `${data.main.temp}&deg;F`;


    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


    let desc = data.weather[0].description;


    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}


apiFetch();