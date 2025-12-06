// scripts/main.js

const currentYear = new Date().getFullYear();
document.querySelector('#year').textContent = currentYear;

document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Hamburger Menu
const menuBtn = document.querySelector('#menu-btn');
const navLinks = document.querySelector('#nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.textContent = navLinks.classList.contains('open') ? 'X' : '☰';
});