// ===================================
// ESL Connect - Jobs Page
// ===================================

// Sample job data (in production, this would come from API)
const sampleJobs = [
    {
        id: 1,
        title: "Elementary English Teacher",
        company: "Seoul International Academy",
        location: "Seoul, South Korea",
        country: "korea",
        salary: "$2,200 - $2,500/month",
        salaryRange: "2000-2500",
        type: "full-time",
        badge: "Featured",
        description: "Seeking enthusiastic elementary English teacher for our international school. Experience with young learners preferred. Housing and flight allowance provided.",
        requirements: ["Bachelor's Degree", "TEFL/TESOL", "Native Speaker"],
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "High School ESL Instructor",
        company: "Tokyo English Academy",
        location: "Tokyo, Japan",
        country: "japan",
        salary: "$2,800 - $3,200/month",
        salaryRange: "2500-3000",
        type: "full-time",
        badge: "New",
        description: "Join our prestigious high school teaching advanced English to motivated students. Competitive salary with benefits package including housing assistance.",
        requirements: ["Master's Degree Preferred", "2+ years experience", "TESOL Certified"],
        posted: "1 day ago"
    },
    {
        id: 3,
        title: "Business English Trainer",
        company: "Shanghai Corporate Language Center",
        location: "Shanghai, China",
        country: "china",
        salary: "$3,000 - $3,500/month",
        salaryRange: "3000+",
        type: "full-time",
        badge: "Urgent",
        description: "Experienced business English trainer needed for corporate clients. Flexible schedule, professional development opportunities, and excellent benefits.",
        requirements: ["Business Background", "TEFL Certified", "3+ years experience"],
        posted: "3 hours ago"
    },
    {
        id: 4,
        title: "Kindergarten English Teacher",
        company: "Taipei Kids Academy",
        location: "Taipei, Taiwan",
        country: "taiwan",
        salary: "$1,800 - $2,100/month",
        salaryRange: "1500-2000",
        type: "full-time",
        badge: "",
        description: "Fun and energetic kindergarten teacher wanted! Work with adorable kids aged 3-6. Small class sizes and supportive environment.",
        requirements: ["Love working with kids", "TEFL/TESOL", "Patient and creative"],
        posted: "5 days ago"
    },
    {
        id: 5,
        title: "Part-time Conversation Teacher",
        company: "Osaka Language School",
        location: "Osaka, Japan",
        country: "japan",
        salary: "$25 - $35/hour",
        salaryRange: "2000-2500",
        type: "part-time",
        badge: "",
        description: "Flexible part-time position teaching conversation classes to adults. Evening and weekend availability required.",
        requirements: ["Native Speaker", "Conversational skills", "Flexible schedule"],
        posted: "1 week ago"
    },
    {
        id: 6,
        title: "University English Lecturer",
        company: "Busan National University",
        location: "Busan, South Korea",
        country: "korea",
        salary: "$2,600 - $3,000/month",
        salaryRange: "2500-3000",
        type: "contract",
        badge: "Featured",
        description: "1-year contract position teaching English composition and literature to university students. Research opportunities available.",
        requirements: ["Master's Degree Required", "University teaching experience", "Published work preferred"],
        posted: "4 days ago"
    },
    {
        id: 7,
        title: "Online English Tutor",
        company: "Beijing Online Education",
        location: "Remote (China-based)",
        country: "china",
        salary: "$20 - $30/hour",
        salaryRange: "2000-2500",
        type: "part-time",
        badge: "",
        description: "Teach English online to Chinese students from the comfort of your home. Flexible hours, stable internet required.",
        requirements: ["TEFL Certified", "Reliable internet", "Teaching experience"],
        posted: "2 days ago"
    },
    {
        id: 8,
        title: "Middle School English Teacher",
        company: "Kaohsiung International School",
        location: "Kaohsiung, Taiwan",
        country: "taiwan",
        salary: "$2,300 - $2,700/month",
        salaryRange: "2000-2500",
        type: "full-time",
        badge: "New",
        description: "Teach English to grades 6-9 in a modern international school. Collaborative teaching environment with professional development.",
        requirements: ["Bachelor's in Education", "TESOL/TEFL", "2+ years experience"],
        posted: "1 day ago"
    },
    {
        id: 9,
        title: "IELTS Preparation Instructor",
        company: "Seoul Test Prep Center",
        location: "Seoul, South Korea",
        country: "korea",
        salary: "$2,400 - $2,800/month",
        salaryRange: "2000-2500",
        type: "full-time",
        badge: "",
        description: "Specialized IELTS instructor needed. Experience with test preparation and high scores required. Performance bonuses available.",
        requirements: ["IELTS score 8.0+", "Test prep experience", "TEFL Certified"],
        posted: "6 days ago"
    },
    {
        id: 10,
        title: "Adult Conversation Teacher",
        company: "Kyoto Language Institute",
        location: "Kyoto, Japan",
        country: "japan",
        salary: "$2,500 - $2,900/month",
        salaryRange: "2500-3000",
        type: "full-time",
        badge: "",
        description: "Teach conversation classes to adult learners in beautiful Kyoto. Cultural exchange opportunities and language support provided.",
        requirements: ["Native Speaker", "TEFL/TESOL", "Cultural sensitivity"],
        posted: "3 days ago"
    },
    {
        id: 11,
        title: "Corporate English Trainer",
        company: "Guangzhou Business Institute",
        location: "Guangzhou, China",
        country: "china",
        salary: "$3,200 - $3,800/month",
        salaryRange: "3000+",
        type: "full-time",
        badge: "Featured",
        description: "Train business professionals in English communication. Premium salary, modern facilities, and career advancement opportunities.",
        requirements: ["Business English expertise", "5+ years experience", "Professional demeanor"],
        posted: "2 days ago"
    },
    {
        id: 12,
        title: "Summer Camp English Coordinator",
        company: "Taipei Summer Programs",
        location: "Taipei, Taiwan",
        country: "taiwan",
        salary: "$2,000 - $2,400/month",
        salaryRange: "2000-2500",
        type: "contract",
        badge: "Seasonal",
        description: "3-month summer position coordinating English immersion camp. Fun, energetic environment with outdoor activities.",
        requirements: ["Camp experience", "Energetic personality", "TEFL Certified"],
        posted: "1 week ago"
    }
];

