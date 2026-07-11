// Dynamic Footer Initialization Data
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Hamburger Responsive Menu Configuration
const hamburgerMenu = document.querySelector('#hamburger-menu');
const primaryNav = document.querySelector('#primary-nav');

hamburgerMenu.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    hamburgerMenu.textContent = primaryNav.classList.contains('open') ? '❌' : '☰';
});

// Dark Mode Theme Switching Capabilities
const darkModeToggle = document.querySelector('#dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// Directory Member Population Logic
const membersUrl = 'data/members.json';
const container = document.querySelector('#directory-container');
const btnGrid = document.querySelector('#grid-view');
const btnList = document.querySelector('#list-view');

async function fetchAndRenderMembers() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const membersData = await response.json();
        buildMemberCards(membersData);
    } catch (error) {
        console.error("Failed to load member dataset:", error);
        container.innerHTML = `<p class="error-msg">Error loading business directory data structure.</p>`;
    }
}

function buildMemberCards(members) {
    container.innerHTML = ""; // Purge existing internal elements

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        // Card Header Block Construction
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const bName = document.createElement('h2');
        bName.textContent = member.name;

        const bTag = document.createElement('p');
        bTag.classList.add('business-tag');
        bTag.textContent = member.otherInfo;

        cardHeader.appendChild(bName);
        cardHeader.appendChild(bTag);

        // Card Content Body Construction
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // This links the CSS content: attr(data-name) for List view
        cardBody.setAttribute('data-name', member.name);

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-placeholder');

        const logo = document.createElement('img');
        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `Logo placeholder for ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '120');
        logo.setAttribute('height', '80');
        imageWrapper.appendChild(logo);

        const infoBlock = document.createElement('div');
        infoBlock.classList.add('card-info');

        // Creating a clean email address from the business name
        const emailClean = member.name.toLowerCase().replace(/[^a-z0-9]/g, '');

        infoBlock.innerHTML = `
            <p><strong>EMAIL:</strong> info@${emailClean}.com</p>
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website.replace('https://', '')}</a></p>
        `;

        cardBody.appendChild(imageWrapper);
        cardBody.appendChild(infoBlock);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        container.appendChild(card);
    });
}

// Layout Modification Event Handling Interfaces
btnGrid.addEventListener('click', () => {
    container.className = 'grid-layout';
    btnGrid.classList.add('active-btn');
    btnList.classList.remove('active-btn');
});

btnList.addEventListener('click', () => {
    container.className = 'list-layout';
    btnList.classList.add('active-btn');
    btnGrid.classList.remove('active-btn');
});

fetchAndRenderMembers();