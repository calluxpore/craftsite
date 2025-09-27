// Calendar JavaScript for ArtisanConnect

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

    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('event-modal').classList.add('hidden');
    });

    // Close modal when clicking outside
    document.getElementById('event-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
        }
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
            
            // Add click handler to show event details
            dayElement.addEventListener('click', function() {
                showEventModal(dayEvents, day, month, year);
            });
        }
        
        calendarDays.appendChild(dayElement);
    }
}

function showEventModal(dayEvents, day, month, year) {
    const modal = document.getElementById('event-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    modalTitle.textContent = `Events on ${months[month]} ${day}, ${year}`;
    
    let content = '';
    dayEvents.forEach(event => {
        content += `
            <div class="mb-4 p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div class="flex items-center mb-3">
                    <img src="${event.image}" alt="${event.title}" class="w-12 h-12 rounded-lg object-cover mr-3">
                    <div>
                        <h4 class="font-semibold text-gray-900">${event.title}</h4>
                        <p class="text-sm text-gray-600">${event.location}</p>
                    </div>
                </div>
                <p class="text-gray-700 text-sm">${event.description}</p>
            </div>
        `;
    });
    
    modalContent.innerHTML = content;
    modal.classList.remove('hidden');
}

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
            showEventModal([event], eventDate.getDate(), eventDate.getMonth(), eventDate.getFullYear());
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
