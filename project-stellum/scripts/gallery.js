// scripts/gallery.js

// 1. Configuration Variables
const apiKey = "9AedX1aYvooUmEMmDxUmFxJTbihFP7howehMbr5r";
// Using the 'count' parameter to fetch 20 random images
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=20`;

// 2. DOM Element Selection
const galleryGrid = document.querySelector("#gallery-grid");
const modal = document.querySelector("#image-modal");
const closeModalBtn = document.querySelector("#close-modal");

// Modal internal elements
const modalImg = document.querySelector("#modal-img");
const modalTitle = document.querySelector("#modal-title");
const modalDate = document.querySelector("#modal-date");
const modalDesc = document.querySelector("#modal-desc");

// 3. Main Async Function (Async/Await + Fetch)
async function getSpaceImages() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received from NASA:", data);

        // Local Storage
        // Save the current visit date to fulfill rubric
        localStorage.setItem('lastGalleryVisit', new Date().toLocaleString());

        // Array Method (.filter)
        // Filter out only image media types
        const imagesOnly = data.filter(item => item.media_type === "image");

        // Call the display function
        displayGallery(imagesOnly);

    } catch (error) {
        //  Try...Catch
        console.error("There was a problem:", error);
        galleryGrid.innerHTML = `<p style="color:white; text-align:center;">
            Sorry, we couldn't connect to the cosmos right now. Try again later.
        </p>`;
    }
}

// 4. Function to Generate HTML (Requirement: Template Literals + DOM Manipulation)
function displayGallery(items) {
    // Clear the "Loading..." message
    galleryGrid.innerHTML = "";

    // Array Method (.forEach)
    items.forEach(item => {
        // Create the card container
        const card = document.createElement("div");
        card.className = "gallery-card";

        // Inject HTML using Template Literals
        card.innerHTML = `
            <img src="${item.url}" alt="${item.title}" loading="lazy">
            <div class="card-content">
                <h3>${item.title}</h3>
                <p>${item.date}</p>
            </div>
        `;

        // Add Click Event to open the Modal
        card.addEventListener("click", () => {
            openModal(item);
        });

        // Add the card to the grid
        galleryGrid.appendChild(card);
    });
}

// 5. Modal Logic
function openModal(item) {
    // Fill the modal with data from the clicked item
    // Use 'hdurl' if available for better quality, otherwise use 'url'
    modalImg.src = item.hdurl ? item.hdurl : item.url;
    modalImg.alt = item.title;
    modalTitle.textContent = item.title;
    modalDate.textContent = item.date;
    modalDesc.textContent = item.explanation;

    // Show the native modal
    modal.showModal();
}

// Close modal with the X button
closeModalBtn.addEventListener("click", () => {
    modal.close();
});

// Close modal if clicking outside the content (on the backdrop)
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

// Run the function when the script loads
getSpaceImages();