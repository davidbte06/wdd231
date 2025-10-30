// Dynamic date functionality

// Set current year in footer
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

// Set last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;