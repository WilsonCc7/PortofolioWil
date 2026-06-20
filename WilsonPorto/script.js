// ===== GLOBAL VARIABLES =====
const typingTexts = [
    'Software Developer',
   'Future Husband?', 
   'Future Boyfriend?',
    'Tech Enthusiast',
    'Future Innovator'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===== TYPING ANIMATION =====
function typeText() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// ===== SCROLL PROGRESS BAR =====
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight <= 0) return;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// ===== NAVBAR SCROLL EFFECT =====
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== ACTIVE NAVIGATION LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== MOBILE MENU TOGGLE =====
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

// ===== DARK MODE TOGGLE =====
function setupDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem('theme') || 'light';
    } catch (e) {
        // localStorage unavailable (e.g. private browsing)
    }
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // localStorage unavailable
        }
    });
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== ANIMATED COUNTERS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'), 10);
                if (isNaN(target) || target <= 0) {
                    observer.unobserve(entry.target);
                    return;
                }
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== PROJECT FILTER =====
function setupProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// ===== PROJECT MODAL =====
const projectDetails = {
    1: {
        title: 'E-Commerce Platform',
        description: 'A comprehensive online shopping platform featuring product catalogs, shopping cart, secure payment integration, user authentication, and an admin dashboard for inventory management.',
        features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Integration', 'Order Tracking', 'Admin Dashboard'],
        technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Stripe API', 'JWT'],
        demo: '#',
        github: '#'
    },
    2: {
        title: 'Social Media Dashboard',
        description: 'A powerful analytics dashboard that aggregates data from multiple social media platforms, providing real-time insights, engagement metrics, and visualization tools for content creators and businesses.',
        features: ['Multi-platform Integration', 'Real-time Analytics', 'Data Visualization', 'Engagement Tracking', 'Custom Reports', 'Responsive Design'],
        technologies: ['JavaScript', 'Chart.js', 'Firebase', 'REST APIs', 'HTML/CSS'],
        demo: '#',
        github: '#'
    },
    3: {
        title: 'Task Management App',
        description: 'A mobile-first task management application with intuitive drag-and-drop interface, custom categories, priority levels, reminder notifications, and progress tracking across devices.',
        features: ['Task Organization', 'Categories & Tags', 'Reminders', 'Progress Tracking', 'Offline Support', 'Cloud Sync'],
        technologies: ['React Native', 'SQLite', 'AsyncStorage', 'Push Notifications'],
        demo: '#',
        github: '#'
    },
    4: {
        title: 'Portfolio Website Builder',
        description: 'An intuitive drag-and-drop website builder that empowers users to create beautiful, professional portfolios without any coding knowledge. Features include customizable templates and real-time preview.',
        features: ['Drag & Drop Editor', 'Customizable Templates', 'Real-time Preview', 'Export Code', 'Responsive Design', 'Asset Management'],
        technologies: ['JavaScript', 'HTML/CSS', 'LocalStorage', 'Canvas API'],
        demo: '#',
        github: '#'
    },
    5: {
        title: 'AI Chatbot Assistant',
        description: 'An intelligent chatbot powered by natural language processing that provides automated customer support, answers FAQs, and learns from interactions to improve response accuracy over time.',
        features: ['Natural Language Processing', 'Learning Algorithm', 'Multi-language Support', 'Context Awareness', 'Analytics Dashboard', 'Custom Training'],
        technologies: ['Python', 'TensorFlow', 'Flask', 'NLTK', 'MongoDB'],
        demo: '#',
        github: '#'
    },
    6: {
        title: 'Data Visualization Tool',
        description: 'A sophisticated data visualization application that transforms complex datasets into interactive charts, graphs, and dashboards. Supports multiple data formats and offers extensive customization options.',
        features: ['Interactive Charts', 'Multiple Data Sources', 'Custom Visualizations', 'Export Options', 'Real-time Updates', 'Collaboration Tools'],
        technologies: ['Python', 'D3.js', 'Pandas', 'NumPy', 'Flask'],
        demo: '#',
        github: '#'
    }
};

function setupProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');
    if (!modal || !modalBody || !closeBtn) return;
    const viewProjectBtns = document.querySelectorAll('.btn-view-project');
    
    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectDetails[projectId];
            if (!project) return;
            
            modalBody.innerHTML = `
                <h2 style="color: var(--primary-purple); margin-bottom: 1rem;">${project.title}</h2>
                <p style="color: var(--text-gray); margin-bottom: 1.5rem; line-height: 1.8;">${project.description}</p>
                
                <h3 style="color: var(--text-dark); margin-bottom: 0.5rem;">Key Features:</h3>
                <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; line-height: 1.8;">
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <h3 style="color: var(--text-dark); margin-bottom: 0.5rem;">Technologies Used:</h3>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                    ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <a href="${project.demo}" class="btn btn-primary" style="flex: 1; text-align: center;">View Demo</a>
                    <a href="${project.github}" class="btn btn-secondary" style="flex: 1; text-align: center;">GitHub</a>
                </div>
                
                <p style="margin-top: 1.5rem; padding: 1rem; background: var(--gradient-card); border-radius: var(--radius-sm); font-size: 0.9rem; color: var(--text-gray);">
                    <strong>Note:</strong> This is a placeholder project. Replace with your actual project details, links, and screenshots.
                </p>
            `;
            
            modal.classList.add('active');
        });
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ===== CONTACT FORM VALIDATION =====
function setupContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (!form || !formStatus) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        formStatus.textContent = '';
        formStatus.className = '';
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name.length < 2) {
            document.querySelector('#name + .error-message').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.querySelector('#email + .error-message').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate subject
        if (subject.length < 3) {
            document.querySelector('#subject + .error-message').textContent = 'Subject must be at least 3 characters';
            isValid = false;
        }
        
        // Validate message
        if (message.length < 10) {
            document.querySelector('#message + .error-message').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            formStatus.className = 'success';
            form.reset();
            
            // In a real application, you would send the data to a backend here
            // Example: fetch('/api/contact', { method: 'POST', body: formData })
        } else {
            formStatus.textContent = 'Please fix the errors above';
            formStatus.className = 'error';
        }
    });
}

// ===== BACK TO TOP BUTTON =====
function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections and cards
    document.querySelectorAll('section, .project-card, .initiative-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    const initFunctions = [
        ['typeText', typeText],
        ['setupMobileMenu', setupMobileMenu],
        ['setupDarkMode', setupDarkMode],
        ['setupProjectFilter', setupProjectFilter],
        ['setupProjectModals', setupProjectModals],
        ['setupContactForm', setupContactForm],
        ['setupBackToTop', setupBackToTop],
        ['setupSmoothScroll', setupSmoothScroll],
        ['setupScrollAnimations', setupScrollAnimations],
        ['animateSkillBars', animateSkillBars],
        ['animateCounters', animateCounters]
    ];

    initFunctions.forEach(([name, fn]) => {
        try {
            fn();
        } catch (error) {
            console.error(`Failed to initialize ${name}:`, error);
        }
    });
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        handleNavbarScroll();
        updateActiveNavLink();
    });
    
    // Initial calls
    updateScrollProgress();
    handleNavbarScroll();
    updateActiveNavLink();
});

// ===== PRELOAD OPTIMIZATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
