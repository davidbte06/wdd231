// scripts/discover.js

// 1. Import the items from the JSON module
import { items } from '../data/items.mjs';

// 2. Handle the "Visitor Message" using LocalStorage
const messageContainer = document.getElementById('visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
    // First visit
    messageContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffTime = now - parseInt(lastVisit);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days

    if (diffDays < 1) {
        messageContainer.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
        messageContainer.textContent = "You last visited 1 day ago.";
    } else {
        messageContainer.textContent = `You last visited ${diffDays} days ago.`;
    }
}

// Store the current date for the next visit
localStorage.setItem('lastVisit', now);

// 3. Generate the Discover Cards
const gridContainer = document.getElementById('discover-grid');

function displayItems(items) {
    gridContainer.innerHTML = ''; // Clear container

    items.forEach((item, index) => {
        const card = document.createElement('section');
        card.className = 'discover-card';

        // Add a class for specific grid placement (card1, card2, etc.)
        card.classList.add(`card-${index + 1}`);

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more">Learn More</button>
        `;

        gridContainer.appendChild(card);
    });
}

// Run the display function
displayItems(items);