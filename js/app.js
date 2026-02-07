// Sample Job Data
const jobsData = [
    {
        id: 1,
        title: "Senior ESL Teacher",
        company: "International Language Academy",
        location: "Seoul, South Korea",
        region: "asia",
        type: "Full-time",
        salary: "$2,500 - $3,500/month",
        logo: "ILA",
        badge: "Featured",
        description: "Seeking experienced ESL teacher for our premium language program. Teach adult professionals in a modern facility with excellent resources.",
        tags: ["TEFL Required", "Housing Provided", "Flight Allowance"],
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "Online English Instructor",
        company: "Global English Online",
        location: "Remote",
        region: "online",
        type: "Part-time",
        salary: "$18 - $25/hour",
        logo: "GEO",
        badge: "Remote",
        description: "Flexible online teaching position. Set your own schedule and teach students from around the world from the comfort of your home.",
        tags: ["Flexible Hours", "No Commute", "Work From Home"],
        posted: "1 week ago"
    },
    {
        id: 3,
        title: "Elementary School Teacher",
        company: "Sunshine International School",
        location: "Bangkok, Thailand",
        region: "asia",
        type: "Full-time",
        salary: "$2,000 - $2,800/month",
        logo: "SIS",
        badge: "New",
        description: "Join our vibrant international school community. Teach young learners in a supportive environment with modern facilities and resources.",
        tags: ["Bachelor's Required", "Visa Sponsorship", "Health Insurance"],
        posted: "3 days ago"
    },
    {
        id: 4,
        title: "Business English Trainer",
        company: "Corporate Language Solutions",
        location: "Dubai, UAE",
        region: "middle-east",
        type: "Full-time",
        salary: "$3,500 - $4,500/month",
        logo: "CLS",
        badge: "Featured",
        description: "Deliver customized Business English training to corporate clients. Excellent salary package with tax-free income and benefits.",
        tags: ["Tax-Free", "Housing Allowance", "Experience Required"],
        posted: "5 days ago"
    },
    {
        id: 5,
        title: "Conversation Teacher",
        company: "Madrid Language Center",
        location: "Madrid, Spain",
        region: "europe",
        type: "Full-time",
        salary: "€1,800 - €2,200/month",
        logo: "MLC",
        badge: "",
        description: "Teach conversational English to Spanish students of all ages. Enjoy the vibrant culture of Madrid while building your teaching career.",
        tags: ["EU Passport Preferred", "TEFL Required", "Cultural Exchange"],
        posted: "1 week ago"
    },
    {
        id: 6,
        title: "University ESL Instructor",
        company: "National University",
        location: "Hanoi, Vietnam",
        region: "asia",
        type: "Full-time",
        salary: "$1,500 - $2,000/month",
        logo: "NU",
        badge: "",
        description: "Teach English to university students preparing for international studies. Low cost of living with high quality of life.",
        tags: ["Master's Preferred", "Research Opportunities", "Visa Support"],
        posted: "4 days ago"
    },
    {
        id: 7,
        title: "Kids English Teacher",
        company: "Little Stars Academy",
        location: "Mexico City, Mexico",
        region: "latin-america",
        type: "Full-time",
        salary: "$1,200 - $1,600/month",
        logo: "LSA",
        badge: "New",
        description: "Energetic teachers wanted for our children's English program. Make learning fun while experiencing Mexican culture.",
        tags: ["Native Speaker", "Experience with Kids", "Spanish Helpful"],
        posted: "2 days ago"
    },
    {
        id: 8,
        title: "IELTS Preparation Instructor",
        company: "Test Prep Excellence",
        location: "Istanbul, Turkey",
        region: "europe",
        type: "Full-time",
        salary: "$1,800 - $2,400/month",
        logo: "TPE",
        badge: "Featured",
        description: "Specialize in IELTS test preparation. Help students achieve their academic and immigration goals with expert instruction.",
        tags: ["IELTS Certification", "Competitive Salary", "Modern Facilities"],
        posted: "6 days ago"
    },
    {
        id: 9,
        title: "Academic English Teacher",
        company: "International Prep School",
        location: "Prague, Czech Republic",
        region: "europe",
        type: "Full-time",
        salary: "€1,600 - €2,000/month",
        logo: "IPS",
        badge: "",
        description: "Prepare high school students for English-medium universities. Beautiful European city with excellent quality of life.",
        tags: ["Teaching License", "EU Work Permit", "Professional Development"],
        posted: "1 week ago"
    },
    {
        id: 10,
        title: "Young Learners Specialist",
        company: "Kids First Education",
        location: "Shanghai, China",
        region: "asia",
        type: "Full-time",
        salary: "$2,800 - $3,800/month",
        logo: "KFE",
        badge: "Featured",
        description: "Teach English to children aged 3-12 using innovative methods. Excellent benefits package in one of Asia's most dynamic cities.",
        tags: ["Housing Provided", "Flight Reimbursement", "Bonus Opportunities"],
        posted: "3 days ago"
    },
    {
        id: 11,
        title: "Online TOEFL Tutor",
        company: "Test Masters Online",
        location: "Remote",
        region: "online",
        type: "Part-time",
        salary: "$20 - $30/hour",
        logo: "TMO",
        badge: "Remote",
        description: "Help students prepare for TOEFL exams through one-on-one online sessions. Flexible scheduling available.",
        tags: ["TOEFL Expertise", "Flexible Schedule", "High Earning Potential"],
        posted: "5 days ago"
    },
    {
        id: 12,
        title: "Language School Director",
        company: "English First Academy",
        location: "Buenos Aires, Argentina",
        region: "latin-america",
        type: "Full-time",
        salary: "$2,200 - $3,000/month",
        logo: "EFA",
        badge: "New",
        description: "Lead our growing language school. Combine teaching with management responsibilities in vibrant Buenos Aires.",
        tags: ["Management Experience", "Leadership Role", "Competitive Package"],
        posted: "2 days ago"
    }
];

