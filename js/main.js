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
        console.log('Certificate render called with filter:', filter);
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        const filteredCerts = filter === 'all'
            ? this.certificates
            : this.certificates.filter(cert => cert.category === filter);

        console.log('Filtered certificates count:', filteredCerts.length, 'Total certificates:', this.certificates.length);

        // Determine the correct path based on current page location
        const isSubPage = window.location.pathname.includes('/static/');
        const basePath = isSubPage ? '../' : '';

        console.log('Path info - isSubPage:', isSubPage, 'basePath:', basePath);

        // Show loading state first
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-secondary);">Loading certificates...</div>';

        // Use setTimeout to ensure DOM is ready and improve mobile compatibility
        setTimeout(() => {
            // Clear container first
            container.innerHTML = '';

            // Create certificates using DOM manipulation for better mobile compatibility
            filteredCerts.forEach((cert, index) => {
                const imagePath = `${basePath}assets/Certificates/${cert.file}`;

                // Create card container
                const cardDiv = document.createElement('div');
                cardDiv.className = 'certificate-card';
                cardDiv.setAttribute('data-category', cert.category);
                cardDiv.style.cssText = 'width: 100%; margin-bottom: 1.5rem; background: white; border-radius: 1rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #e5e7eb;';

                // Create image container
                const imageContainer = document.createElement('div');
                imageContainer.style.cssText = 'height: 200px; width: 100%; background-color: #f8f9fa; position: relative; overflow: hidden;';

                // Create image element
                const img = document.createElement('img');
                img.src = imagePath;
                img.alt = cert.name;
                img.style.cssText = 'width: 100%; height: 100%; object-fit: contain; display: block; background: white;';

                img.onload = function () {
                    console.log(`Image ${index} loaded successfully: ${cert.file}`);
                    this.style.opacity = '1';
                };

                img.onerror = function () {
                    console.log(`Image ${index} failed to load: ${cert.file}`);
                    // Create fallback
                    const fallback = document.createElement('div');
                    fallback.style.cssText = 'width: 100%; height: 100%; background: linear-gradient(135deg, #dc2626, #ef4444); color: white; display: flex; align-items: center; justify-content: center; text-align: center;';
                    fallback.innerHTML = '<div><span class="material-symbols-outlined" style="font-size: 4rem; display: block; margin-bottom: 0.5rem;">description</span><p style="font-weight: 600; margin: 0;">Certificate</p></div>';
                    this.parentNode.replaceChild(fallback, this);
                };

                imageContainer.appendChild(img);

                // Create info container
                const infoDiv = document.createElement('div');
                infoDiv.style.cssText = 'padding: 1.5rem;';

                const title = document.createElement('h3');
                title.textContent = cert.name;
                title.style.cssText = 'font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #1f2937;';

                const categoryTag = document.createElement('span');
                categoryTag.textContent = cert.category;
                categoryTag.style.cssText = 'display: inline-block; background-color: #2563eb; color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.875rem; font-weight: 500; margin-bottom: 1rem;';

                const viewLink = document.createElement('a');
                viewLink.href = imagePath;
                viewLink.target = '_blank';
                viewLink.innerHTML = '<span class="material-symbols-outlined">zoom_in</span> View Certificate';
                viewLink.style.cssText = 'display: inline-flex; align-items: center; gap: 0.5rem; color: #2563eb; text-decoration: none; font-weight: 500;';

                infoDiv.appendChild(title);
                infoDiv.appendChild(categoryTag);
                infoDiv.appendChild(document.createElement('br'));
                infoDiv.appendChild(viewLink);

                cardDiv.appendChild(imageContainer);
                cardDiv.appendChild(infoDiv);

                container.appendChild(cardDiv);
            });

            console.log('Certificates created with DOM manipulation:', filteredCerts.length, 'Base path:', basePath);
        }, 100);
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

// Test function for certificate loading
function testCertificateLoad() {
    const isSubPage = window.location.pathname.includes('/static/');
    const basePath = isSubPage ? '../' : '';
    const testImage = `${basePath}assets/Certificates/01_Debate.jpg`;

    console.log('Testing certificate load:', testImage);

    const img = new Image();
    img.onload = () => console.log('✅ Certificate test load successful');
    img.onerror = () => console.log('❌ Certificate test load failed');
    img.src = testImage;
}

// Make test function globally accessible
window.testCertificateLoad = testCertificateLoad;

// Manual certificate loading function
function loadCertificatesManually() {
    console.log('Manual certificate load triggered');

    // Hide the button after clicking - multiple methods
    const button = document.getElementById('mobile-load-button');
    console.log('Button found:', !!button);

    if (button) {
        console.log('Hiding button...');
        button.style.display = 'none !important';
        button.style.visibility = 'hidden';
        button.style.opacity = '0';
        button.remove(); // Completely remove the button
        console.log('Button hidden and removed');
    }

    // Load certificates
    if (window.certificateGallery) {
        window.certificateGallery.render('certificates-grid', 'all');
    } else {
        console.log('Certificate gallery not initialized, creating new instance');
        window.certificateGallery = new CertificateGallery();
        window.certificateGallery.render('certificates-grid', 'all');
    }

    console.log('Certificates loaded');
}

// Make manual load function globally accessible
window.loadCertificatesManually = loadCertificatesManually;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
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
        // Test certificate loading first
        testCertificateLoad();

        window.certificateGallery = new CertificateGallery();

        // Detect mobile devices and add longer delay for better compatibility
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const delay = isMobile ? 500 : 100;

        console.log('Initializing certificates, mobile:', isMobile, 'delay:', delay);

        // Show mobile load button only on mobile devices
        const mobileButton = document.getElementById('mobile-load-button');
        if (mobileButton && isMobile) {
            mobileButton.style.display = 'block';
            console.log('Mobile load button shown');
        }

        // Only auto-load certificates on desktop, not mobile
        if (!isMobile) {
            const initialRender = () => {
                console.log('Starting initial certificate render for desktop...');
                const container = document.getElementById('certificates-grid');
                console.log('Container found:', !!container);

                if (container) {
                    console.log('Container innerHTML before render:', container.innerHTML.length);
                    window.certificateGallery.render('certificates-grid', 'all');

                    setTimeout(() => {
                        console.log('Container innerHTML after render:', container.innerHTML.length);
                        const cards = container.querySelectorAll('.certificate-card');
                        console.log('Certificate cards rendered:', cards.length);
                    }, 200);
                }
            };

            setTimeout(initialRender, delay);
        } else {
            console.log('Mobile device detected - certificates will only load when button is clicked');
        }

        // No automatic fallback for mobile - certificates only load when button is clicked

        // Setup category filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Filter clicked:', btn.dataset.filter);
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                window.certificateGallery.render('certificates-grid', filter);
            });
        });

        // Mobile certificates will only load when the "Load Certificates" button is clicked
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
        mobileMenuToggle.addEventListener('click', function (e) {
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
    document.addEventListener('click', function (event) {
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