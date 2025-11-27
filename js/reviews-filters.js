// Reviews page specific functionality
// This file contains the filter functionality specific to the reviews page

// Filter functionality
function filterReviews() {
    const ratingFilter = document.getElementById('ratingFilter').value;
    const courseFilter = document.getElementById('courseFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    const reviews = document.querySelectorAll('.review-card');
    
    reviews.forEach(review => {
        const rating = review.getAttribute('data-rating');
        const course = review.getAttribute('data-course');
        
        let showReview = true;
        
        if (ratingFilter !== 'all' && rating < ratingFilter) {
            showReview = false;
        }
        
        if (courseFilter !== 'all' && course !== courseFilter) {
            showReview = false;
        }
        
        review.style.display = showReview ? 'block' : 'none';
    });
    
    // Sort reviews
    const reviewsGrid = document.getElementById('reviewsGrid');
    const reviewsArray = Array.from(reviews).filter(review => review.style.display !== 'none');
    
    reviewsArray.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date'));
        const dateB = new Date(b.getAttribute('data-date'));
        const ratingA = parseInt(a.getAttribute('data-rating'));
        const ratingB = parseInt(b.getAttribute('data-rating'));
        
        switch(sortFilter) {
            case 'newest':
                return dateB - dateA;
            case 'oldest':
                return dateA - dateB;
            case 'highest':
                return ratingB - ratingA;
            case 'lowest':
                return ratingA - ratingB;
            default:
                return 0;
        }
    });
    
    reviewsArray.forEach(review => reviewsGrid.appendChild(review));
    
    // Update active filters display
    updateActiveFilters();
}

