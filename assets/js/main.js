// Main JavaScript for Cyberpunk Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize glitch effects
    initGlitchEffects();
});

// Loading Screen
function initLoadingScreen() {
    // Create loading screen element
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    loadingScreen.appendChild(loader);
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after content is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            // Remove loading screen after transition
            setTimeout(function() {
                loadingScreen.remove();
            }, 500);
        }, 1500); // Show loading screen for at least 1.5 seconds
    });
}

// Navigation
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scroll for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Animate skill bars when in viewport
    const skillLevels = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        const windowHeight = window.innerHeight;
        
        skillLevels.forEach(skill => {
            const skillTop = skill.getBoundingClientRect().top;
            const skillWidth = skill.style.width;
            
            if (skillTop < windowHeight - 100) {
                skill.classList.add('animate');
                skill.style.setProperty('--width', skillWidth);
            }
        });
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Animate portfolio items when in viewport
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    function animatePortfolioItems() {
        const windowHeight = window.innerHeight;
        
        portfolioItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < windowHeight - 100) {
                // Add delay based on index
                setTimeout(() => {
                    item.classList.add('show');
                }, 100 * index);
            }
        });
    }
    
    // Initial check
    animatePortfolioItems();
    
    // Check on scroll
    window.addEventListener('scroll', animatePortfolioItems);
    
    // Animate service cards when in viewport
    const serviceCards = document.querySelectorAll('.service-card');
    
    function animateServiceCards() {
        const windowHeight = window.innerHeight;
        
        serviceCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < windowHeight - 100) {
                // Add delay based on index
                setTimeout(() => {
                    card.classList.add('show');
                }, 100 * index);
            }
        });
    }
    
    // Initial check
    animateServiceCards();
    
    // Check on scroll
    window.addEventListener('scroll', animateServiceCards);
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    const sunIcon = document.querySelector('.fa-sun');
    const moonIcon = document.querySelector('.fa-moon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'light');
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    // Update cursor position
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('li, a, button, input, textarea, .portfolio-card, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // Add cursor trail effect
    let trailElements = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / trailLength) * 0.5;
        document.body.appendChild(trail);
        trailElements.push({
            element: trail,
            x: 0,
            y: 0
        });
    }
    
    document.addEventListener('mousemove', function(e) {
        // Update first trail element position
        trailElements[0].x = e.clientX;
        trailElements[0].y = e.clientY;
        
        // Update trail elements position with delay
        for (let i = 1; i < trailElements.length; i++) {
            const current = trailElements[i];
            const previous = trailElements[i - 1];
            
            current.x += (previous.x - current.x) * 0.3;
            current.y += (previous.y - current.y) * 0.3;
            
            current.element.style.left = current.x + 'px';
            current.element.style.top = current.y + 'px';
        }
    });
}

function initGlitchEffects() {
    // Text scramble effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];

                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;

            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Exemplo de uso
    const phrases = [
        'Luan Fagioni',
        'Dev FrontEnd',
        'Future FullStack',
        'UI and UX'
    ];

    const el = document.querySelector('.glitch-text');
    const fx = new TextScramble(el);
    let counter = 0;

    const next = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(next, 2000);
        });
        counter = (counter + 1) % phrases.length;
    };

    next();
}
document.addEventListener('DOMContentLoaded', initGlitchEffects);