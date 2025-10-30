// Navigation functionality for responsive menu

const hamburger = document.getElementById('hamburger');
const closeBtn = document.getElementById('close-btn');
const navMenu = document.getElementById('nav-menu');

// Toggle mobile menu with hamburger
hamburger.addEventListener('click', () => {
    navMenu.classList.add('show');
    hamburger.classList.add('active');
    closeBtn.style.display = 'block';
});

// Close menu with X button
closeBtn.addEventListener('click', () => {
    navMenu.classList.remove('show');
    hamburger.classList.remove('active');
    closeBtn.style.display = 'none';
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navMenu.classList.remove('show');
            hamburger.classList.remove('active');
            closeBtn.style.display = 'none';
        }
    });
});

// Close menu when resizing to larger screen
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        navMenu.classList.remove('show');
        hamburger.classList.remove('active');
        closeBtn.style.display = 'none';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    const isClickOnCloseBtn = closeBtn.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && !isClickOnCloseBtn && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        hamburger.classList.remove('active');
        closeBtn.style.display = 'none';
    }
});