// Resource Data
const resources = [
    {
        id: 1,
        title: "South Korea E-2 Visa Guide",
        category: "visa",
        description: "A complete step-by-step walkthrough of the E-2 teaching visa process for South Korea, including required documents.",
        link: "#"
    },
    {
        id: 2,
        title: "Classroom Management in Japan",
        category: "teaching",
        description: "Tips and cultural insights for maintaining a productive and respectful classroom environment in Japanese schools.",
        link: "#"
    },
    {
        id: 3,
        title: "Living and Teaching in Taiwan",
        category: "country",
        description: "Explore the lifestyle, cost of living, and job market for ESL teachers in the beautiful island of Taiwan.",
        link: "#"
    },
    {
        id: 4,
        title: "TEFL vs CELTA: Which is right?",
        category: "tefl",
        description: "Breaking down the differences between various teaching certifications to help you choose the best one for your career.",
        link: "#"
    },
    {
        id: 5,
        title: "Top 5 Lesson Hooks for Kids",
        category: "teaching",
        description: "Capture your students' attention from the first second with these high-energy lesson openers used by experts.",
        link: "#"
    },
    {
        id: 6,
        title: "China Z-Visa Document Checklist",
        category: "visa",
        description: "Don't miss a single paper! Here is the latest checklist for the Chinese working visa applications in 2026.",
        link: "#"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayResources('all');
    setupFilters();
});

function displayResources(filter) {
    const grid = document.getElementById('resourcesGrid');
    const filteredResources = filter === 'all'
        ? resources
        : resources.filter(r => r.category === filter);

    grid.innerHTML = filteredResources.map(resource => `
        <div class="resource-card" data-category="${resource.category}">
            <span class="resource-category">${resource.category}</span>
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.link}" class="btn-read">Read Guide <span>→</span></a>
        </div>
    `).join('');
}

function setupFilters() {
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter
            displayResources(btn.dataset.filter);
        });
    });
}
