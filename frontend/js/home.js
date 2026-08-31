// UniAdvisor - Home Page Script (2026)

document.addEventListener('DOMContentLoaded', () => {
    // Quick search form handling on home page
    const searchForm = document.getElementById('homeSearchForm');
    const searchInput = document.getElementById('homeSearchInput');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `uniexp.html?search=${encodeURIComponent(query)}`;
            } else {
                window.location.href = 'uniexp.html';
            }
        });
    }

    // Interactive category quick links
    document.querySelectorAll('.home-cat-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            if (cat) {
                window.location.href = `uniexp.html?category=${encodeURIComponent(cat)}`;
            }
        });
    });

    console.log('UniAdvisor 2026 Home Page initialized.');
});
