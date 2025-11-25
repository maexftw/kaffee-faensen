// Kaffee F├ñnsen - Unified Navigation Component
// Matches the exact design from the homepage

class FaensenNavigation {
    constructor() {
        this.cartCount = 0;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.updateCartCount();
        this.initScrollEffect();
    }

    render() {
        const navHTML = `
            <style>
                .skip-link {
                    position: absolute;
                    left: 16px;
                    top: -40px;
                    padding: 8px 16px;
                    background: #D1541D;
                    color: white;
                    border-radius: 6px;
                    z-index: 999;
                    font-weight: 600;
                    transition: top 0.2s ease;
                }

                .skip-link:focus {
                    top: 16px;
                }

                /* HEADER - Exact match to homepage design */
                .header {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid #E5DED6;
                    transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .header.scrolled {
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                .header .container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding-left: 24px;
                    padding-right: 24px;
                }

                @media (min-width: 768px) {
                    .header .container {
                        padding-left: 48px;
                        padding-right: 48px;
                    }
                }

                .header-inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 88px;
                    gap: 32px;
                }

                .header-logo {
                    flex-shrink: 0;
                }

                .header-logo img {
                    height: 56px;
                    width: auto;
                    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .header-logo:hover img {
                    transform: scale(1.03);
                }

                .header-nav {
                    display: none;
                    gap: 40px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                @media (min-width: 768px) {
                    .header-nav {
                        display: flex;
                    }
                }

                .header-nav a {
                    font-family: 'Patua One', serif;
                    font-size: 1rem;
                    letter-spacing: 0.02em;
                    color: #2D2520;
                    transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .header-nav a::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #D1541D;
                    transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .header-nav a:hover {
                    color: #D1541D;
                }

                .header-nav a:hover::after,
                .header-nav a.active::after {
                    width: 100%;
                }

                .header-nav a.active {
                    color: #593F33;
                    font-weight: 600;
                }

                /* Cart Button - Fitts' Law: 48px minimum touch target */
                .header-cart {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 48px;
                    min-height: 48px;
                    padding: 0;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                    color: #2D2520;
                }

                .header-cart:hover {
                    opacity: 0.7;
                }

                .header-cart-badge {
                    position: absolute;
                    top: 4px;
                    right: 4px;
                    min-width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 6px;
                    background: #D1541D;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border-radius: 9999px;
                    font-family: 'Patua One', serif;
                }

                /* Mobile Menu Button */
                .header-menu-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 48px;
                    min-height: 48px;
                    padding: 0;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: #2D2520;
                }

                @media (min-width: 768px) {
                    .header-menu-btn {
                        display: none;
                    }
                }

                /* Mobile Menu Overlay */
                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 200;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0.3s ease;
                }

                .mobile-menu-overlay.open {
                    opacity: 1;
                    visibility: visible;
                }

                /* Mobile Menu Panel */
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    right: -280px;
                    width: 280px;
                    height: 100%;
                    background: #FAF8F5;
                    z-index: 201;
                    transition: right 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
                }

                .mobile-menu.open {
                    right: 0;
                }

                .mobile-menu-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 24px;
                    border-bottom: 1px solid #E5DED6;
                }

                .mobile-menu-header img {
                    height: 40px;
                    width: auto;
                }

                .mobile-menu-close {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 48px;
                    min-height: 48px;
                    padding: 0;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    color: #2D2520;
                }

                .mobile-menu-nav {
                    flex: 1;
                    padding: 24px;
                    list-style: none;
                    margin: 0;
                }

                .mobile-menu-nav li {
                    margin-bottom: 8px;
                }

                .mobile-menu-nav a {
                    display: block;
                    padding: 16px;
                    font-family: 'Patua One', serif;
                    font-size: 1.25rem;
                    color: #2D2520;
                    border-radius: 8px;
                    transition: background 0.2s ease, color 0.2s ease;
                }

                .mobile-menu-nav a:hover,
                .mobile-menu-nav a.active {
                    background: #593F33;
                    color: white;
                }

                .mobile-menu-footer {
                    padding: 24px;
                    border-top: 1px solid #E5DED6;
                    text-align: center;
                }

                .mobile-menu-cta {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    padding: 16px 24px;
                    background: #D1541D;
                    color: white;
                    font-family: 'Patua One', serif;
                    font-size: 1rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 0.2s ease;
                }

                .mobile-menu-cta:hover {
                    background: #B8461A;
                }
            </style>

            <a href="#main-content" class="skip-link">Direkt zum Inhalt</a>
            <header class="header" id="header">
                <div class="container">
                    <div class="header-inner">
                        <a href="homepage.html" class="header-logo">
                            <img src="https://cdn.prod.website-files.com/67b843c30eba57499fb124ab/67b8468ce539285a857943bb_FF-LOGO-deliver-01-scaled-e1658821528426.jpg" alt="Kaffee F├ñnsen">
                        </a>

                        <ul class="header-nav">
                            <li><a href="homepage.html#start" data-page="home">Start</a></li>
                            <li><a href="shop.html" data-page="shop">Shop</a></li>
                            <li><a href="homepage.html#ueber-uns" data-page="about">Über uns</a></li>
                            <li><a href="homepage.html#tradition" data-page="tradition">Tradition</a></li>
                        </ul>

                        <div style="display: flex; align-items: center; gap: 8px;">
                            <button class="header-cart" id="cart-btn" aria-label="Warenkorb">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                                <span class="header-cart-badge" id="cart-count">0</span>
                            </button>
                            <button class="header-menu-btn" id="mobile-menu-btn" aria-label="Menü öffnen">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Mobile Menu Overlay -->
            <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>

            <!-- Mobile Menu Panel -->
            <nav class="mobile-menu" id="mobile-menu">
                <div class="mobile-menu-header">
                    <img src="https://cdn.prod.website-files.com/67b843c30eba57499fb124ab/67b8468ce539285a857943bb_FF-LOGO-deliver-01-scaled-e1658821528426.jpg" alt="Kaffee Fänsen">
                    <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Menü schließen">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <ul class="mobile-menu-nav">
                    <li><a href="homepage.html#start" data-page="home">Start</a></li>
                    <li><a href="shop.html" data-page="shop">Shop</a></li>
                    <li><a href="homepage.html#ueber-uns" data-page="about">Über uns</a></li>
                    <li><a href="homepage.html#tradition" data-page="tradition">Tradition</a></li>
                </ul>
                <div class="mobile-menu-footer">
                    <a href="shop.html" class="mobile-menu-cta">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Jetzt bestellen
                    </a>
                </div>
            </nav>
        `;

        // Insert navigation at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', navHTML);

        // Set active page
        this.setActivePage();
    }

