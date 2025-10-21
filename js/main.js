// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
        this.updateLogo();
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-toggle');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? 'dark_mode' : 'light_mode';
        }
    }

    updateLogo() {
        const logo = document.querySelector('.navbar-logo');
        if (logo) {
            const isSubPage = window.location.pathname.includes('/static/');
            const basePath = isSubPage ? '../' : '';
            logo.src = this.currentTheme === 'light' 
                ? `${basePath}assets/icon/P.png` 
                : `${basePath}assets/icon/P-2.png`;
        }
    }
}

// Certificate Gallery
class CertificateGallery {
    constructor() {
        this.certificates = [
            { name: 'Debate Competition', file: '01_Debate.jpg', category: 'Competition' },
            { name: 'IT Fair', file: '02_ITFAIR.jpg', category: 'Event' },
            { name: 'NSS Road Safety', file: '03_NSSRoadSafety.jpg', category: 'Social Service' },
            { name: 'Yoga Day', file: '04_YogaDay.jpg', category: 'Event' },
            { name: 'Hackathon Space India', file: '05_HackathonSpaceIndia.jpg', category: 'Competition' },
            { name: 'HTML Royal', file: '06_HTMLRoyal.jpg', category: 'Technical' },
            { name: 'Research Cell', file: '07_ResarchCell.jpg', category: 'Academic' },
            { name: 'IT Fair 2', file: '08_ITFair.jpg', category: 'Event' },
            { name: 'Royal Hackathon', file: '09_RoyalHackathon.jpg', category: 'Competition' },
            { name: 'Women Entrepreneurship Cell', file: '10_WomenEnterprenurshipCell.jpg', category: 'Event' },
            { name: 'MEAN Stack', file: '11_MEANStack.jpg', category: 'Technical' },
            { name: 'Merit Certificate', file: '12_MeritCertificate.jpg', category: 'Academic' },
            { name: 'Sampark', file: '13_Sampark.jpg', category: 'Event' },
            { name: 'Academic Excellence', file: '14_AcademicExcellence.jpg', category: 'Academic' },
            { name: 'Outstanding Performance', file: '15_OutstandingPerformance.jpg', category: 'Academic' },
            { name: 'CSS Certificate', file: '16_CSS.jpg', category: 'Technical' },
            { name: 'C Language', file: '17_CLangauge.jpg', category: 'Technical' },
            { name: 'C++ Language', file: '18_CPPLangauage.jpg', category: 'Technical' },
            { name: 'AIU Certificate', file: '19_AIU_Certificate.jpg', category: 'Academic' },
            { name: 'Teachers Day', file: '20_TeachersDay.jpg', category: 'Event' },
            { name: 'Siraaj', file: '21_Siraaj.jpg', category: 'Event' },
            { name: 'Teachers Day 2', file: '22_Teachersday.jpg', category: 'Event' },
            { name: 'Advanced Excel', file: '23_AdvanceExcel.jpg', category: 'Technical' },
            { name: 'NSS Camp', file: '24_NSScamp.jpg', category: 'Social Service' },
            { name: 'Internship Pune', file: '25_InternshipPune.jpg', category: 'Professional' },
            { name: 'Java Certificate', file: '26_Java.jpg', category: 'Technical' },
            { name: 'Git & LeetCode', file: '27_Git&leet.jpg', category: 'Technical' },
            { name: 'ISRO 2025', file: '28_ISRO2025.jpg', category: 'Competition' },
            { name: 'JavaScript', file: '29_JS.jpg', category: 'Technical' },
            { name: 'Academic Result 1', file: 'Result 1.jpg', category: 'Academic' },
            { name: 'Academic Result 2', file: 'Result 2.jpg', category: 'Academic' },
            { name: 'Academic Result 3', file: 'Result 3.jpg', category: 'Academic' },
            { name: 'Academic Result 4', file: 'Result 4.jpg', category: 'Academic' }
        ];
    }

    render(containerId, filter = 'all') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const filteredCerts = filter === 'all' 
            ? this.certificates 
            : this.certificates.filter(cert => cert.category === filter);

        // Determine the correct path based on current page location
        const isSubPage = window.location.pathname.includes('/static/');
        const basePath = isSubPage ? '../' : '';

