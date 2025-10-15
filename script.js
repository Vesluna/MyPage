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

// Notification popup function
function showNotification(message, type = 'info') {
    const modal = document.getElementById('notification-modal');
    const msgEl = document.getElementById('notification-message');
    
    msgEl.textContent = message;
    msgEl.style.color = type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#ffffff';
    
    modal.style.display = 'block';
}

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
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, (error) => {
            console.error('EmailJS error:', error);
            showNotification('Failed to send message. Please try again later.', 'error');
            button.textContent = originalText;
            button.disabled = false;
        });
});

// Generic Project Button Handler
document.addEventListener('DOMContentLoaded', () => {
    const projectButtons = document.querySelectorAll('.project-button');
    const discordModal = document.getElementById('discord-modal');
    const robloxModal = document.getElementById('roblox-modal');
    
    // Modal close handlers
    document.querySelector('.close').addEventListener('click', () => {
        discordModal.style.display = 'none';
    });
    document.getElementById('no-join').addEventListener('click', () => {
        discordModal.style.display = 'none';
    });
    document.getElementById('join-discord').addEventListener('click', () => {
        window.location.href = 'https://discord.gg/ZAUyBfndwU'; // Replace with actual Discord invite link
        discordModal.style.display = 'none';
    });
    
    document.querySelector('.close-roblox').addEventListener('click', () => {
        robloxModal.style.display = 'none';
    });
    document.getElementById('nevermind-roblox').addEventListener('click', () => {
        robloxModal.style.display = 'none';
    });
    document.getElementById('continue-roblox').addEventListener('click', () => {
        const robloxLink = 'https://www.roblox.com/games/83790723969991'; // Replace with actual Roblox link
        window.location.href = robloxLink;
        robloxModal.style.display = 'none';
    });

    // Notification modal close handlers
    document.querySelector('.close-notification').addEventListener('click', () => {
        document.getElementById('notification-modal').style.display = 'none';
    });
    document.getElementById('close-notification').addEventListener('click', () => {
        document.getElementById('notification-modal').style.display = 'none';
    });
    
    // Generic button event listeners
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const modalType = button.getAttribute('data-modal');
            const url = button.getAttribute('data-url');
            
            if (action === 'redirect' && url) {
                window.location.href = url;
            } else if (action === 'modal' && modalType) {
                if (modalType === 'discord') {
                    discordModal.style.display = 'block';
                } else if (modalType === 'roblox') {
                    robloxModal.style.display = 'block';
                }
                // Easy to add more modal types here
            }
            // Add more action types as needed, e.g., 'download-file', etc.
        });
    });
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    document.getElementById('home').scrollIntoView({
        behavior: 'smooth'
    });
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
            
            // Animate skill bars on intersection
            if (entry.target.classList.contains('skill-card')) {
                const bar = entry.target.querySelector('.bar');
                if (bar) {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                }
            }
        }
    });
}, observerOptions);

// Observe project cards, skill cards, music cards, top-song cards, and sections
document.querySelectorAll('.project-card, .skill-card, .music-card, .top-song-card, .about, .contact, .skills, .music, .top-songs').forEach(el => {
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
