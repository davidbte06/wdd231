// scripts/getdates.js

/**
 * Sets the footer copyright year and last modification date.
 */
function setFooterDates() {
    // Set current year for copyright
    const currentYear = new Date().getFullYear();
    const copyrightYearElement = document.getElementById("copyright-year");
    if (copyrightYearElement) {
        copyrightYearElement.textContent = currentYear;
    }

    // Set last modified date
    const lastModifiedDate = document.lastModified;
    const lastModifiedElement = document.getElementById("last-modified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = lastModifiedDate;
    }
}

// Run the function once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", setFooterDates);