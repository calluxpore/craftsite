// Calendar JavaScript for ArtisanConnect

// Event page mapping
const eventPageMapping = {
    "Pottery Workshop": "pottery-workshop.html",
    "Textile Weaving": "textile-weaving.html", 
    "Metal Crafting": "metal-crafting.html",
    "Lamp Making": "lamp-making.html",
    "Block Printing": "block-printing.html",
    "Jewelry Making": "jewelry-making.html",
    "Madhubani Painting": "madhubani-painting.html",
    "Wood Carving": "wood-carving.html",
    "Silk Weaving": "silk-weaving.html",
    "Blue Pottery": "blue-pottery.html",
    "Carpet Weaving": "carpet-weaving.html",
    "Puppet Making": "puppet-making.html"
};

// Function to navigate to event page
function navigateToEventPage(eventTitle) {
    const eventPage = eventPageMapping[eventTitle];
    if (eventPage) {
        window.location.href = eventPage;
    } else {
        console.error('Event page not found for:', eventTitle);
    }
}

// Events data with dates
const events = [
    {
        id: 1,
        title: "Pottery Workshop",
        date: "2025-10-15",
        location: "Jaipur, Rajasthan",
        image: "assets/pottery.png",
        description: "Learn traditional pottery techniques from master craftsmen"
    },
    {
        id: 2,
        title: "Textile Weaving",
        date: "2025-10-22",
        location: "Varanasi, Uttar Pradesh", 
        image: "assets/textile weaving.png",
        description: "Master the ancient art of textile weaving"
    },
    {
        id: 3,
        title: "Metal Crafting",
        date: "2025-11-05",
        location: "Moradabad, Uttar Pradesh",
        image: "assets/metal crafting.png",
        description: "Explore traditional metalworking techniques"
    },
    {
        id: 4,
        title: "Lamp Making",
        date: "2025-11-12",
        location: "Firozabad, Uttar Pradesh",
        image: "assets/lamp making.png",
        description: "Create beautiful traditional oil lamps"
    },
    {
        id: 5,
        title: "Block Printing",
        date: "2025-11-20",
        location: "Sanganer, Rajasthan",
        image: "assets/block printing.png",
        description: "Learn the intricate art of block printing on fabric"
    },
    {
        id: 6,
        title: "Jewelry Making",
        date: "2025-11-28",
        location: "Kundan, Rajasthan",
        image: "assets/jewelry making.png",
        description: "Craft exquisite traditional jewelry pieces"
    },
    {
        id: 7,
        title: "Madhubani Painting",
        date: "2025-12-08",
        location: "Madhubani, Bihar",
        image: "assets/madhubani art.png",
        description: "Discover the vibrant folk art of Madhubani painting"
    },
    {
        id: 8,
        title: "Wood Carving",
        date: "2025-12-15",
        location: "Saharanpur, Uttar Pradesh",
        image: "assets/wood carving.png",
        description: "Master traditional wood carving techniques"
    },
    {
        id: 9,
        title: "Silk Weaving",
        date: "2025-12-22",
        location: "Kanchipuram, Tamil Nadu",
        image: "assets/silk weaving.png",
        description: "Learn the art of silk weaving from expert artisans"
    },
    {
        id: 10,
        title: "Blue Pottery",
        date: "2025-12-28",
        location: "Jaipur, Rajasthan",
        image: "assets/blue pottery.png",
        description: "Create stunning blue pottery pieces"
    },
    {
        id: 11,
        title: "Carpet Weaving",
        date: "2026-01-05",
        location: "Srinagar, Kashmir",
        image: "assets/carpet weaving.png",
        description: "Weave beautiful traditional carpets"
    },
    {
        id: 12,
        title: "Puppet Making",
        date: "2026-01-12",
        location: "Udaipur, Rajasthan",
        image: "assets/puppet making.png",
        description: "Create traditional Rajasthani puppets"
    }
];

let currentDate = new Date();
let currentMonth = 9; // October 2025 (0-based index, so 9 = October)
let currentYear = 2025;

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calendar loaded with', events.length, 'events');
    console.log('First few events:', events.slice(0, 3));
    initializeCalendar();
    setupEventListeners();
    displayEventsList();
});