// Update active filters display
function updateActiveFilters() {
    const activeFiltersContainer = document.getElementById('activeFilters');
    const ratingFilter = document.getElementById('ratingFilter').value;
    const courseFilter = document.getElementById('courseFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    activeFiltersContainer.innerHTML = '';
    
    const filters = [];
    
    if (ratingFilter !== 'all') {
        filters.push({
            type: 'rating',
            value: ratingFilter,
            label: `${ratingFilter} Stars`,
            element: 'ratingFilter'
        });
    }
    
    if (courseFilter !== 'all') {
        const courseLabels = {
            'healthcare': 'AI Websites & Automation',
            'ai-for-healthcare': 'AI Websites & Automation'
        };
        filters.push({
            type: 'course',
            value: courseFilter,
            label: courseLabels[courseFilter] || courseFilter,
            element: 'courseFilter'
        });
    }
    
    if (sortFilter !== 'newest') {
        const sortLabels = {
            'oldest': 'Oldest First',
            'highest': 'Highest Rated',
            'lowest': 'Lowest Rated'
        };
        filters.push({
            type: 'sort',
            value: sortFilter,
            label: sortLabels[sortFilter] || sortFilter,
            element: 'sortFilter'
        });
    }
    
    if (filters.length > 0) {
        const activeFiltersTitle = document.createElement('div');
        activeFiltersTitle.className = 'active-filters-title';
        activeFiltersTitle.textContent = 'Active Filters:';
        activeFiltersContainer.appendChild(activeFiltersTitle);
        
        filters.forEach(filter => {
            const filterChip = document.createElement('div');
            filterChip.className = 'filter-chip';
            filterChip.innerHTML = `
                <span>${filter.label}</span>
                <button class="remove-filter" data-element="${filter.element}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;
            activeFiltersContainer.appendChild(filterChip);
        });
    }
}

// Clear all filters
function clearAllFilters() {
    document.getElementById('ratingFilter').value = 'all';
    document.getElementById('courseFilter').value = 'all';
    document.getElementById('sortFilter').value = 'newest';
    filterReviews();
}

// Initialize reviews page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for filters
    const ratingFilter = document.getElementById('ratingFilter');
    const courseFilter = document.getElementById('courseFilter');
    const sortFilter = document.getElementById('sortFilter');
    const clearFilters = document.getElementById('clearFilters');
    
    if (ratingFilter) ratingFilter.addEventListener('change', filterReviews);
    if (courseFilter) courseFilter.addEventListener('change', filterReviews);
    if (sortFilter) sortFilter.addEventListener('change', filterReviews);
    if (clearFilters) clearFilters.addEventListener('click', clearAllFilters);
    
    // Add event listener for removing individual filters
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-filter')) {
            const elementId = e.target.closest('.remove-filter').getAttribute('data-element');
            const element = document.getElementById(elementId);
            
            if (elementId === 'ratingFilter') {
                element.value = 'all';
            } else if (elementId === 'courseFilter') {
                element.value = 'all';
            } else if (elementId === 'sortFilter') {
                element.value = 'newest';
            }
            
            filterReviews();
        }
    });
    
    // Mobile filter button listeners
    const filterBtns = document.querySelectorAll('.filter-modal-btn[data-filter]');
    const courseBtns = document.querySelectorAll('.filter-modal-btn[data-course]');
    const sortBtns = document.querySelectorAll('.filter-modal-btn[data-sort], .mobile-sort-btn[data-sort]');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const desktopBtn = document.querySelector(`.filter-btn[data-filter="${this.dataset.filter}"]`);
            if (desktopBtn) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                desktopBtn.classList.add('active');
            }
            applyMobileFilters();
        });
    });
    
    courseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            courseBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const desktopBtn = document.querySelector(`.course-btn[data-course="${this.dataset.course}"]`);
            if (desktopBtn) {
                document.querySelectorAll('.course-btn').forEach(b => b.classList.remove('active'));
                desktopBtn.classList.add('active');
            }
            applyMobileFilters();
        });
    });
    
    sortBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sortBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const desktopBtn = document.querySelector(`.sort-btn[data-sort="${this.dataset.sort}"]`);
            if (desktopBtn) {
                document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                desktopBtn.classList.add('active');
            }
            // Trigger the actual filtering
            applyMobileFilters();
        });
    });
});

// Apply mobile filters function
function applyMobileFilters() {
    // Get active filter from modal buttons
    const activeFilterBtn = document.querySelector('.filter-modal-btn[data-filter].active');
    const activeCourseBtn = document.querySelector('.filter-modal-btn[data-course].active');
    const activeSortBtn = document.querySelector('.mobile-sort-btn[data-sort].active, .filter-modal-btn[data-sort].active');
    
    const ratingFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    const courseFilter = activeCourseBtn ? activeCourseBtn.dataset.course : 'all';
    const sortFilter = activeSortBtn ? activeSortBtn.dataset.sort : 'newest';
    
    const reviews = document.querySelectorAll('.review-card');
    
    // Filter reviews
    reviews.forEach(review => {
        const rating = review.getAttribute('data-rating');
        const course = review.getAttribute('data-course');
        
        let showReview = true;
        
        if (ratingFilter !== 'all' && rating < ratingFilter) {
            showReview = false;
        }
        
        if (courseFilter !== 'all' && course !== courseFilter) {
            showReview = false;
        }
        
        review.style.display = showReview ? 'block' : 'none';
    });
    
    // Sort reviews
    const reviewsGrid = document.getElementById('reviewsGrid');
    const reviewsArray = Array.from(reviews).filter(review => review.style.display !== 'none');
    
    reviewsArray.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date'));
        const dateB = new Date(b.getAttribute('data-date'));
        const ratingA = parseInt(a.getAttribute('data-rating'));
        const ratingB = parseInt(b.getAttribute('data-rating'));
        
        switch(sortFilter) {
            case 'newest':
                return dateB - dateA;
            case 'oldest':
                return dateA - dateB;
            case 'highest':
                return ratingB - ratingA;
            case 'lowest':
                return ratingA - ratingB;
            default:
                return 0;
        }
    });
    
    reviewsArray.forEach(review => reviewsGrid.appendChild(review));
}

// Toggle filter modal
function toggleFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.classList.toggle('active');
    
    if (modal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}