// State Management
let filteredJobs = [...jobsData];
let currentFilter = 'all';
let displayedJobsCount = 6;

// DOM Elements
const jobsGrid = document.getElementById('jobsGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterTags = document.querySelectorAll('.filter-tag');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const header = document.getElementById('header');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderJobs();
    setupEventListeners();
    setupScrollAnimations();
    setupSmoothScroll();
});

// Render Jobs
function renderJobs() {
    const jobsToDisplay = filteredJobs.slice(0, displayedJobsCount);
    
    jobsGrid.innerHTML = jobsToDisplay.map(job => `
        <div class="job-card fade-in" data-job-id="${job.id}">
            ${job.badge ? `<div class="job-badge">${job.badge}</div>` : ''}
            <div class="job-header">
                <div class="job-logo">${job.logo}</div>
            </div>
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">${job.company}</div>
            <div class="job-details">
                <div class="job-detail-item">
                    <span>📍</span>
                    <span>${job.location}</span>
                </div>
                <div class="job-detail-item">
                    <span>💼</span>
                    <span>${job.type}</span>
                </div>
                <div class="job-detail-item">
                    <span>🕒</span>
                    <span>${job.posted}</span>
                </div>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
            </div>
            <div class="job-footer">
                <div class="job-salary">${job.salary}</div>
                <button class="btn btn-primary" onclick="applyToJob(${job.id})">Apply Now</button>
            </div>
        </div>
    `).join('');
    
    // Update load more button visibility
    loadMoreBtn.style.display = displayedJobsCount >= filteredJobs.length ? 'none' : 'inline-block';
    
    // Trigger scroll animations for new elements
    setTimeout(() => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }, 100);
}

// Filter Jobs
function filterJobs(region) {
    currentFilter = region;
    displayedJobsCount = 6;
    
    if (region === 'all') {
        filteredJobs = [...jobsData];
    } else {
        filteredJobs = jobsData.filter(job => job.region === region);
    }
    
    // Apply search if there's a search term
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        searchJobs(searchTerm);
    } else {
        renderJobs();
    }
}

// Search Jobs
function searchJobs(searchTerm = null) {
    const term = (searchTerm || searchInput.value).toLowerCase().trim();
    
    if (!term) {
        filterJobs(currentFilter);
        return;
    }
    
    let baseJobs = currentFilter === 'all' ? jobsData : jobsData.filter(job => job.region === currentFilter);
    
    filteredJobs = baseJobs.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.tags.some(tag => tag.toLowerCase().includes(term))
    );
    
    displayedJobsCount = 6;
    renderJobs();
}

// Load More Jobs
function loadMoreJobs() {
    displayedJobsCount += 6;
    renderJobs();
}

// Apply to Job
function applyToJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    if (job) {
        alert(`Thank you for your interest in the ${job.title} position at ${job.company}!\n\nIn a real application, this would open an application form or redirect to the employer's application page.`);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            filterJobs(tag.dataset.filter);
        });
    });
    
    // Search
    searchBtn.addEventListener('click', () => searchJobs());
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchJobs();
        }
    });
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMoreJobs);
    
    // Mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Contact form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.\n\n(In a real application, this would send your message to our team.)');
        contactForm.reset();
    });
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Re-observe when new elements are added
    const gridObserver = new MutationObserver(() => {
        document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
            observer.observe(el);
        });
    });
    
    if (jobsGrid) {
        gridObserver.observe(jobsGrid, { childList: true });
    }
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add real-time search with debounce
searchInput.addEventListener('input', debounce(() => {
    searchJobs();
}, 300));
