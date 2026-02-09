// ===================================
// ESL Connect - Resume Database Page
// ===================================

// Sample teacher data
const sampleTeachers = [
    {
        id: 1,
        name: "Sarah Johnson",
        photo: "👩‍🏫",
        headline: "Experienced Elementary ESL Teacher",
        location: "Currently in Seoul, South Korea",
        countryPreference: ["korea", "japan"],
        experience: "5+",
        experienceYears: 6,
        certifications: ["TEFL", "TESOL", "BA Education"],
        skills: ["Young Learners", "Phonics", "Classroom Management"],
        bio: "Passionate educator with 6 years of experience teaching elementary students in East Asia.",
        availability: "Available",
        hasVideo: true
    },
    {
        id: 2,
        name: "Michael Chen",
        photo: "👨‍🏫",
        headline: "Business English Specialist",
        location: "Based in Tokyo, Japan",
        countryPreference: ["japan", "korea"],
        experience: "5+",
        experienceYears: 8,
        certifications: ["TESOL", "CELTA", "MBA"],
        skills: ["Business English", "Corporate Training", "TOEIC Prep"],
        bio: "MBA holder with extensive experience training business professionals.",
        availability: "Available",
        hasVideo: true
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        photo: "👩‍🏫",
        headline: "IELTS & TOEFL Preparation Expert",
        location: "Shanghai, China",
        countryPreference: ["china", "taiwan"],
        experience: "3-5",
        experienceYears: 4,
        certifications: ["TEFL", "TESOL"],
        skills: ["IELTS", "TOEFL", "Test Preparation"],
        bio: "Specialized in helping students achieve high scores on standardized tests.",
        availability: "Available",
        hasVideo: false
    },
    {
        id: 4,
        name: "David Kim",
        photo: "👨‍🏫",
        headline: "University English Lecturer",
        location: "Busan, South Korea",
        countryPreference: ["korea"],
        experience: "5+",
        experienceYears: 10,
        certifications: ["MA TESOL", "BA Education", "CELTA"],
        skills: ["Academic English", "Research", "Literature"],
        bio: "PhD candidate with 10 years of university teaching experience.",
        availability: "Available from March",
        hasVideo: true
    },
    {
        id: 5,
        name: "Jennifer Lee",
        photo: "👩‍🏫",
        headline: "Kindergarten & Early Childhood Specialist",
        location: "Taipei, Taiwan",
        countryPreference: ["taiwan", "korea"],
        experience: "3-5",
        experienceYears: 5,
        certifications: ["TEFL", "Early Childhood Education"],
        skills: ["Young Learners", "TPR", "Songs & Games"],
        bio: "Energetic teacher who loves working with young children aged 3-6.",
        availability: "Available",
        hasVideo: true
    },
    {
        id: 6,
        name: "Robert Taylor",
        photo: "👨‍🏫",
        headline: "High School ESL Teacher",
        location: "Osaka, Japan",
        countryPreference: ["japan", "korea"],
        experience: "1-3",
        experienceYears: 2,
        certifications: ["TEFL", "BA English Literature"],
        skills: ["High School", "Literature", "Writing"],
        bio: "Recent graduate passionate about teaching literature and writing.",
        availability: "Available",
        hasVideo: false
    },
    {
        id: 7,
        name: "Amanda White",
        photo: "👩‍🏫",
        headline: "Conversation & Pronunciation Coach",
        location: "Beijing, China",
        countryPreference: ["china"],
        experience: "5+",
        experienceYears: 7,
        certifications: ["TESOL", "Pronunciation Specialist"],
        skills: ["Conversation", "Pronunciation", "Adult Learners"],
        bio: "Specialized in helping students improve fluency and pronunciation.",
        availability: "Available",
        hasVideo: true
    },
    {
        id: 8,
        name: "James Wilson",
        photo: "👨‍🏫",
        headline: "Online English Tutor",
        location: "Remote (Korea-based)",
        countryPreference: ["korea", "japan", "china", "taiwan"],
        experience: "3-5",
        experienceYears: 4,
        certifications: ["TEFL", "TESOL"],
        skills: ["Online Teaching", "One-on-One", "Flexible Schedule"],
        bio: "Experienced online tutor available for remote teaching positions.",
        availability: "Available",
        hasVideo: true
    },
    {
        id: 9,
        name: "Lisa Anderson",
        photo: "👩‍🏫",
        headline: "Middle School English Teacher",
        location: "Kaohsiung, Taiwan",
        countryPreference: ["taiwan"],
        experience: "1-3",
        experienceYears: 3,
        certifications: ["TEFL", "BA Education"],
        skills: ["Middle School", "Grammar", "Reading Comprehension"],
        bio: "Dedicated teacher with a focus on building strong foundational skills.",
        availability: "Available from June",
        hasVideo: false
    },
    {
        id: 10,
        name: "Thomas Brown",
        photo: "👨‍🏫",
        headline: "Academic Writing Instructor",
        location: "Seoul, South Korea",
        countryPreference: ["korea", "japan"],
        experience: "5+",
        experienceYears: 9,
        certifications: ["MA English", "TESOL", "CELTA"],
        skills: ["Academic Writing", "Essay Writing", "Research Papers"],
        bio: "Master's degree holder specializing in academic writing instruction.",
        availability: "Available",
        hasVideo: true
    },
    {
        id: 11,
        name: "Rachel Martinez",
        photo: "👩‍🏫",
        headline: "ESL Curriculum Developer",
        location: "Guangzhou, China",
        countryPreference: ["china", "taiwan"],
        experience: "5+",
        experienceYears: 11,
        certifications: ["MA TESOL", "Curriculum Design"],
        skills: ["Curriculum Development", "Teacher Training", "Materials Design"],
        bio: "Experienced in developing ESL curricula and training teachers.",
        availability: "Available",
        hasVideo: true
    },
    {
        id: 12,
        name: "Kevin Park",
        photo: "👨‍🏫",
        headline: "Summer Camp Coordinator",
        location: "Jeju, South Korea",
        countryPreference: ["korea"],
        experience: "1-3",
        experienceYears: 2,
        certifications: ["TEFL", "Camp Leadership"],
        skills: ["Summer Camps", "Outdoor Activities", "Group Management"],
        bio: "Energetic coordinator with experience running English immersion camps.",
        availability: "Seasonal (Summer)",
        hasVideo: false
    }
];

