// ===================================
// ESL Connect - Theme Toggle Logic
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply theme on load
    if (currentTheme === 'light') {
        bodyElement.classList.add('light-mode');
        updateToggleIcon('light');
    }

    // Toggle theme click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLightMode = bodyElement.classList.toggle('light-mode');
            const newTheme = isLightMode ? 'light' : 'dark';

            localStorage.setItem('theme', newTheme);
            updateToggleIcon(newTheme);
        });
    }

    function updateToggleIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i') || themeToggle;
        if (theme === 'light') {
            icon.textContent = '🌙'; // Icon for switching back to dark
            themeToggle.title = 'Switch to Dark Mode';
        } else {
            icon.textContent = '☀️'; // Icon for switching to light
            themeToggle.title = 'Switch to Light Mode';
        }
    }
});
