// UniAdvisor - Assessment Step 3: Preferences (2026)

let selectedLocation = 'Yangon';
let selectedStyle = 'Practical / Hands-on';

function updateSelections() {
    document.querySelectorAll('.style-card').forEach(c => {
        const st = c.getAttribute('data-style');
        const check = c.querySelector('.style-check');
        if (st === selectedStyle) {
            c.className = 'style-card flex items-start p-4 rounded-xl border-2 border-gold bg-white cursor-pointer hover:shadow-md transition-all relative';
            if (check) {
                check.className = 'style-check absolute top-4 right-4';
                check.innerHTML = `<span class="material-symbols-outlined text-gold">check_circle</span>`;
            }
        } else {
            c.className = 'style-card flex items-start p-4 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#002147] transition-all relative';
            if (check) {
                check.className = 'style-check absolute top-4 right-4 opacity-0';
                check.innerHTML = `<span class="material-symbols-outlined text-gray-400">add_circle</span>`;
            }
        }
    });
}

function savePrefs() {
    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    assessment.preferred_location = 'Yangon';
    assessment.learning_style = selectedStyle;
    localStorage.setItem('advisor_assessment', JSON.stringify(assessment));
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.style-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedStyle = card.getAttribute('data-style') || 'Practical / Hands-on';
            updateSelections();
            savePrefs();
        });
    });

    document.getElementById('findMatchesBtn')?.addEventListener('click', () => {
        savePrefs();
        window.location.href = 'yourmatches.html';
    });

    const saved = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    selectedLocation = 'Yangon';
    if (saved.learning_style) selectedStyle = saved.learning_style;

    updateSelections();
});