function initializeCalendar() {
    displayCalendar(currentMonth, currentYear);
}

function setupEventListeners() {
    document.getElementById('prev-month').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        displayCalendar(currentMonth, currentYear);
    });

    document.getElementById('next-month').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        displayCalendar(currentMonth, currentYear);
    });
}

function displayCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Update month header
    document.getElementById('current-month').textContent = `${months[month]} ${year}`;
    
    // Clear previous calendar
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'p-3 h-32 border-r border-b border-gray-100';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'p-3 h-32 border-r border-b border-gray-100 cursor-pointer hover:bg-gray-50 relative flex flex-col';
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'font-medium text-gray-900';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Check if there's an event on this day
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = events.filter(event => event.date === dateString);
        
        // Debug logging for October 15th specifically
        if (month === 9 && day === 15) {
            console.log('Checking October 15th:', dateString, 'Found events:', dayEvents);
        }
        
        if (dayEvents.length > 0) {
            dayElement.classList.add('has-event');
            
            // Show event titles on calendar
            dayEvents.forEach((event, index) => {
                if (index < 1) { // Show first event title
                    const eventTitle = document.createElement('div');
                    eventTitle.className = 'text-xs text-terracotta font-medium mt-1 truncate';
                    eventTitle.textContent = event.title;
                    dayElement.appendChild(eventTitle);
                }
            });
            
            // Add event indicators for multiple events
            if (dayEvents.length > 1) {
                const eventDots = document.createElement('div');
                eventDots.className = 'flex gap-1 mt-1';
                
                dayEvents.forEach((event, index) => {
                    if (index < 3) { // Show max 3 dots
                        const eventDot = document.createElement('div');
                        eventDot.className = 'w-2 h-2 bg-terracotta rounded-full';
                        eventDots.appendChild(eventDot);
                    }
                });
                
                if (dayEvents.length > 3) {
                    const moreText = document.createElement('span');
                    moreText.className = 'text-xs text-gray-500 ml-1';
                    moreText.textContent = `+${dayEvents.length - 3}`;
                    eventDots.appendChild(moreText);
                }
                
                dayElement.appendChild(eventDots);
            } else {
                // Single event dot
                const eventDot = document.createElement('div');
                eventDot.className = 'w-2 h-2 bg-terracotta rounded-full mt-1';
                dayElement.appendChild(eventDot);
            }
            
            // Add click handler to navigate to event page
            dayElement.addEventListener('click', function() {
                if (dayEvents.length === 1) {
                    // Single event - navigate directly
                    navigateToEventPage(dayEvents[0].title);
                } else if (dayEvents.length > 1) {
                    // Multiple events - for now navigate to first event
                    // You could show a small dropdown or list in the future
                    navigateToEventPage(dayEvents[0].title);
                }
            });
        }
        
        calendarDays.appendChild(dayElement);
    }
}

// Modal functionality removed - now navigating directly to event pages

function displayEventsList() {
    const eventsList = document.getElementById('events-list');
    
    // Sort events by date
    const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const eventElement = document.createElement('div');
        eventElement.className = 'flex items-center p-3 rounded-xl border border-gray-200 hover:border-terracotta/30 hover:bg-terracotta/5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md';
        
        eventElement.innerHTML = `
            <div class="w-3 h-3 bg-terracotta rounded-full mr-3"></div>
            <div class="flex-1">
                <div class="font-medium text-gray-900 text-sm">${event.title}</div>
                <div class="text-xs text-gray-600">${eventDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                })}</div>
            </div>
        `;
        
        eventElement.addEventListener('click', function() {
            navigateToEventPage(event.title);
        });
        
        eventsList.appendChild(eventElement);
    });
}

// Add some custom styles
const style = document.createElement('style');
style.textContent = `
    .has-event {
        background-color: #fef7f0;
        border-color: #D8734B20;
    }
    
    .has-event:hover {
        background-color: #fef2e8;
    }
`;
document.head.appendChild(style);
