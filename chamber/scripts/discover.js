// scripts/discover.js
import { places } from '../data/places.mjs';

// --- 1. Populate the Grid ---
const gridContainer = document.getElementById('discover-grid');

places.forEach((place, index) => {
    // I assign a specific grid-area name to each card (card1, card2, etc.)
    const card = document.createElement('div');
    card.classList.add('discover-card');
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more">Learn More</button>
    `;

    gridContainer.appendChild(card);
});

// --- 2. LocalStorage Visit Message ---
const messageArea = document.getElementById('visit-message');
const msToDays = 84600000; // milliseconds in a day
const today = Date.now();
const lastVisit = localStorage.getItem('lastVisit');

if (!lastVisit) {
    messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysBetween = Math.floor((today - parseInt(lastVisit)) / msToDays);

    if (daysBetween < 1) {
        messageArea.textContent = "Back so soon! Awesome!";
    } else {
        messageArea.textContent = `You last visited ${daysBetween} ${daysBetween === 1 ? 'day' : 'days'} ago.`;
    }
}

// Update the last visit to today
localStorage.setItem('lastVisit', today.toString());