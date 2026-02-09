// ===================================
// ESL Connect - User Dashboard
// ===================================

// Sample jobs data (matches jobs.html)
const sampleJobs = [
    {
        id: 1,
        title: "Elementary English Teacher",
        company: "Seoul International Academy",
        location: "Seoul, South Korea",
        salary: "$2,200 - $2,500/month",
        type: "full-time",
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "High School ESL Instructor",
        company: "Tokyo English Academy",
        location: "Tokyo, Japan",
        salary: "$2,800 - $3,200/month",
        type: "full-time",
        posted: "1 week ago"
    },
    {
        id: 3,
        title: "Business English Trainer",
        company: "Shanghai Corporate Language Center",
        location: "Shanghai, China",
        salary: "$2,500 - $3,000/month",
        type: "full-time",
        posted: "3 days ago"
    }
];

let currentUser = null;
let currentSection = null;

// ===================================
// Initialize Dashboard
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    initDashboard();
});

// ===================================
// Initialize Dashboard
// ===================================
function initDashboard() {
    // Check authentication
    currentUser = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

    if (!currentUser.loggedIn) {
        alert('Please sign in to access your dashboard');
        window.location.href = 'login.html';
        return;
    }

    // Setup user profile
    const userRole = currentUser.role || 'teacher';
    document.getElementById('userName').textContent = currentUser.name || 'User';
    document.getElementById('userRole').textContent = userRole.charAt(0).toUpperCase() + userRole.slice(1);
    document.getElementById('dashboardTitle').textContent = `Welcome back, ${currentUser.name || 'User'}!`;

    // Update page title
    document.title = `${currentUser.name}'s Dashboard - ESL Connect`;

    // Setup navigation
    setupNavigation(userRole);

    // Show initial section
    const initialSection = userRole === 'employer' ? 'jobPosts' : 'savedJobs';
    showSection(initialSection);
}

// ===================================
// Setup Navigation
// ===================================
function setupNavigation(userRole) {
    const teacherNav = [
        { id: 'savedJobs', icon: '💾', label: 'Saved Jobs' },
        { id: 'applications', icon: '📝', label: 'My Applications' },
        { id: 'profile', icon: '👤', label: 'Profile' }
    ];

    const employerNav = [
        { id: 'jobPosts', icon: '💼', label: 'My Job Posts' },
        { id: 'applicants', icon: '👥', label: 'Applicants' },
        { id: 'profile', icon: '🏢', label: 'Company Profile' }
    ];

    const adminNav = [
        { id: 'adminLink', icon: '🛡️', label: 'Admin Panel', url: 'admin.html' },
        { id: 'profile', icon: '👤', label: 'Profile' }
    ];

    let navItems = userRole === 'employer' ? employerNav : teacherNav;
    if (userRole === 'admin') navItems = adminNav;
    const dashboardNav = document.getElementById('dashboardNav');

    dashboardNav.innerHTML = navItems.map(item => `
        <li class="nav-item">
            <a href="${item.url || '#'}" class="nav-link" 
               data-section="${item.id}"
               onclick="${item.url ? '' : `showSection('${item.id}'); return false;`}"
               aria-label="Navigate to ${item.label}">
                <span>${item.icon}</span>
                <span>${item.label}</span>
            </a>
        </li>
    `).join('');
}

// ===================================
// Show Section
// ===================================
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Add active to clicked nav link
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Store current section
    currentSection = sectionId;

    // Load section data
    switch (sectionId) {
        case 'savedJobs':
            loadSavedJobs();
            break;
        case 'applications':
            loadApplications();
            break;
        case 'jobPosts':
            loadJobPosts();
            break;
        case 'applicants':
            loadApplicants();
            break;
    }

    // Track analytics
    console.log('Analytics: Section viewed', {
        section: sectionId,
        timestamp: new Date().toISOString()
    });
}

