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
                menuButton.textContent = "✕";
            } else {
                menuButton.textContent = "☰";
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
        if (!cardsContainer) return;

        cardsContainer.innerHTML = "";

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

// scripts/main.js

document.addEventListener("DOMContentLoaded", () => {

    // ===========================================
    // --- NEW HOME PAGE LOGIC ---
    // ===========================================

    // --- OpenWeatherMap API ---

    const apiKey = "391d52357aac6ade043c2369fadc26c4";

    // Coordinates for Timbuktu, Mali
    const lat = "16.77";
    const lon = "-3.00";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function fetchWeather() {
        // Check if we are on the home page
        const currentContainer = document.getElementById("weather-current");
        if (!currentContainer) return;

        try {
            // Fetch current weather
            const response = await fetch(weatherUrl);
            if (!response.ok) throw new Error(`Current Weather Error: ${response.status}`);
            const data = await response.json();
            displayCurrentWeather(data);

            // Fetch 3-day forecast
            const forecastResponse = await fetch(forecastUrl);
            if (!forecastResponse.ok) throw new Error(`Forecast Error: ${forecastResponse.status}`);
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);

        } catch (error) {
            console.error("Error fetching weather:", error);
            currentContainer.innerHTML = "<p>Weather data not available.</p>";
        }
    }

    function displayCurrentWeather(data) {
        const currentContainer = document.getElementById("weather-current");
        const icon = data.weather[0].icon;
        const desc = data.weather[0].description;
        const temp = data.main.temp;

        currentContainer.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}" width="75" height="75">
            <p>${temp.toFixed(0)}°C</p>
            <p>${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        `;
    }

    function displayForecast(data) {
        const forecastContainer = document.getElementById("weather-forecast");
        forecastContainer.innerHTML = "";

        // Filter for one forecast per day (around noon)
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        dailyForecasts.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = day.main.temp.toFixed(0);

            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <strong>${dayName}</strong>
                    <p>${temp}°C</p>
                </div>
            `;
        });
    }

    // --- Member Spotlights ---
    const dataURL = "data/members.json";

    async function getSpotlights() {
        const spotlightContainer = document.getElementById("spotlight-container");
        if (!spotlightContainer) return;

        try {
            const response = await fetch(dataURL);
            if (!response.ok) throw new Error("Failed to fetch member data");
            const members = await response.json();

            // 1. Filter for Gold (3) or Silver (2) members
            const goldAndSilver = members.filter(member => member.membershipLevel >= 2);

            // 2. Shuffle the filtered array
            const shuffled = goldAndSilver.sort(() => 0.5 - Math.random());

            // 3. Get first 3 (or fewer if not available)
            const spotlights = shuffled.slice(0, 3);

            // 4. Display them
            displaySpotlights(spotlights);

        } catch (error) {
            console.error("Error loading spotlights:", error);
            spotlightContainer.innerHTML = "<p>Member spotlights not available.</p>";
        }
    }

    function displaySpotlights(spotlights) {
        const container = document.getElementById("spotlight-container");
        container.innerHTML = "";

        spotlights.forEach(member => {
            let levelText = member.membershipLevel === 3 ? "Gold" : "Silver";

            container.innerHTML += `
                <section class="spotlight-card">
                    <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="75">
                    <h4>${member.name}</h4>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website.replace(/^(https?:\/\/)?(www\.)?/, '')}</a>
                    <p><strong>${levelText} Member</strong></p>
                </section>
            `;
        });
    }

    // Run the new home page functions
    fetchWeather();
    getSpotlights();

});