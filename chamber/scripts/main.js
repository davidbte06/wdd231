// scripts/main.js

document.addEventListener("DOMContentLoaded", () => {

    // --- Hamburger Menu Logic ---
    const menuButton = document.getElementById("menu-button");
    const nav = document.querySelector("nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");
            // Toggle button icon
            if (nav.classList.contains("open")) {
                menuButton.textContent = "✕"; // Close icon
            } else {
                menuButton.textContent = "☰"; // Hamburger icon
            }
        });
    }

    // --- Directory Page Logic ---

    // DOM Elements
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");
    const cardsContainer = document.getElementById("member-cards-container");

    // JSON Data URL
    const dataURL = "data/members.json";

    /**
     * Fetches and displays member data.
     */
    async function getMembers() {
        try {
            const response = await fetch(dataURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayMembers(data);
        } catch (error) {
            console.error("Error fetching member data:", error);
            if (cardsContainer) {
                cardsContainer.innerHTML = "<p>Error loading member data. Please try again later.</p>";
            }
        }
    }

    /**
     * Renders member data into the container.
     * @param {Array} members - An array of member objects.
     */
    function displayMembers(members) {
        if (!cardsContainer) return; // Exit if container not on this page

        cardsContainer.innerHTML = ""; // Clear existing content

        members.forEach(member => {
            let card = document.createElement("section");
            card.className = "member-card";

            // Determine membership level text
            let levelText = "Member";
            if (member.membershipLevel === 2) {
                levelText = "Silver";
            } else if (member.membershipLevel === 3) {
                levelText = "Gold";
            }

            // Set the inner HTML for the card
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="300" height="150">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">${member.website.replace(/^(https_?:\/\/)?(www\.)?/, '')}</a>
                <p class="membership-level">Membership: ${levelText}</p>
                <p class="description">${member.description || ''}</p>
            `;

            cardsContainer.appendChild(card);
        });
    }

    // Add event listeners for view toggles (only if the elements exist)
    if (gridViewButton && listViewButton && cardsContainer) {
        gridViewButton.addEventListener("click", () => {
            cardsContainer.classList.add("grid");
            cardsContainer.classList.remove("list");
            gridViewButton.classList.add("active");
            listViewButton.classList.remove("active");
        });

        listViewButton.addEventListener("click", () => {
            cardsContainer.classList.add("list");
            cardsContainer.classList.remove("grid");
            listViewButton.classList.add("active");
            gridViewButton.classList.remove("active");
        });

        // Initial data load for the directory page
        getMembers();
    }

})