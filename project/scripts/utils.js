/* =========================================================
   Matrix Tech - ES Module Script (utils.js)
   Controls Navigation, Dark Theme, Data Fetching, & Modal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initFooterDates();
    initModalStructure();
    fetchHardwareAndServices();
});

/* --- 1. Responsive Navigation Toggle --- */
function initNavigation() {
    const menuToggle = document.querySelector('#menu-toggle');
    const primaryNav = document.querySelector('#primary-nav');

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', () => {
            primaryNav.classList.toggle('open');
            const isOpen = primaryNav.classList.contains('open');
            menuToggle.textContent = isOpen ? '✕' : '☰';
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }
}

/* --- 2. Dark Theme Toggle with LocalStorage --- */
function initThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    const storedTheme = localStorage.getItem('matrix_theme');

    // Apply saved theme preference on load
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            themeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('matrix_theme', isDark ? 'dark' : 'light');
        });
    }
}

/* --- 3. Dynamic Footer Dates --- */
function initFooterDates() {
    const yearSpan = document.querySelector('#currentyear');
    const modSpan = document.querySelector('#lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (modSpan) {
        modSpan.textContent = `Last Modified: ${document.lastModified}`;
    }
}

/* --- 4. Asynchronous Data Fetching (Rubric Requirement) --- */
async function fetchHardwareAndServices() {
    const inventoryContainer = document.querySelector('#hardware-inventory');
    if (!inventoryContainer) return;

    try {
        const response = await fetch('./data/services.json');

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayInventory(data, inventoryContainer);
    } catch (error) {
        console.error('Data Fetching Failed:', error);
        inventoryContainer.innerHTML = `
            <div class="error-message">
                <p>⚠️ Unable to load services inventory at this moment. Please check your connection and try again.</p>
            </div>
        `;
    }
}

/* --- 5. Dynamic Content Generation using Template Literals --- */
function displayInventory(items, container) {
    container.innerHTML = ''; // Clear container

    // Array method: forEach processing at least 15 items
    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'inventory-card';

        // Render 4+ distinct properties: Image, Category (badge), Name, Price, Specs
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="250">
            <span class="badge">${item.category}</span>
            <h3>${item.name}</h3>
            <p class="price">${item.price}</p>
            <p><strong>Key Specs:</strong> ${item.specs}</p>
            <button class="btn btn-secondary view-details-btn" data-id="${item.id}">View Details</button>
        `;

        // Attach modal trigger event listener
        const detailsBtn = card.querySelector('.view-details-btn');
        detailsBtn.addEventListener('click', () => openModal(item));

        container.appendChild(card);
    });
}

/* --- 6. Accessible Modal Dialog Mechanism --- */
function initModalStructure() {
    if (document.querySelector('#item-modal')) return;

    const modalHTML = `
        <dialog id="item-modal" class="custom-modal">
            <div class="modal-content">
                <button id="close-modal" aria-label="Close dialog">✕</button>
                <div id="modal-body"></div>
            </div>
        </dialog>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.querySelector('#item-modal');
    const closeBtn = document.querySelector('#close-modal');

    closeBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}

function openModal(item) {
    const modal = document.querySelector('#item-modal');
    const modalBody = document.querySelector('#modal-body');

    modalBody.innerHTML = `
        <span class="badge">${item.category}</span>
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}" style="width:100%; max-height:220px; object-fit:cover; border-radius:6px; margin: 1rem 0;">
        <p class="price" style="font-size:1.4rem; font-weight:700; color:var(--secondary-color);">${item.price}</p>
        <p><strong>Technical Specifications:</strong> ${item.specs}</p>
        <p style="margin-top:0.75rem;">${item.description}</p>
        <div style="margin-top: 1.5rem;">
            <a href="contact.html" class="btn btn-primary" style="display:inline-block; width:100%; text-align:center;">Inquire About This Item</a>
        </div>
    `;

    modal.showModal();
}