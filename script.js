// ArtisanConnect JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeNavigation();
    initializeAnimations();
    initializeMobileMenu();
    initializeShowMore();
    initializeViewAll();
    initializeEventCardNavigation();
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    // Navigation is now handled with simple links, no JavaScript needed
    const eventsSection = document.getElementById('events-section');
    
    // Ensure events section is visible on homepage
    if (eventsSection) {
        eventsSection.classList.remove('hidden');
        eventsSection.classList.add('content-section');
    }
}

/**
 * Switch between tabs with smooth animations
 */
function switchToTab(activeTab, eventsTab, jobsTab, eventsSection, jobsSection) {
    // Remove active class from both tabs
    eventsTab.classList.remove('active');
    jobsTab.classList.remove('active');
    
    if (activeTab === 'events') {
        // Activate Events tab
        eventsTab.classList.add('active');
        showSection(eventsSection);
        hideSection(jobsSection);
    } else {
        // Activate Jobs tab
        jobsTab.classList.add('active');
        showSection(jobsSection);
        hideSection(eventsSection);
    }
    
    // Update URL hash without triggering scroll
    history.replaceState(null, null, `#${activeTab}`);
}

/**
 * Show a section with animation
 */
function showSection(section) {
    // First remove hidden class to make element visible
    section.classList.remove('hidden');
    
    // Force reflow to ensure the element is rendered
    section.offsetHeight;
    
    // Add fade-in animation
    section.classList.add('fade-in-up');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        section.classList.remove('fade-in-up');
    }, 500);
}

/**
 * Hide a section with animation
 */
function hideSection(section) {
    section.classList.add('hidden');
}

/**
 * Initialize Show More functionality for events
 */
/**
 * Initialize Show More functionality for events
 */
