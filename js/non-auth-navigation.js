// Non-Authenticated User Navigation Functionality
// This file contains all navigation functions (desktop & mobile) for non-authenticated users
// When creating authenticated user pages, use auth-navigation.js instead

// Custom Notification System for Non-Auth Pages
function showCustomNotification(type, title, message, duration = 5000) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('customNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'customNotification';
        notification.className = 'custom-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                </div>
                <div class="notification-text">
                    <div class="notification-title"></div>
                    <div class="notification-message"></div>
                </div>
                <button class="notification-close" onclick="hideCustomNotification()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        document.body.appendChild(notification);
        
        // Add CSS if not already added
        if (!document.getElementById('customNotificationCSS')) {
            const style = document.createElement('style');
            style.id = 'customNotificationCSS';
            style.textContent = `
                .custom-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: transform 0.3s ease;
                }
                .custom-notification.show {
                    transform: translateX(0);
                }
                .notification-content {
                    background: linear-gradient(145deg, #2c2c2c, #252525);
                    border: 1px solid #3a3a3a;
                    border-radius: 12px;
                    padding: 16px;
                    min-width: 320px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification-icon {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #7c3aed, #a855f7);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }
                .notification-text {
                    flex: 1;
                }
                .notification-title {
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 4px;
                }
                .notification-message {
                    color: #cccccc;
                    font-size: 13px;
                    line-height: 1.4;
                }
                .notification-close {
                    background: transparent;
                    border: none;
                    color: #888888;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 6px;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                .notification-close:hover {
                    background: #3a3a3a;
                    color: #ffffff;
                }
                .custom-notification.success .notification-icon {
                    background: linear-gradient(135deg, #10b981, #059669);
                }
                .custom-notification.error .notification-icon {
                    background: linear-gradient(135deg, #ef4444, #dc2626);
                }
                .custom-notification.warning .notification-icon {
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                }
                .custom-notification.info .notification-icon {
                    background: linear-gradient(135deg, #3b82f6, #2563eb);
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    const titleEl = notification.querySelector('.notification-title');
    const messageEl = notification.querySelector('.notification-message');
    
    // Set content
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Set type and icon
    notification.className = `custom-notification ${type}`;
    
    // Show notification
    notification.classList.add('show');
    
    // Auto hide after duration
    setTimeout(() => {
        hideCustomNotification();
    }, duration);
}

function hideCustomNotification() {
    const notification = document.getElementById('customNotification');
    if (notification) {
        notification.classList.remove('show');
    }
}

// Override browser alerts
window.alert = function(message) {
    showCustomNotification('info', 'Alert', message);
};

function toggleMenu(element) {
    element.classList.toggle('active');
    const mobileMenu = document.getElementById('mobileMenuOverlay');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenuOverlay');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Close mobile menu when pressing escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenuOverlay');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});


// Auth Redirect Functions (marketing pages redirect to dashboard.nuerlo.com)
function openAuthModal() {
    // Redirect to dashboard login page
    window.location.href = 'https://dashboard.nuerlo.com/login';
}

function openSignupModal() {
    // Redirect to dashboard register page
    window.location.href = 'https://dashboard.nuerlo.com/register';
}

// Make functions available globally
window.openAuthModal = openAuthModal;
window.openSignupModal = openSignupModal;
window.toggleMenu = toggleMenu;
window.toggleFAQ = toggleFAQ;

// FAQ functionality (for pages that have it)
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-icon');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = null;
            item.querySelector('.faq-icon').textContent = '+';
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
    } else {
        answer.style.maxHeight = null;
        icon.textContent = '+';
    }
}

// Lazy Load Fade-in Effect
function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Cookie-based auth checking removed - now using Firebase auth state directly

// Helper function to add/update arrow icon in button
function addArrowIcon(button) {
    if (!button) return;
    
    // Skip if this is the signin button (no arrow needed)
    if (button.id === 'signin-btn') {
        return;
    }
    
    // Remove existing arrow if any
    const existingArrow = button.querySelector('.arrow-icon');
    if (existingArrow) {
        existingArrow.remove();
    }
    
    // Create arrow icon using the image from assets
    const arrowIcon = document.createElement('span');
    arrowIcon.className = 'arrow-icon';
    arrowIcon.innerHTML = `
        <img src="/assets/images/right-arrow-svg.png" alt="" class="arrow-img">
    `;
    
    // Add arrow after text
    button.appendChild(arrowIcon);
}

// Store authentication state globally
let globalAuthState = false;

// Update login buttons based on Firebase auth state
// This function is called by Firebase's onAuthStateChanged listener
function updateLoginButtons(isAuthenticated) {
    // Ensure we have a boolean value - default to false (not authenticated) if unclear
    const authenticated = Boolean(isAuthenticated);
    globalAuthState = authenticated;
    
    // Keep Sign In button text always as "Sign In"
    const signInBtn = document.getElementById('signin-btn');
    if (signInBtn) {
        signInBtn.textContent = 'Sign In';
        signInBtn.href = '#';
        // Don't add arrow icon to sign in button
    }
    
    // Update mobile login button - keep as Sign In
    const mobileLoginBtn = document.querySelector('.mobile-login');
    if (mobileLoginBtn) {
        mobileLoginBtn.textContent = 'Sign In';
        mobileLoginBtn.href = 'https://dashboard.nuerlo.com/login';
        addArrowIcon(mobileLoginBtn);
    }
    
    // Update mobile menu sign in button
    const mobileSignInBtn = document.querySelector('.mobile-signin-btn');
    if (mobileSignInBtn) {
        const span = mobileSignInBtn.querySelector('span');
        if (span) {
            span.textContent = 'Sign In';
            mobileSignInBtn.href = 'https://dashboard.nuerlo.com/login';
        }
        // Add arrow to mobile menu button (it already has SVG structure, so we'll add it after the span)
        const existingArrow = mobileSignInBtn.querySelector('.arrow-icon');
        if (existingArrow) {
            existingArrow.remove();
        }
        const arrowIcon = document.createElement('span');
        arrowIcon.className = 'arrow-icon';
        arrowIcon.innerHTML = `
            <img src="/assets/images/right-arrow-svg.png" alt="" class="arrow-img">
        `;
        mobileSignInBtn.appendChild(arrowIcon);
    }
}

// Handle Sign In button click - check auth and redirect
function handleSignInClick(e) {
    e.preventDefault();
    
    // Check authentication state
    let isAuthenticated = globalAuthState;
    
    // Also check Firebase directly if available
    if (window.firebase && window.firebase.auth) {
        const auth = window.firebase.auth;
        const currentUser = auth.currentUser;
        isAuthenticated = currentUser !== null && currentUser !== undefined;
        
        // If Firebase says not authenticated, check cookie as fallback
        if (!isAuthenticated) {
            isAuthenticated = checkAuthCookie();
        }
    } else {
        // If Firebase not available, check cookie
        isAuthenticated = checkAuthCookie();
    }
    
    // Redirect based on authentication
    if (isAuthenticated) {
        window.location.href = 'https://dashboard.nuerlo.com';
    } else {
        // If not authenticated, redirect to login
        window.location.href = 'https://dashboard.nuerlo.com/login';
    }
}

// Helper function to check for auth cookie (fallback for cross-domain auth)
function checkAuthCookie() {
    try {
        const cookies = document.cookie.split(';');
        const authCookie = cookies.find(c => c.trim().startsWith('firebase_auth='));
        if (authCookie) {
            const value = authCookie.split('=')[1];
            return value === 'true';
        }
        // Also check for common cookie names
        const alternativeCookies = ['nuerlo_auth', 'user_auth', 'auth_token'];
        for (const cookieName of alternativeCookies) {
            const cookie = cookies.find(c => c.trim().startsWith(cookieName + '='));
            if (cookie) {
                const value = cookie.split('=')[1];
                return value && value !== 'null' && value !== 'false';
            }
        }
        return false;
    } catch (e) {
        console.error('Error checking auth cookie:', e);
        return false;
    }
}

// Initialize navigation buttons - checks Firebase auth state immediately
// The onAuthStateChanged listener in the HTML will also call updateLoginButtons
// This function ensures buttons are updated even if the listener hasn't fired yet
function initAuthListener() {
    // Check if Firebase is available and check auth state
    function checkAuthState() {
        let isAuthenticated = false;
        
        // First, try Firebase auth
        if (window.firebase && window.firebase.auth) {
            const auth = window.firebase.auth;
            // Check current user - this may be null if auth hasn't restored state yet
            // but onAuthStateChanged will update it when ready
            const currentUser = auth.currentUser;
            
            // Default to false (not authenticated) if user is null or undefined
            isAuthenticated = currentUser !== null && currentUser !== undefined;
            
            // If Firebase says not authenticated, check cookie as fallback
            if (!isAuthenticated) {
                isAuthenticated = checkAuthCookie();
            }
            
            updateLoginButtons(isAuthenticated);
            return true;
        }
        
        // If Firebase not available, check cookie
        isAuthenticated = checkAuthCookie();
        updateLoginButtons(isAuthenticated);
        
        return false;
    }
    
    // Try immediately
    if (!checkAuthState()) {
        // If Firebase isn't ready, wait for it (with retries)
        let attempts = 0;
        const maxAttempts = 20; // 4 seconds total (200ms * 20)
        const checkInterval = setInterval(() => {
            attempts++;
            if (checkAuthState() || attempts >= maxAttempts) {
                clearInterval(checkInterval);
            }
        }, 200);
    }
    
    // Set up Sign In button click handler
    const signInBtn = document.getElementById('signin-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', handleSignInClick);
    }
}

// Make updateLoginButtons available globally for Firebase auth listener
// This must be available before Firebase's onAuthStateChanged fires
window.updateNavigationButtons = updateLoginButtons;

// Initialize auth listener immediately if DOM is ready, otherwise wait for DOMContentLoaded
function initializeNavigation() {
    initFadeIn();
    
    // Initialize navigation buttons - Firebase listener in HTML will also update these
    // This ensures buttons are updated even if Firebase hasn't initialized yet
    initAuthListener();
    
    // Close mobile menu when clicking on menu links
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link[href]');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobileMenuOverlay');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    // DOM is already loaded, initialize immediately
    initializeNavigation();
}

// Also set up Sign In button handler after a short delay to ensure DOM is ready
setTimeout(() => {
    const signInBtn = document.getElementById('signin-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', handleSignInClick);
    }
}, 100);

