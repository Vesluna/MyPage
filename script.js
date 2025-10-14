// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
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
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// CTA button interaction
const ctaBtn = document.getElementById('cta-btn');
ctaBtn.addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Add pulse effect
    ctaBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        ctaBtn.style.transform = 'scale(1)';
    }, 150);
});

// EmailJS initialization - Replace 'YOUR_PUBLIC_KEY' with your EmailJS public key
emailjs.init('pTkE3YKT3fghtLjN5');

// Contact form handling with actual email sending via EmailJS
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Prepare form data with vars matching the template
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const messageValue = document.getElementById('message').value;
    const timeValue = Date.now(); // Current timestamp in milliseconds
    
    const formData = {
        name: nameValue,
        email: emailValue,
        message: messageValue,
        time: timeValue
    };
    
    // Send email using EmailJS with provided service and template IDs
    emailjs.send('service_9953ogi', 'template_m0ndequ', formData)
        .then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, (error) => {
            console.error('EmailJS error:', error);
            alert('Failed to send message. Please try again later.');
            button.textContent = originalText;
            button.disabled = false;
        });
});

// Project buttons
const downloadBtn = document.getElementById('download-btn');
const playBtn = document.getElementById('play-btn');
const modal = document.getElementById('discord-modal');
const closeSpan = document.querySelector('.close');
const joinBtn = document.getElementById('join-discord');
const noBtn = document.getElementById('no-join');

const robloxModal = document.getElementById('roblox-modal');
const closeRoblox = document.querySelector('.close-roblox');
const continueRoblox = document.getElementById('continue-roblox');
const nevermindRoblox = document.getElementById('nevermind-roblox');
const robloxLink = 'https://www.roblox.com/games/placeholder'; // Replace with actual Roblox link

downloadBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

playBtn.addEventListener('click', () => {
    robloxModal.style.display = 'block';
});

closeSpan.addEventListener('click', () => {
    modal.style.display = 'none';
});

noBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

joinBtn.addEventListener('click', () => {
    window.location.href = 'https://discord.gg/placeholder'; // Replace with actual Discord invite link
    modal.style.display = 'none';
});

closeRoblox.addEventListener('click', () => {
    robloxModal.style.display = 'none';
});

nevermindRoblox.addEventListener('click', () => {
    robloxModal.style.display = 'none';
});

continueRoblox.addEventListener('click', () => {
    window.location.href = robloxLink;
    robloxModal.style.display = 'none';
});

// Intersection Observer for animations
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

// Observe project cards and sections
document.querySelectorAll('.project-card, .music-card, .about, .contact, .music').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add floating particles effect
function createParticles() {
    const particles = document.createElement('div');
    particles.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particles);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(0, 255, 136, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${10 + Math.random() * 10}s infinite linear;
            animation-delay: ${Math.random() * 10}s;
        `;
        particles.appendChild(particle);
    }
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

createParticles();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.classList.add('loaded');
}); 
