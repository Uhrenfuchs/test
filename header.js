document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navContainer.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
        }
    });

    // Dropdown Logic
    dropdowns.forEach(dropdown => {
        // Desktop Hover
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                dropdown.classList.add('active');
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                dropdown.classList.remove('active');
            }
        });

        // Mobile Click
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navContainer.classList.remove('active');
        }
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});