function initializeShowMore() {
    const showMoreBtn = document.getElementById('show-more-btn');
    const showMoreText = document.getElementById('show-more-text');
    const showMoreIcon = document.getElementById('show-more-icon');
    const eventItems = document.querySelectorAll('.event-item');
    
    // Exit if button doesn't exist
    if (!showMoreBtn || !showMoreText || !showMoreIcon || eventItems.length === 0) {
        return;
    }
    
    let currentlyShowing = 4; // Initially showing first 4 events
    let isExpanded = false;
    
    // Show only first 4 events initially
    eventItems.forEach((item, index) => {
        if (index < 4) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
    
    showMoreBtn.addEventListener('click', function() {
        if (!isExpanded) {
            // Show more events in batches of 4
            const nextBatch = Math.min(currentlyShowing + 4, eventItems.length);
            
            // Animate new cards in
            for (let i = currentlyShowing; i < nextBatch; i++) {
                const eventItem = eventItems[i];
                eventItem.classList.remove('hidden');
                
                // Add animation delay for staggered effect
                setTimeout(() => {
                    eventItem.style.opacity = '0';
                    eventItem.style.transform = 'translateY(20px)';
                    eventItem.style.transition = 'all 0.4s ease';
                    
                    // Trigger animation
                    requestAnimationFrame(() => {
                        eventItem.style.opacity = '1';
                        eventItem.style.transform = 'translateY(0)';
                    });
                }, (i - currentlyShowing) * 100);
            }
            
            currentlyShowing = nextBatch;
            
            // Update button text and state
            if (currentlyShowing >= eventItems.length) {
                showMoreText.textContent = 'Show Less';
                showMoreIcon.style.transform = 'rotate(180deg)';
                isExpanded = true;
            } else {
                showMoreText.textContent = 'Show More';
            }
            
        } else {
            // Show less - collapse back to first 4
            eventItems.forEach((item, index) => {
                if (index >= 4) {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.classList.add('hidden');
                        item.style.opacity = '';
                        item.style.transform = '';
                        item.style.transition = '';
                    }, 300);
                }
            });
            
            currentlyShowing = 4;
            isExpanded = false;
            showMoreText.textContent = 'Show More';
            showMoreIcon.style.transform = 'rotate(0deg)';
            
            // Smooth scroll to events section
            document.getElementById('events-section').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
}

/**
 * Initialize animations and scroll effects
 */
function initializeAnimations() {
    // Animate cards on scroll
    observeElements();
    
    // Add smooth hover effects to buttons
    addButtonEffects();
    
    // Initialize parallax effects
    initializeParallax();
}

/**
 * Observe elements for scroll-triggered animations
 */
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all cards
    const cards = document.querySelectorAll('.hover-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

/**
 * Add enhanced button effects
 */
function addButtonEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Add pulse effect for CTA buttons
        if (button.textContent.includes('Register') || button.textContent.includes('Apply') || button.textContent.includes('Start Exploring')) {
            button.classList.add('pulse-on-hover');
        }
    });
}

/**
 * Create ripple effect on button click
 */
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation CSS if not already added
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Initialize parallax scrolling effects
 */
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    const navigation = document.querySelector('nav');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const navigation = document.querySelector('nav');
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    
    // Create mobile menu if it doesn't exist
    if (!document.querySelector('#mobile-menu')) {
        createMobileMenu();
    }
    
    const mobileMenu = document.querySelector('#mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

/**
 * Create mobile menu dynamically
 */
function createMobileMenu() {
    const header = document.querySelector('header');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'md:hidden bg-white border-t shadow-lg hidden';
    
    mobileMenu.innerHTML = `
        <div class="px-4 py-4 space-y-2">
            <button class="nav-button mobile-events-tab w-full text-left px-4 py-2 rounded-lg">Events</button>
            <button class="nav-button mobile-jobs-tab w-full text-left px-4 py-2 rounded-lg">Jobs</button>
            <a href="#" class="block px-4 py-2 text-gray-600 hover:text-terracotta">About</a>
            <a href="#" class="block px-4 py-2 text-gray-600 hover:text-terracotta">Contact</a>
        </div>
    `;
    
    header.appendChild(mobileMenu);
    
    // Add event listeners for mobile menu tabs
    const mobileEventsTab = mobileMenu.querySelector('.mobile-events-tab');
    const mobileJobsTab = mobileMenu.querySelector('.mobile-jobs-tab');
    const eventsSection = document.getElementById('events-section');
    const jobsSection = document.getElementById('jobs-section');
    const desktopEventsTab = document.getElementById('events-tab');
    const desktopJobsTab = document.getElementById('jobs-tab');
    
    mobileEventsTab.addEventListener('click', function() {
        switchToTab('events', desktopEventsTab, desktopJobsTab, eventsSection, jobsSection);
        mobileEventsTab.classList.add('active');
        mobileJobsTab.classList.remove('active');
        mobileMenu.classList.add('hidden');
    });
    
    mobileJobsTab.addEventListener('click', function() {
        switchToTab('jobs', desktopEventsTab, desktopJobsTab, eventsSection, jobsSection);
        mobileJobsTab.classList.add('active');
        mobileEventsTab.classList.remove('active');
        mobileMenu.classList.add('hidden');
    });
}

/**
 * Handle URL hash changes for direct navigation
 */
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1);
    if (hash === 'events' || hash === 'jobs') {
        const eventsTab = document.getElementById('events-tab');
        const jobsTab = document.getElementById('jobs-tab');
        const eventsSection = document.getElementById('events-section');
        const jobsSection = document.getElementById('jobs-section');
        
        switchToTab(hash, eventsTab, jobsTab, eventsSection, jobsSection);
    }
});

/**
 * Smooth scroll to top functionality
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Add scroll-to-top button
 */
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'fixed bottom-6 right-6 bg-terracotta text-white w-12 h-12 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 z-50 opacity-0 pointer-events-none';
    scrollButton.onclick = scrollToTop;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.remove('opacity-0', 'pointer-events-none');
            scrollButton.classList.add('opacity-100');
        } else {
            scrollButton.classList.add('opacity-0', 'pointer-events-none');
            scrollButton.classList.remove('opacity-100');
        }
    });
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', function() {
    addScrollToTopButton();
});

/**
 * Form validation and submission (for future use)
 */
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

/**
 * Local storage utilities for user preferences
 */
