// ===================================
// ESL Connect - Multi-step Resume Form
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    if (!resumeForm) return;

    let currentStep = 1;
    const totalSteps = 4;

    const progressSteps = document.querySelectorAll('.progress-step');
    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progressBar');

    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');

    // Navigation Logic
    const updateStepper = () => {
        // Update Progress Bar
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;

        // Update Step Indicators
        progressSteps.forEach((step, idx) => {
            if (idx + 1 <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update Form Steps visibility
        formSteps.forEach((step, idx) => {
            if (idx + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Scroll to top of form
        resumeForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateStepper();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateStepper();
        });
    });

    // Validation Logic
    const validateStep = (step) => {
        const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                // Special handling for checkbox groups if needed
                const name = input.name;
                const group = currentStepEl.querySelectorAll(`input[name="${name}"]`);
                const checked = Array.from(group).some(cb => cb.checked);
                if (!checked) {
                    isValid = false;
                    // Highlight the group or show error
                }
            } else if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                // Could use a more robust error display here
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields to continue.');
        }

        return isValid;
    };

    // File Upload Preview & Handling
    const resumeFileInput = document.getElementById('resumeFile');
    const videoIntroInput = document.getElementById('videoIntro');
    const fileNameDisplay = document.getElementById('fileName');
    const videoFileNameDisplay = document.getElementById('videoFileName');
    const videoPreview = document.getElementById('videoPreview');
    const videoPlayer = document.getElementById('videoPlayer');

    if (resumeFileInput) {
        resumeFileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name;
            fileNameDisplay.textContent = fileName ? `Selected: ${fileName}` : '';
        });
    }

    if (videoIntroInput) {
        videoIntroInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 50 * 1024 * 1024) {
                    alert('Video is too large (max 50MB)');
                    e.target.value = '';
                    return;
                }
                videoFileNameDisplay.textContent = `Selected: ${file.name}`;
                videoPlayer.src = URL.createObjectURL(file);
                videoPreview.classList.add('active');
            }
        });
    }

    // Submit Logic (Supabase Integration)
    resumeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = resumeForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            const formData = new FormData(resumeForm);
            const user = JSON.parse(localStorage.getItem('eslconnect_user') || '{}');

            if (!user.id) {
                alert('You must be logged in to submit a resume.');
                window.location.href = 'login.html';
                return;
            }

            // 1. Upload Files
            let resumeUrl = null;
            let videoUrl = null;

            const resumeFile = formData.get('resumeFile');
            const videoFile = formData.get('videoIntro');

            if (resumeFile && resumeFile.size > 0) {
                const path = `${user.id}/resume_${Date.now()}_${resumeFile.name}`;
                const { data, error } = await eslSupabase.storage
                    .from('resume-attachments')
                    .upload(path, resumeFile);
                if (error) throw error;
                resumeUrl = data.path;
            }

            if (videoFile && videoFile.size > 0) {
                const path = `${user.id}/video_${Date.now()}_${videoFile.name}`;
                const { data, error } = await eslSupabase.storage
                    .from('resume-attachments')
                    .upload(path, videoFile);
                if (error) throw error;
                videoUrl = data.path;
            }

            // 2. Save Data to Database
            const certifications = Array.from(document.querySelectorAll('input[name="certifications"]:checked')).map(cb => cb.value);
            const countries = Array.from(document.querySelectorAll('input[name="countries"]:checked')).map(cb => cb.value);

            const { error: dbError } = await eslSupabase
                .from('resumes')
                .insert([{
                    user_id: user.id,
                    first_name: formData.get('firstName'),
                    last_name: formData.get('lastName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    nationality: formData.get('nationality'),
                    current_location: formData.get('currentLocation'),
                    degree: formData.get('degree'),
                    major: formData.get('major'),
                    certifications,
                    experience_years: formData.get('experience'),
                    summary: formData.get('teachingExperience'),
                    preferred_countries: countries,
                    salary_expectation: formData.get('salaryExpectation'),
                    resume_url: resumeUrl,
                    video_url: videoUrl,
                    additional_info: formData.get('additionalInfo'),
                    status: 'active'
                }]);

            if (dbError) throw dbError;

            alert('Congratulations! Your resume has been successfully posted.');
            window.location.href = 'dashboard.html';

        } catch (err) {
            console.error('Submission error:', err);
            alert(`Error: ${err.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Resume';
        }
    });
});