// ===================================
// Load Saved Jobs
// ===================================
function loadSavedJobs() {
    const savedJobIds = JSON.parse(localStorage.getItem('eslconnect_saved_jobs') || '[]');
    const savedJobsGrid = document.getElementById('savedJobsGrid');

    if (savedJobIds.length === 0) {
        savedJobsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💾</div>
                <div class="empty-state-text">No saved jobs yet</div>
                <a href="jobs.html" class="btn-action btn-primary-action">Browse Jobs</a>
            </div>
        `;
        return;
    }

    const savedJobsData = sampleJobs.filter(job => savedJobIds.includes(job.id));

    savedJobsGrid.innerHTML = savedJobsData.map(job => `
        <div class="job-card">
            <div class="job-card-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-company">${job.company}</div>
                </div>
            </div>
            <div class="job-meta">
                <div class="meta-item">
                    <span>📍</span>
                    <span>${job.location}</span>
                </div>
                <div class="meta-item">
                    <span>💰</span>
                    <span>${job.salary}</span>
                </div>
                <div class="meta-item">
                    <span>💼</span>
                    <span>${job.type}</span>
                </div>
            </div>
            <div class="job-actions">
                <button class="btn-action btn-primary-action" onclick="window.location.href='job-detail.html?id=${job.id}'">View Details</button>
                <button class="btn-action btn-secondary-action" onclick="applyJob(${job.id})">Apply Now</button>
                <button class="btn-action btn-danger-action" onclick="removeSavedJob(${job.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

// ===================================
// Load Applications
// ===================================
function loadApplications() {
    const applications = JSON.parse(localStorage.getItem('eslconnect_applications') || '[]');
    const applicationsGrid = document.getElementById('applicationsGrid');

    if (applications.length === 0) {
        applicationsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <div class="empty-state-text">No applications yet</div>
                <a href="jobs.html" class="btn-action btn-primary-action">Find Jobs</a>
            </div>
        `;
        return;
    }

    applicationsGrid.innerHTML = applications.map(app => `
        <div class="job-card">
            <div class="job-card-header">
                <div>
                    <h3 class="job-title">${app.jobTitle}</h3>
                    <div class="job-company">${app.company}</div>
                </div>
                <span class="status-badge status-${app.status}">${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
            </div>
            <div class="job-meta">
                <div class="meta-item">
                    <span>📅</span>
                    <span>Applied: ${app.appliedDate}</span>
                </div>
            </div>
            <div class="job-actions">
                <button class="btn-action btn-secondary-action" onclick="window.location.href='job-detail.html?id=${app.jobId}'">View Job</button>
                <button class="btn-action btn-danger-action" onclick="withdrawApplication(${app.id})">Withdraw</button>
            </div>
        </div>
    `).join('');
}

// ===================================
// Load Job Posts (Employer)
// ===================================
function loadJobPosts() {
    const jobPosts = JSON.parse(localStorage.getItem('eslconnect_job_posts') || '[]');
    const jobPostsGrid = document.getElementById('jobPostsGrid');

    if (jobPosts.length === 0) {
        jobPostsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💼</div>
                <div class="empty-state-text">No job posts yet</div>
                <a href="post-job.html" class="btn-action btn-primary-action">Post a Job</a>
            </div>
        `;
        return;
    }

    jobPostsGrid.innerHTML = jobPosts.map(job => `
        <div class="job-card">
            <div class="job-card-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <div class="job-company">${job.location}</div>
                </div>
                <span class="status-badge status-${job.status === 'active' ? 'accepted' : 'pending'}">${job.status}</span>
            </div>
            <div class="job-meta">
                <div class="meta-item">
                    <span>📅</span>
                    <span>Posted: ${job.postedDate}</span>
                </div>
                <div class="meta-item">
                    <span>👥</span>
                    <span>${job.applicantsCount || 0} applicants</span>
                </div>
            </div>
            <div class="job-actions">
                <button class="btn-action btn-primary-action" onclick="alert('Edit functionality coming soon!')">Edit</button>
                <button class="btn-action btn-secondary-action" onclick="showSection('applicants')">View Applicants</button>
                <button class="btn-action btn-danger-action" onclick="deleteJobPost(${job.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// ===================================
// Load Applicants (Employer)
// ===================================
function loadApplicants() {
    const applicantsGrid = document.getElementById('applicantsGrid');
    applicantsGrid.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">👥</div>
            <div class="empty-state-text">No applicants yet</div>
            <p style="color: rgba(255,255,255,0.6); margin-top: var(--spacing-md);">Applicants will appear here when teachers apply to your jobs</p>
        </div>
    `;
}

// ===================================
// Helper Functions
// ===================================
function removeSavedJob(jobId) {
    let savedJobs = JSON.parse(localStorage.getItem('eslconnect_saved_jobs') || '[]');
    savedJobs = savedJobs.filter(id => id !== jobId);
    localStorage.setItem('eslconnect_saved_jobs', JSON.stringify(savedJobs));
    loadSavedJobs();
    showToast('Job removed from saved');
}

function applyJob(jobId) {
    const job = sampleJobs.find(j => j.id === jobId);
    if (!job) return;

    const applications = JSON.parse(localStorage.getItem('eslconnect_applications') || '[]');
    const alreadyApplied = applications.some(app => app.jobId === jobId);

    if (alreadyApplied) {
        alert('You have already applied to this job');
        return;
    }

    const newApplication = {
        id: Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
    };

    applications.push(newApplication);
    localStorage.setItem('eslconnect_applications', JSON.stringify(applications));
    showToast('Application submitted successfully!');
    showSection('applications');
}

function withdrawApplication(appId) {
    if (!confirm('Are you sure you want to withdraw this application?')) return;

    let applications = JSON.parse(localStorage.getItem('eslconnect_applications') || '[]');
    applications = applications.filter(app => app.id !== appId);
    localStorage.setItem('eslconnect_applications', JSON.stringify(applications));
    loadApplications();
    showToast('Application withdrawn');
}

function deleteJobPost(jobId) {
    if (!confirm('Are you sure you want to delete this job post?')) return;

    let jobPosts = JSON.parse(localStorage.getItem('eslconnect_job_posts') || '[]');
    jobPosts = jobPosts.filter(job => job.id !== jobId);
    localStorage.setItem('eslconnect_job_posts', JSON.stringify(jobPosts));
    loadJobPosts();
    showToast('Job post deleted');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('eslconnect_user');
        window.location.href = 'index.html';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(102, 126, 234, 0.95);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===================================
// Export for Testing (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSection,
        loadSavedJobs,
        loadApplications,
        loadJobPosts,
        loadApplicants
    };
}
