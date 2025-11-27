// Subtle Lazy Loading Implementation
// This script handles lazy loading of images and content with smooth fade-in effects

(function() {
    'use strict';

    // Lazy load images with Intersection Observer
    function initImageLazyLoading() {
        const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        if (!('IntersectionObserver' in window)) {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load image from data-src if available
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Add fade-in class for smooth appearance
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease-in-out';
                    
                    img.onload = function() {
                        img.style.opacity = '1';
                    };
                    
                    // If image is already cached, show it immediately
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before image enters viewport
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Lazy load background images
    function initBackgroundLazyLoading() {
        const elements = document.querySelectorAll('[data-bg]');
        
        if (!('IntersectionObserver' in window)) {
            elements.forEach(el => {
                if (el.dataset.bg) {
                    el.style.backgroundImage = `url(${el.dataset.bg})`;
                    el.removeAttribute('data-bg');
                }
            });
            return;
        }

        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    if (el.dataset.bg) {
                        el.style.backgroundImage = `url(${el.dataset.bg})`;
                        el.style.opacity = '0';
                        el.style.transition = 'opacity 0.5s ease-in-out';
                        
                        // Fade in after a brief delay
                        setTimeout(() => {
                            el.style.opacity = '1';
                        }, 50);
                        
                        el.removeAttribute('data-bg');
                    }
                    observer.unobserve(el);
                }
            });
        }, {
            rootMargin: '100px'
        });

        elements.forEach(el => {
            bgObserver.observe(el);
        });
    }

    // Lazy load blog post content sections
    function initContentLazyLoading() {
        const contentSections = document.querySelectorAll('.blog-section-title, .blog-text');
        const latestInsightsSection = document.querySelector('.latest-insights-section');
        
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all content immediately
            contentSections.forEach(section => {
                section.style.opacity = '1';
            });
            if (latestInsightsSection) {
                latestInsightsSection.style.opacity = '1';
            }
            return;
        }

        const contentObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    section.style.transition = 'opacity 0.6s ease-in-out';
                    section.style.opacity = '1';
                    observer.unobserve(section);
                }
            });
        }, {
            rootMargin: '100px' // Start loading 100px before content enters viewport
        });

        // Only lazy load sections that are not initially visible
        contentSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight + 100;
            
            if (isVisible) {
                // Content already visible, show immediately
                section.style.opacity = '1';
            } else {
                // Content below fold, lazy load
                section.style.opacity = '0';
                contentObserver.observe(section);
            }
        });

        // Lazy load latest insights section if it exists
        if (latestInsightsSection) {
            const rect = latestInsightsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight + 100;
            
            if (isVisible) {
                latestInsightsSection.style.opacity = '1';
            } else {
                latestInsightsSection.style.opacity = '0';
                contentObserver.observe(latestInsightsSection);
            }
        }
    }

    // Initialize lazy loading when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initImageLazyLoading();
            initBackgroundLazyLoading();
            initContentLazyLoading();
        });
    } else {
        initImageLazyLoading();
        initBackgroundLazyLoading();
        initContentLazyLoading();
    }
})();