    attachEventListeners() {
        // Cart button
        const cartButton = document.getElementById('cart-btn');
        if (cartButton) {
            cartButton.addEventListener('click', () => {
                this.handleCartClick();
            });
        }

        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (event) => {
                const target = document.getElementById('main-content');
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        }

        // Mobile menu
        const menuBtn = document.getElementById('mobile-menu-btn');
        const menuClose = document.getElementById('mobile-menu-close');
        const menuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => this.openMobileMenu());
        }

        if (menuClose) {
            menuClose.addEventListener('click', () => this.closeMobileMenu());
        }

        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
                this.closeMobileMenu();
            }
        });

        // Close menu on link click
        const mobileNavLinks = document.querySelectorAll('.mobile-menu-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    }

    openMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuOverlay = document.getElementById('mobile-menu-overlay');

        if (mobileMenu) mobileMenu.classList.add('open');
        if (menuOverlay) menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuOverlay = document.getElementById('mobile-menu-overlay');

        if (mobileMenu) mobileMenu.classList.remove('open');
        if (menuOverlay) menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    initScrollEffect() {
        const header = document.getElementById('header');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    setActivePage() {
        const currentPage = this.getCurrentPage();

        // Desktop nav
        const navLinks = document.querySelectorAll('.header-nav a');
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === currentPage) {
                link.classList.add('active');
            }
        });

        // Mobile nav
        const mobileNavLinks = document.querySelectorAll('.mobile-menu-nav a');
        mobileNavLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === currentPage) {
                link.classList.add('active');
            }
        });
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();

        if (filename.includes('shop')) return 'shop';
        if (filename.includes('homepage') || filename === '' || filename === 'index.html') return 'home';

        // Check hash for homepage sections
        const hash = window.location.hash;
        if (hash === '#ueber-uns') return 'about';
        if (hash === '#tradition') return 'tradition';

        return 'home';
    }

    updateCartCount(count) {
        if (count !== undefined) {
            this.cartCount = count;
        } else {
            // Try to get cart from localStorage or global window object
            if (typeof window.cart !== 'undefined') {
                this.cartCount = window.cart.length;
            } else if (localStorage.getItem('faensen_cart')) {
                const cart = JSON.parse(localStorage.getItem('faensen_cart'));
                this.cartCount = cart.length;
            }
        }

        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) {
            cartCountEl.textContent = this.cartCount;
        }
    }

    handleCartClick() {
        // Dispatch custom event that pages can listen to
        const event = new CustomEvent('faensenCartClick', {
            detail: { cartCount: this.cartCount }
        });
        window.dispatchEvent(event);

        // If there's a global toggleCart function, call it
        if (typeof window.toggleCart === 'function') {
            window.toggleCart();
        } else if (typeof window.viewCart === 'function') {
            // Use the new viewCart function if available
            window.viewCart();
        } else {
            // Default behavior
            if (this.cartCount === 0) {
                alert('Dein Warenkorb ist leer.');
            } else {
                alert(`Du hast ${this.cartCount} Artikel im Warenkorb.`);
            }
        }
    }

    // Public method to update cart count from other scripts
    static updateCartCount(count) {
        const nav = window.faensenNav;
        if (nav) {
            nav.updateCartCount(count);
        }
    }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.faensenNav = new FaensenNavigation();
    });
} else {
    window.faensenNav = new FaensenNavigation();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FaensenNavigation;
}
