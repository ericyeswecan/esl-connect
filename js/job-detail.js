// ===================================
// ESL Connect - Job Detail Page
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
        description: "Seeking enthusiastic elementary English teacher for our international school. Experience with young learners preferred. Housing and flight allowance provided. Join our dynamic team and make a difference in students' lives while experiencing Korean culture.",
        requirements: ["Bachelor's Degree in Education or related field", "TEFL/TESOL Certification", "Native English Speaker", "Experience with young learners (preferred)", "Clean criminal background check"],
        posted: "2 days ago",
        website: "https://example.com"
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
        description: "Join our prestigious high school teaching advanced English to motivated students. Competitive salary with benefits package including housing assistance. Work in the heart of Tokyo with excellent public transportation access.",
        requirements: ["Master's Degree Preferred", "2+ years teaching experience", "TESOL Certified", "Experience with high school students", "Strong classroom management skills"],
        posted: "1 day ago",
        website: "https://example.com"
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
        description: "Experienced business English trainer needed for corporate clients. Flexible schedule, professional development opportunities, and excellent benefits. Train professionals from leading companies in Shanghai's business district.",
        requirements: ["Business Background or MBA", "TEFL Certified", "3+ years experience in corporate training", "Professional presentation skills", "Flexibility with schedule"],
        posted: "3 hours ago",
        website: "https://example.com"
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
        description: "Fun and energetic kindergarten teacher wanted! Work with adorable kids aged 3-6. Small class sizes and supportive environment. Perfect for teachers who love working with young children.",
        requirements: ["Love working with kids", "TEFL/TESOL Certification", "Patient and creative personality", "Experience with early childhood education", "Energetic and enthusiastic"],
        posted: "5 days ago",
        website: "https://example.com"
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
        description: "Flexible part-time position teaching conversation classes to adults. Evening and weekend availability required. Great for teachers looking for supplemental income or flexible work arrangements.",
        requirements: ["Native English Speaker", "Conversational teaching skills", "Flexible schedule (evenings/weekends)", "Engaging personality", "TEFL certification preferred"],
        posted: "1 week ago",
        website: "https://example.com"
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
        description: "1-year contract position teaching English composition and literature to university students. Research opportunities available. Join a prestigious university with modern facilities and supportive faculty.",
        requirements: ["Master's Degree Required", "University teaching experience", "Published work preferred", "Strong academic background", "Research experience"],
        posted: "4 days ago",
        website: "https://example.com"
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
        description: "Teach English online to Chinese students from the comfort of your home. Flexible hours, stable internet required. Perfect for digital nomads or teachers seeking remote work opportunities.",
        requirements: ["TEFL Certified", "Reliable high-speed internet", "Teaching experience", "Quiet workspace", "Flexible schedule"],
        posted: "2 days ago",
        website: "https://example.com"
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
        description: "Teach English to grades 6-9 in a modern international school. Collaborative teaching environment with professional development. Beautiful campus with state-of-the-art facilities.",
        requirements: ["Bachelor's in Education", "TESOL/TEFL Certification", "2+ years experience", "Middle school teaching experience", "Collaborative mindset"],
        posted: "1 day ago",
        website: "https://example.com"
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
        description: "Specialized IELTS instructor needed. Experience with test preparation and high scores required. Performance bonuses available. Help students achieve their dreams of studying abroad.",
        requirements: ["IELTS score 8.0+", "Test prep experience", "TEFL Certified", "Understanding of IELTS format", "Results-oriented approach"],
        posted: "6 days ago",
        website: "https://example.com"
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
        description: "Teach conversation classes to adult learners in beautiful Kyoto. Cultural exchange opportunities and language support provided. Experience traditional Japanese culture while teaching.",
        requirements: ["Native English Speaker", "TEFL/TESOL Certification", "Cultural sensitivity", "Experience with adult learners", "Passion for cultural exchange"],
        posted: "3 days ago",
        website: "https://example.com"
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
        description: "Train business professionals in English communication. Premium salary, modern facilities, and career advancement opportunities. Work with executives from Fortune 500 companies.",
        requirements: ["Business English expertise", "5+ years experience", "Professional demeanor", "Corporate training experience", "Advanced presentation skills"],
        posted: "2 days ago",
        website: "https://example.com"
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
        description: "3-month summer position coordinating English immersion camp. Fun, energetic environment with outdoor activities. Perfect for adventurous teachers who love working with kids in dynamic settings.",
        requirements: ["Camp experience", "Energetic personality", "TEFL Certified", "Outdoor activity skills", "Leadership abilities"],
        posted: "1 week ago",
        website: "https://example.com"
    }
];

let currentJob = null;
let jobId = null;

// ===================================
// Initialize Page
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    initJobDetailPage();
    initScrollToTop();
});

// ===================================
// Initialize Job Detail Page
// ===================================
function initJobDetailPage() {
    // Get job ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    jobId = parseInt(urlParams.get('id')) || 1;

    // Find the job
    currentJob = sampleJobs.find(j => j.id === jobId);

    if (!currentJob) {
        // Enhanced error handling
        console.error('Job not found:', jobId);
        showToast('Job not found. Redirecting to jobs page...');
        setTimeout(() => {
            window.location.href = 'jobs.html';
        }, 2000);
        return;
    }

    // Track job view (analytics placeholder)
    trackJobView(jobId);

    // Populate job details
    populateJobDetails();

    // Check if job is saved
    checkSavedStatus();

    // Load similar jobs with improved algorithm
    loadSimilarJobs();
}