let filteredTeachers = [...sampleTeachers];

// ===================================
// Initialize Page
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    initResumePage();
    setupEventListeners();
});

// ===================================
// Initialize Resume Page
// ===================================
function initResumePage() {
    renderTeachers(filteredTeachers);
}

// ===================================
// Check if User is Logged In
// ===================================
function isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');
    return user.loggedIn === true;
}

// ===================================
// Render Teachers
// ===================================
function renderTeachers(teachers) {
    const teachersGrid = document.getElementById('teachersGrid');
    const resultsCount = document.getElementById('resultsCount');
    const loggedIn = isLoggedIn();

    resultsCount.textContent = `Showing ${teachers.length} teacher${teachers.length !== 1 ? 's' : ''}`;

    if (teachers.length === 0) {
        teachersGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: rgba(255,255,255,0.6);">
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">No teachers found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    teachersGrid.innerHTML = teachers.map(teacher => `
        <div class="teacher-card ${!loggedIn ? 'blurred' : ''}" onclick="viewTeacher(${teacher.id})">
            ${!loggedIn ? `
                <div class="login-prompt">
                    <div class="login-prompt-text">Sign in to view full profiles</div>
                    <button class="btn-login-prompt" onclick="event.stopPropagation(); window.location.href='login.html'">Sign In</button>
                </div>
            ` : ''}
            <div class="card-content">
                <div class="teacher-photo">${teacher.photo}</div>
                <h3 class="teacher-name">${teacher.name}</h3>
                <div class="teacher-headline">${teacher.headline}</div>
                <div class="teacher-location">
                    <span>📍</span>
                    <span>${teacher.location}</span>
                </div>
                
                <div class="teacher-details">
                    <div class="detail-item">
                        <span class="detail-icon">💼</span>
                        <span>${teacher.experienceYears} years experience</span>
                    </div>
                    ${teacher.hasVideo ? `
                        <div class="detail-item video-indicator">
                            <span>🎥</span>
                            <span>Video introduction available</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="certifications">
                    ${teacher.certifications.slice(0, 3).map(cert => `
                        <span class="cert-badge">${cert}</span>
                    `).join('')}
                </div>
                
                <center>
                    <span class="availability-badge">${teacher.availability}</span>
                </center>
                
                <button class="btn-view-profile">View Full Profile</button>
            </div>
        </div>
    `).join('');
}

// ===================================
// Filter Teachers (with Debounce)
// ===================================
let filterTimeout;

function filterTeachers() {
    clearTimeout(filterTimeout);

    filterTimeout = setTimeout(() => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const country = document.getElementById('countryFilter').value;
        const experience = document.getElementById('experienceFilter').value;
        const cert = document.getElementById('certFilter').value;

        filteredTeachers = sampleTeachers.filter(teacher => {
            const matchesSearch = !searchTerm ||
                teacher.name.toLowerCase().includes(searchTerm) ||
                teacher.headline.toLowerCase().includes(searchTerm) ||
                teacher.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
                teacher.bio.toLowerCase().includes(searchTerm);

            const matchesCountry = !country || teacher.countryPreference.includes(country);
            const matchesExperience = !experience || teacher.experience === experience;
            const matchesCert = !cert || teacher.certifications.includes(cert);

            return matchesSearch && matchesCountry && matchesExperience && matchesCert;
        });

        renderTeachers(filteredTeachers);
    }, 300); // Debounce 300ms for better performance
}

// ===================================
// Setup Event Listeners
// ===================================
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterTeachers);
    document.getElementById('countryFilter').addEventListener('change', filterTeachers);
    document.getElementById('experienceFilter').addEventListener('change', filterTeachers);
    document.getElementById('certFilter').addEventListener('change', filterTeachers);
}

// ===================================
// View Teacher Profile
// ===================================
function viewTeacher(teacherId) {
    if (!isLoggedIn()) {
        return; // Login prompt will handle this
    }
    window.location.href = `teacher-profile.html?id=${teacherId}`;
}

// ===================================
// Export for Testing (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sampleTeachers,
        filterTeachers,
        renderTeachers,
        isLoggedIn
    };
}