        container.innerHTML = filteredCerts.map(cert => `
            <div class="certificate-card" data-category="${cert.category}">
                <div class="certificate-preview" style="position: relative;">
                    <img src="${basePath}assets/Certificates/${cert.file}" 
                         alt="${cert.name}" 
                         loading="lazy"
                         onload="this.style.opacity='1'; if(this.parentElement.querySelector('.loading-placeholder')) this.parentElement.querySelector('.loading-placeholder').style.display='none';"
                         onerror="this.style.display='none'; this.parentElement.querySelector('.pdf-preview').style.display='flex'; if(this.parentElement.querySelector('.loading-placeholder')) this.parentElement.querySelector('.loading-placeholder').style.display='none';"
                         style="opacity: 0; transition: opacity 0.3s ease;">
                    <div class="loading-placeholder" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--text-secondary);">
                        <span class="material-symbols-outlined" style="font-size: 2rem; animation: spin 1s linear infinite;">refresh</span>
                    </div>
                    <div class="pdf-preview" style="display: none;">
                        <div class="pdf-container">
                            <span class="material-symbols-outlined pdf-icon">description</span>
                            <p class="pdf-label">Certificate</p>
                            <p style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.8;">${cert.name}</p>
                        </div>
                    </div>
                </div>
                <div class="certificate-info">
                    <h3>${cert.name}</h3>
                    <span class="category-tag">${cert.category}</span>
                    <a href="${basePath}assets/Certificates/${cert.file}" target="_blank" class="view-btn">
                        <span class="material-symbols-outlined">zoom_in</span>
                        View Certificate
                    </a>
                </div>
            </div>
        `).join('');
    }

    getCategories() {
        return [...new Set(this.certificates.map(cert => cert.category))];
    }
}

// Smooth scrolling and animations
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.setupSmoothScrolling();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

// Typing animation
class TypingAnimation {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.start();
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Fix navigation paths based on current page location
function fixNavigationPaths() {
    const isSubPage = window.location.pathname.includes('/static/');
    const basePath = isSubPage ? '../' : '';
    
    // Fix navigation links
    const navLinks = document.querySelectorAll('.navbar a[href]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
            if (isSubPage) {
                // For sub pages, ensure paths start with ../
                if (!href.startsWith('../')) {
                    if (href === 'index.html') {
                        link.setAttribute('href', '../index.html');
                    } else if (href.startsWith('static/')) {
                        link.setAttribute('href', '../' + href);
                    } else {
                        link.setAttribute('href', '../' + href);
                    }
                }
            } else {
                // For root page, remove ../ if present
                if (href.startsWith('../')) {
                    link.setAttribute('href', href.replace('../', ''));
                }
            }
        }
    });
    
    // Fix logo src
    const logo = document.querySelector('.navbar-logo');
    if (logo) {
        const currentSrc = logo.getAttribute('src');
        if (isSubPage) {
            if (!currentSrc.startsWith('../')) {
                logo.setAttribute('src', '../' + currentSrc);
            }
        } else {
            if (currentSrc.startsWith('../')) {
                logo.setAttribute('src', currentSrc.replace('../', ''));
            }
        }
    }
    

}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && menuToggle) {
        const isCurrentlyActive = mobileMenu.classList.contains('active');
        
        if (isCurrentlyActive) {
            // Close the menu
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        } else {
            // Open the menu
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
        }
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && menuToggle) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

// Make sure the function is globally accessible
window.toggleMobileMenu = toggleMobileMenu;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure mobile menu starts in closed state
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenu && menuToggle) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
    
    // Initialize theme manager
    window.themeManager = new ThemeManager();
    
    // Initialize animation manager
    window.animationManager = new AnimationManager();
    
    // Initialize certificate gallery if on certificates page
    if (document.getElementById('certificates-grid')) {
        window.certificateGallery = new CertificateGallery();
        
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
            window.certificateGallery.render('certificates-grid');
        }, 100);
        
        // Setup category filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                window.certificateGallery.render('certificates-grid', filter);
            });
        });
    }
    
    // Initialize typing animation on home page
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        new TypingAnimation(typingElement, [
            'Full Stack Developer',
            'Problem Solver',
            'Tech Enthusiast',
            'Continuous Learner'
        ]);
    }
    
    // Add click event listeners to mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Add click event listeners to mobile menu links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .text_navbar a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const navbar = document.querySelector('.navbar');
        
        if (mobileMenu && menuToggle && navbar) {
            if (!navbar.contains(event.target) && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
});