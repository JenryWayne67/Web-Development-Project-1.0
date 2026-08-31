// UniAdvisor - Assessment Step 2: Interests (2026)

let selectedFields = ["Programming & Technology", "Engineering"];

function updateCardStyles() {
    document.querySelectorAll('.field-card').forEach(card => {
        const fieldName = card.getAttribute('data-field');
        const isSelected = selectedFields.includes(fieldName);
        const checkIcon = card.querySelector('.card-check');

        if (isSelected) {
            card.className = 'field-card relative p-4 rounded-[16px] bg-white border-2 border-gold shadow-[0_4px_14px_rgba(255,184,0,0.15)] cursor-pointer hover:shadow-md transition-all group';
            if (checkIcon) {
                checkIcon.className = 'card-check absolute top-4 right-4';
                checkIcon.innerHTML = `<span class="material-symbols-outlined text-gold" style="font-variation-settings: 'FILL' 1;">check_circle</span>`;
            }
        } else {
            card.className = 'field-card relative p-4 rounded-[16px] bg-white border border-outline-variant shadow-sm cursor-pointer hover:border-primary hover:shadow-md transition-all group';
            if (checkIcon) {
                checkIcon.className = 'card-check absolute top-4 right-4 opacity-0 group-hover:opacity-30';
                checkIcon.innerHTML = `<span class="material-symbols-outlined text-outline">add_circle</span>`;
            }
        }
    });

    const countDisplay = document.getElementById('selectedCountDisplay');
    if (countDisplay) {
        countDisplay.innerText = `${selectedFields.length} field${selectedFields.length === 1 ? '' : 's'} selected`;
    }
}

function toggleField(fieldName) {
    if (selectedFields.includes(fieldName)) {
        selectedFields = selectedFields.filter(f => f !== fieldName);
    } else {
        selectedFields.push(fieldName);
    }
    updateCardStyles();
    saveFields();
}

function saveFields() {
    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    assessment.fields = selectedFields;
    assessment.passions = selectedFields;
    localStorage.setItem('advisor_assessment', JSON.stringify(assessment));
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.field-card').forEach(card => {
        card.addEventListener('click', () => {
            const field = card.getAttribute('data-field');
            if (field) toggleField(field);
        });
    });

    document.getElementById('selectAllOrUnsureBtn')?.addEventListener('click', () => {
        const allCards = Array.from(document.querySelectorAll('.field-card')).map(c => c.getAttribute('data-field')).filter(Boolean);
        if (selectedFields.length === allCards.length) {
            selectedFields = [];
        } else {
            selectedFields = allCards;
        }
        updateCardStyles();
        saveFields();
    });

    document.getElementById('continueStep3Btn')?.addEventListener('click', () => {
        saveFields();
        window.location.href = 'assessment3.html';
    });

    const saved = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    if (Array.isArray(saved.fields) && saved.fields.length > 0) {
        selectedFields = saved.fields;
    } else if (Array.isArray(saved.passions) && saved.passions.length > 0) {
        selectedFields = saved.passions;
    } else {
        const stream = saved.stream || saved.academic_stream;
        if (stream === 'science_eco' || stream === 'eco') {
            selectedFields = ["Economics"];
        } else if (stream === 'arts') {
            selectedFields = ["Arts & Humanities"];
        } else if (stream === 'science_bio' || stream === 'bio') {
            selectedFields = ["Programming & Technology", "Engineering"];
        }
    }

    updateCardStyles();
});
