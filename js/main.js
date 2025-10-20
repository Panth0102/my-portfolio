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

        container.innerHTML = filteredCerts.map(cert => `
            <div class="certificate-card" data-category="${cert.category}">
                <div class="certificate-preview">
                    <img src="../assets/Certificates/${cert.file}" alt="${cert.name}" loading="lazy">
                </div>
                <div class="certificate-info">
                    <h3>${cert.name}</h3>
                    <span class="category-tag">${cert.category}</span>
                    <a href="../assets/Certificates/${cert.file}" target="_blank" class="view-btn">
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
    
    // Debug log
    console.log('Navigation paths fixed for:', isSubPage ? 'sub page' : 'root page');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    window.themeManager = new ThemeManager();
    
    // Initialize animation manager
    window.animationManager = new AnimationManager();
    
    // Initialize certificate gallery if on certificates page
    if (document.getElementById('certificates-grid')) {
        window.certificateGallery = new CertificateGallery();
        window.certificateGallery.render('certificates-grid');
        
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
});