let filteredJobs = [...sampleJobs];

// ===================================
// Render Jobs
// ===================================
function renderJobs(jobs) {
    const jobsGrid = document.getElementById('jobsGrid');
    const resultsCount = document.getElementById('resultsCount');

    resultsCount.textContent = `Showing ${jobs.length} job${jobs.length !== 1 ? 's' : ''}`;

    jobsGrid.innerHTML = jobs.map(job => `
        <div class="job-card" onclick="viewJob(${job.id})">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <div class="company-name">${job.company}</div>
                </div>
                ${job.badge ? `<span class="job-badge">${job.badge}</span>` : ''}
            </div>
            
            <div class="job-details">
                <div class="job-detail-item">
                    <span class="job-detail-icon">📍</span>
                    <span>${job.location}</span>
                </div>
                <div class="job-detail-item">
                    <span class="job-detail-icon">💼</span>
                    <span>${job.type.charAt(0).toUpperCase() + job.type.slice(1)}</span>
                </div>
                <div class="job-detail-item">
                    <span class="job-detail-icon">🕒</span>
                    <span>Posted ${job.posted}</span>
                </div>
            </div>
            
            <p class="job-description">${job.description}</p>
            
            <div class="job-footer">
                <div class="job-salary">${job.salary}</div>
                <button class="btn-apply" onclick="applyJob(event, ${job.id})">Apply Now</button>
            </div>
        </div>
    `).join('');
}

// ===================================
// Filter Jobs
// ===================================
function filterJobs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const country = document.getElementById('countryFilter').value;
    const salary = document.getElementById('salaryFilter').value;
    const type = document.getElementById('typeFilter').value;

    filteredJobs = sampleJobs.filter(job => {
        const matchesSearch = !searchTerm ||
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm);

        const matchesCountry = !country || job.country === country;
        const matchesSalary = !salary || job.salaryRange === salary;
        const matchesType = !type || job.type === type;

        return matchesSearch && matchesCountry && matchesSalary && matchesType;
    });

    renderJobs(filteredJobs);
}

// ===================================
// Event Listeners
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // Check for URL parameters (e.g., ?country=korea)
    const urlParams = new URLSearchParams(window.location.search);
    const countryParam = urlParams.get('country');

    // If country parameter exists, set the filter
    if (countryParam) {
        const countryFilter = document.getElementById('countryFilter');
        if (countryFilter) {
            countryFilter.value = countryParam;
        }
    }

    // Set up filter event listeners
    document.getElementById('searchInput').addEventListener('input', filterJobs);
    document.getElementById('countryFilter').addEventListener('change', filterJobs);
    document.getElementById('salaryFilter').addEventListener('change', filterJobs);
    document.getElementById('typeFilter').addEventListener('change', filterJobs);

    // Initial render (will apply country filter if set)
    renderJobs(filteredJobs);

    // Apply filters if country parameter was set
    if (countryParam) {
        filterJobs();
    }
});

// ===================================
// View Job Details
// ===================================
function viewJob(jobId) {
    window.location.href = `job-detail.html?id=${jobId}`;
}

// ===================================
// Apply for Job
// ===================================
function applyJob(event, jobId) {
    event.stopPropagation();

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

    if (!user.loggedIn) {
        alert('Please sign in to apply for jobs');
        window.location.href = 'login.html';
        return;
    }

    console.log('Applying for job:', jobId);
    alert('Application submitted! (This is a demo - in production, this would submit your application)');
}
