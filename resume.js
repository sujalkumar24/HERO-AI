// Print functionality
document.getElementById('print-btn').addEventListener('click', function() {
    window.print();
});

// Smooth scrolling for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to project sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to project sections
document.querySelectorAll('.project').forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(20px)';
    project.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(project);
});

// Dynamic year update for copyright (if needed)
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright-year');
if (copyrightElement) {
    copyrightElement.textContent = currentYear;
}

// Add hover effects to project cards
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });

    project.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Skill highlighting animation
document.querySelectorAll('.skills li').forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.classList.add('skill-fade-in');
});

// Add CSS for skill animation
const style = document.createElement('style');
style.textContent = `
    .skill-fade-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Responsive navigation (if needed for larger resumes)
function toggleMenu() {
    const nav = document.querySelector('.nav-menu');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Add event listener for menu toggle if menu exists
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Form validation for contact form (if added later)
function validateForm() {
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (email && !email.value.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (message && message.value.trim() === '') {
        alert('Please enter a message.');
        return false;
    }

    return true;
}

// Attach form validation if form exists
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
}

// Theme toggle functionality (for future enhancement)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = body.classList.contains('dark-theme') ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
}

// Add theme toggle button functionality if exists
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize any charts or graphs (for future data visualization)
function initCharts() {
    // Placeholder for chart initialization
    console.log('Charts initialized');
}

// Call initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    // Any other initialization code
});
