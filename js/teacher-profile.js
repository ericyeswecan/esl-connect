// ===================================
// ESL Connect - Teacher Profile Page
// ===================================

// Sample teacher data (matches resumes.js)
const sampleTeachers = [
    {
        id: 1,
        name: "Sarah Johnson",
        photo: "👩‍🏫",
        headline: "Experienced Elementary ESL Teacher",
        location: "Currently in Seoul, South Korea",
        countryPreference: ["South Korea", "Japan"],
        experience: "5+",
        experienceYears: 6,
        certifications: ["TEFL Certification", "TESOL Certification", "BA in Education"],
        skills: ["Young Learners", "Phonics", "Classroom Management", "Curriculum Development", "Parent Communication"],
        bio: "Passionate educator with 6 years of experience teaching elementary students in East Asia. I specialize in creating engaging, interactive lessons that make learning English fun and effective for young learners. My approach focuses on building confidence through positive reinforcement and age-appropriate activities.",
        availability: "Available",
        hasVideo: true
    },
    {
        id: 2,
        name: "Michael Chen",
        photo: "👨‍🏫",
        headline: "Business English Specialist",
        location: "Based in Tokyo, Japan",
        countryPreference: ["Japan", "South Korea"],
        experience: "5+",
        experienceYears: 8,
        certifications: ["TESOL Certification", "CELTA", "MBA"],
        skills: ["Business English", "Corporate Training", "TOEIC Prep", "Presentation Skills", "Professional Communication"],
        bio: "MBA holder with extensive experience training business professionals in English communication. I help corporate clients improve their English for international business, presentations, and negotiations.",
        availability: "Available",
        hasVideo: true
    }
];

let currentTeacher = null;
let teacherId = null;

// ===================================
// Initialize Page
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    initTeacherProfile();
});

// ===================================
// Initialize Teacher Profile
// ===================================
function initTeacherProfile() {
    // Get teacher ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    teacherId = parseInt(urlParams.get('id')) || 1;

    // Find the teacher
    currentTeacher = sampleTeachers.find(t => t.id === teacherId);

    if (!currentTeacher) {
        console.error('Teacher not found:', teacherId);
        window.location.href = 'resumes.html';
        return;
    }

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');
    if (!user.loggedIn) {
        alert('Please sign in to view teacher profiles');
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        return;
    }

    // Populate profile
    populateProfile();
}

// ===================================
// Populate Profile
// ===================================
function populateProfile() {
    // Basic info
    document.getElementById('profilePhoto').textContent = currentTeacher.photo;
    document.getElementById('profileName').textContent = currentTeacher.name;
    document.getElementById('profileHeadline').textContent = currentTeacher.headline;
    document.getElementById('profileLocation').textContent = currentTeacher.location;
    document.getElementById('profileExperience').textContent = `${currentTeacher.experienceYears} years experience`;
    document.getElementById('profileAvailability').textContent = currentTeacher.availability;
    document.getElementById('profileBio').textContent = currentTeacher.bio;
    document.getElementById('breadcrumbName').textContent = currentTeacher.name;

    // Update page title
    document.title = `${currentTeacher.name} - Teacher Profile | ESL Connect`;

    // Skills
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = currentTeacher.skills.map(skill => `
        <span class="skill-badge">${skill}</span>
    `).join('');

    // Experience
    document.getElementById('experienceYears').textContent = currentTeacher.experienceYears;

    // Sidebar
    document.getElementById('sidebarExperience').textContent = `${currentTeacher.experienceYears} years`;
    document.getElementById('sidebarAvailability').textContent = currentTeacher.availability;
    document.getElementById('sidebarLocations').textContent = currentTeacher.countryPreference.join(', ');

    // Certifications
    const certList = document.getElementById('certList');
    certList.innerHTML = currentTeacher.certifications.map(cert => `
        <div class="cert-item">${cert}</div>
    `).join('');

    // Video section
    if (currentTeacher.hasVideo) {
        document.getElementById('videoSection').style.display = 'block';
    }
}

// ===================================
// Contact Teacher
// ===================================
function contactTeacher() {
    const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

    if (!user.loggedIn) {
        alert('Please sign in to contact teachers');
        window.location.href = 'login.html';
        return;
    }

    // In production, this would open a contact form or messaging system
    alert(`Contact form coming soon! (Demo mode)\n\nIn production, this would open a contact form or messaging system to connect you with ${currentTeacher.name}.`);

    // Track contact attempt (analytics placeholder)
    console.log('Analytics: Teacher contact initiated', {
        teacherId: teacherId,
        teacherName: currentTeacher.name,
        timestamp: new Date().toISOString()
    });
}

// ===================================
// Export for Testing (if needed)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sampleTeachers,
        contactTeacher
    };
}
