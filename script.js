// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    createStarfield();
    createShootingStars();
    initializeNavigation();
    addScrollEffects();
    addInteractiveEffects();
}

// Create animated starfield background
function createStarfield() {
    const starsContainer = document.getElementById('stars');
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random animation delay and duration
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        // Random opacity
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        starsContainer.appendChild(star);
    }
}

// Create shooting stars animation
function createShootingStars() {
    const shootingStarsContainer = document.getElementById('shooting-stars');
    
    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random starting position (top and left edges)
        shootingStar.style.left = Math.random() * 100 + '%';
        shootingStar.style.top = Math.random() * 50 + '%';
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        shootingStar.style.animationDuration = duration + 's';
        
        shootingStarsContainer.appendChild(shootingStar);
        
        // Remove shooting star after animation completes
        setTimeout(() => {
            if (shootingStar && shootingStar.parentNode) {
                shootingStar.parentNode.removeChild(shootingStar);
            }
        }, duration * 1000);
    }
    
    // Create shooting stars at random intervals
    function scheduleShootingStar() {
        createShootingStar();
        const nextShootingTime = Math.random() * 5000 + 2000; // 2-7 seconds
        setTimeout(scheduleShootingStar, nextShootingTime);
    }
    
    // Start shooting stars
    scheduleShootingStar();
}

// Initialize navigation functionality
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all nav items and pages
            navItems.forEach(nav => nav.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show target page with fade effect
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                // Add fade-out effect to current page
                const currentPage = document.querySelector('.page.active');
                if (currentPage) {
                    currentPage.style.opacity = '0';
                    setTimeout(() => {
                        currentPage.classList.remove('active');
                        targetPageElement.classList.add('active');
                        targetPageElement.style.opacity = '0';
                        setTimeout(() => {
                            targetPageElement.style.opacity = '1';
                        }, 50);
                    }, 300);
                } else {
                    targetPageElement.classList.add('active');
                    targetPageElement.style.opacity = '1';
                }
            }
        });
    });
}

// Add scroll effects and animations
function addScrollEffects() {
    // Smooth scrolling for internal links
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.story-section, .cast-card, .team-card, .movie-details');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Add interactive effects and enhancements
function addInteractiveEffects() {
    // Enhanced hover effects for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.filter = 'brightness(1) contrast(1)';
        });
    });

    // Add parallax effect to floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index % 3) * 0.2;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add mouse movement parallax effect
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move stars slightly based on mouse position
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            const speed = (index % 5 + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            star.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Add click ripple effect to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add loading animation for images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });

    // Add dynamic background color changes based on active page
    const pages = document.querySelectorAll('.page');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active')) {
                    updateBackgroundForPage(target.id);
                }
            }
        });
    });

    pages.forEach(page => {
        observer.observe(page, { attributes: true });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeNavIndex = Array.from(navItems).findIndex(item => item.classList.contains('active'));
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (activeNavIndex + 1) % navItems.length;
            navItems[nextIndex].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = activeNavIndex > 0 ? activeNavIndex - 1 : navItems.length - 1;
            navItems[prevIndex].click();
        }
    });
}

// Update background gradient based on active page
function updateBackgroundForPage(pageId) {
    const body = document.body;
    
    switch(pageId) {
        case 'home':
            body.style.background = 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a1a 100%)';
            break;
        case 'story':
            body.style.background = 'linear-gradient(135deg, #1a0a1a 0%, #3a1a1a 50%, #1a0a1a 100%)';
            break;
        case 'cast':
            body.style.background = 'linear-gradient(135deg, #0a1a1a 0%, #1a3a3a 50%, #0a1a1a 100%)';
            break;
        case 'about':
            body.style.background = 'linear-gradient(135deg, #1a1a0a 0%, #3a3a1a 50%, #1a1a0a 100%)';
            break;
    }
}

// Add CSS for ripple effect
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.nav-item {
    position: relative;
    overflow: hidden;
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Performance optimization: Throttle scroll and mouse events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll and mouse events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations are already handled above
}, 16)); // ~60fps

document.addEventListener('mousemove', throttle(function(e) {
    // Mouse parallax is already handled above
}, 16)); // ~60fps

// Add resize handler for responsive animations
window.addEventListener('resize', function() {
    // Recalculate star positions if needed
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
    });
});

// Initialize page with fade-in effect
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🌟 Interstellar website loaded successfully! 🚀');