// ===================================
// Populate Job Details
// ===================================
function populateJobDetails() {
    // Basic information
    document.getElementById('jobTitle').textContent = currentJob.title;
    document.getElementById('companyName').textContent = currentJob.company;
    document.getElementById('companyNameInfo').textContent = currentJob.company;
    document.getElementById('jobLocation').textContent = currentJob.location;
    document.getElementById('jobType').textContent = currentJob.type.charAt(0).toUpperCase() + currentJob.type.slice(1);
    document.getElementById('jobPosted').textContent = currentJob.posted;
    document.getElementById('jobSalary').textContent = currentJob.salary;
    document.getElementById('jobDescription').textContent = currentJob.description;
    document.getElementById('breadcrumbTitle').textContent = currentJob.title;

    // Badge
    if (currentJob.badge) {
        document.getElementById('jobBadgeContainer').innerHTML = `<span class="job-badge-large">${currentJob.badge}</span>`;
    }

    // Requirements
    const requirementsList = document.getElementById('jobRequirements');
    requirementsList.innerHTML = currentJob.requirements.map(req => `<li>${req}</li>`).join('');

    // Overview sidebar
    document.getElementById('overviewPosted').textContent = currentJob.posted;
    document.getElementById('overviewType').textContent = currentJob.type.charAt(0).toUpperCase() + currentJob.type.slice(1);
    document.getElementById('overviewSalary').textContent = currentJob.salary;
    document.getElementById('overviewLocation').textContent = currentJob.location;

    // Company website
    if (currentJob.website) {
        const websiteLink = document.getElementById('companyWebsite');
        websiteLink.href = currentJob.website;
        websiteLink.target = '_blank';
        websiteLink.rel = 'noopener noreferrer';
    }

    // Update page title for SEO
    document.title = `${currentJob.title} - ${currentJob.company} | ESL Connect`;
}

// ===================================
// Check Saved Status
// ===================================
function checkSavedStatus() {
    const savedJobs = JSON.parse(localStorage.getItem('eslconnect_saved_jobs') || '[]');
    const isSaved = savedJobs.includes(jobId);

    if (isSaved) {
        document.getElementById('saveBtn').classList.add('saved');
        document.getElementById('saveIcon').textContent = '✓';
        document.getElementById('saveText').textContent = 'Saved';
    }
}

// ===================================
// Toggle Save Job
// ===================================
function toggleSaveJob() {
    const savedJobs = JSON.parse(localStorage.getItem('eslconnect_saved_jobs') || '[]');
    const saveBtn = document.getElementById('saveBtn');
    const saveIcon = document.getElementById('saveIcon');
    const saveText = document.getElementById('saveText');

    if (savedJobs.includes(jobId)) {
        // Remove from saved
        const index = savedJobs.indexOf(jobId);
        savedJobs.splice(index, 1);
        saveBtn.classList.remove('saved');
        saveIcon.textContent = '🔖';
        saveText.textContent = 'Save Job';
        showToast('Job removed from saved');
    } else {
        // Add to saved
        savedJobs.push(jobId);
        saveBtn.classList.add('saved');
        saveIcon.textContent = '✓';
        saveText.textContent = 'Saved';
        showToast('Job saved successfully!');
    }

    localStorage.setItem('eslconnect_saved_jobs', JSON.stringify(savedJobs));
}

// ===================================
// Apply for Job
// ===================================
function applyForJob() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

    if (!user.loggedIn) {
        showToast('Please sign in to apply for jobs');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        }, 1500);
        return;
    }

    // Track application (analytics placeholder)
    trackJobApplication(jobId);

    showToast('Application submitted! (Demo mode)');
    console.log('Applying for job:', jobId);
}

// ===================================
// Share Job
// ===================================
function shareJob() {
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: currentJob.title,
            text: `Check out this job: ${currentJob.title} at ${currentJob.company}`,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            showToast('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            showToast('Failed to copy link');
        });
    }
}

// ===================================
// Load Similar Jobs (Improved Algorithm)
// ===================================
function loadSimilarJobs() {
    // Scoring algorithm for similarity
    const scoredJobs = sampleJobs
        .filter(j => j.id !== jobId)
        .map(j => {
            let score = 0;

            // Same country gets highest priority
            if (j.country === currentJob.country) score += 10;

            // Same job type
            if (j.type === currentJob.type) score += 5;

            // Similar salary range
            if (j.salaryRange === currentJob.salaryRange) score += 3;

            // Featured/urgent jobs get slight boost
            if (j.badge === 'Featured' || j.badge === 'Urgent') score += 1;

            return { job: j, score: score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(item => item.job);

    const similarJobsGrid = document.getElementById('similarJobsGrid');

    if (scoredJobs.length === 0) {
        similarJobsGrid.innerHTML = '<p style="color: rgba(255,255,255,0.6);">No similar jobs found at the moment.</p>';
        return;
    }

    similarJobsGrid.innerHTML = scoredJobs.map(j => `
        <a href="job-detail.html?id=${j.id}" class="similar-job-card">
            <div class="similar-job-title">${j.title}</div>
            <div class="similar-job-company">${j.company}</div>
            <div class="similar-job-location">📍 ${j.location}</div>
            <div class="similar-job-salary">${j.salary}</div>
        </a>
    `).join('');
}

// ===================================
// Scroll to Top Button
// ===================================
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-gradient);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    document.body.appendChild(scrollBtn);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Print Job
// ===================================
function printJob() {
    window.print();
}

// ===================================
// Analytics Tracking (Placeholder)
// ===================================
function trackJobView(jobId) {
    console.log('Analytics: Job viewed', {
        jobId: jobId,
        timestamp: new Date().toISOString()
    });
    // In production: gtag('event', 'view_job', { job_id: jobId });
}

function trackJobApplication(jobId) {
    console.log('Analytics: Job application started', {
        jobId: jobId,
        timestamp: new Date().toISOString()
    });
    // In production: gtag('event', 'apply_job', { job_id: jobId });
}

// ===================================
// Toast Notification
// ===================================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