const UserPreferences = {
    save: function(key, value) {
        localStorage.setItem(`artisan_connect_${key}`, JSON.stringify(value));
    },
    
    load: function(key) {
        const stored = localStorage.getItem(`artisan_connect_${key}`);
        return stored ? JSON.parse(stored) : null;
    },
    
    remove: function(key) {
        localStorage.removeItem(`artisan_connect_${key}`);
    }
};

/**
 * Analytics and tracking (placeholder for future implementation)
 */
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
}

// Removed initializeCalendarButton - navigation now uses simple links

/**
 * Initialize View All functionality for events
 */
function initializeViewAll() {
    const viewAllBtn = document.getElementById('view-all-events-btn');
    
    if (!viewAllBtn) return;
    
    viewAllBtn.addEventListener('click', function() {
        const eventItems = document.querySelectorAll('.event-item');
        let allVisible = true;
        
        // Check if all events are currently visible
        eventItems.forEach(item => {
            if (item.classList.contains('hidden')) {
                allVisible = false;
            }
        });
        
        if (!allVisible) {
            // Show all events with staggered animation
            eventItems.forEach((item, index) => {
                if (item.classList.contains('hidden')) {
                    item.classList.remove('hidden');
                    
                    // Add staggered animation
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 80); // Staggered timing
                }
            });
            
            // Update button text
            viewAllBtn.textContent = 'Show Less ↑';
            
            // Update show more button if it exists
            const showMoreBtn = document.getElementById('show-more-btn');
            const showMoreText = document.getElementById('show-more-text');
            const showMoreIcon = document.getElementById('show-more-icon');
            
            if (showMoreBtn && showMoreText && showMoreIcon) {
                showMoreText.textContent = 'Show Less';
                showMoreIcon.style.transform = 'rotate(180deg)';
            }
        } else {
            // Hide events beyond first 4 with instant clean transition
            eventItems.forEach((item, index) => {
                if (index >= 4) {
                    item.classList.add('hidden');
                }
            });
            
            // Update button text
            viewAllBtn.textContent = 'View All →';
            
            // Update show more button if it exists
            const showMoreBtn = document.getElementById('show-more-btn');
            const showMoreText = document.getElementById('show-more-text');
            const showMoreIcon = document.getElementById('show-more-icon');
            
            if (showMoreBtn && showMoreText && showMoreIcon) {
                showMoreText.textContent = 'Show More';
                showMoreIcon.style.transform = 'rotate(0deg)';
            }
            
            // Smooth scroll to events section
            document.getElementById('events-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start' 
            });
        }
    });
}

/**
 * Initialize event card navigation functionality
 */
function initializeEventCardNavigation() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Define event pages mapping
            const eventPages = {
                0: 'pottery-workshop.html',        // Pottery Workshop
                1: 'textile-weaving.html',         // Textile Weaving (to be created)
                2: 'metal-crafting.html',          // Metal Crafting (to be created)
                3: 'lamp-making.html',             // Lamp Making (to be created)
                4: 'block-printing.html',          // Block Printing (to be created)
                5: 'jewelry-making.html',          // Jewelry Making (to be created)
                6: 'madhubani-painting.html',      // Madhubani Painting (to be created)
                7: 'wood-carving.html',            // Wood Carving (to be created)
                8: 'silk-weaving.html',            // Silk Weaving (to be created)
                9: 'blue-pottery.html',            // Blue Pottery (to be created)
                10: 'carpet-weaving.html',         // Carpet Weaving (to be created)
                11: 'puppet-making.html'           // Puppet Making (to be created)
            };
            
            // Get the data-index from the clicked card
            const cardIndex = parseInt(card.getAttribute('data-index'));
            
            // Navigate to the corresponding page
            if (eventPages[cardIndex]) {
                window.location.href = eventPages[cardIndex];
            } else {
                // Fallback for cards without dedicated pages yet
                console.log(`Event page for index ${cardIndex} not yet created`);
            }
        });
    });
}

// Export functions for potential external use
window.ArtisanConnect = {
    scrollToTop,
    validateForm,
    UserPreferences,
    trackEvent,
    initializeViewAll,
    initializeEventCardNavigation
};
