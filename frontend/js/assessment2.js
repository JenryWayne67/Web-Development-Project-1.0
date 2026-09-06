// UniAdvisor - Assessment Step 2: Interests (2026)

let selectedFields = ["Programming & Technology", "Engineering"];

// Academic-stream eligibility rules: a Myanmar matriculation stream restricts which
// fields a student is even allowed to select, regardless of personal interest.
const STREAM_FIELD_RESTRICTIONS = {
    eco: ["Medicine and health"],
    science_eco: ["Medicine and health"],
    arts: ["Science", "Engineering", "Medicine and health", "Marine", "Programming & Technology"],
    arts_humanities: ["Science", "Engineering", "Medicine and health", "Marine", "Programming & Technology"]
};

let restrictedFields = [];

function getRestrictedFields() {
    const saved = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    const stream = saved.stream || saved.academic_stream || '';
    return STREAM_FIELD_RESTRICTIONS[stream] || [];
}

function updateCardStyles() {
    document.querySelectorAll('.field-card').forEach(card => {
        const fieldName = card.getAttribute('data-field');
        const isRestricted = restrictedFields.includes(fieldName);
        const isSelected = !isRestricted && selectedFields.includes(fieldName);
        const checkIcon = card.querySelector('.card-check');

        if (isRestricted) {
            card.className = 'field-card relative p-4 rounded-[16px] bg-surface-container border border-outline-variant/50 shadow-none cursor-not-allowed opacity-50 group';
            if (checkIcon) {
                checkIcon.className = 'card-check absolute top-4 right-4';
                checkIcon.innerHTML = `<span class="material-symbols-outlined text-outline" title="Not available for your academic stream">block</span>`;
            }
        } else if (isSelected) {
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
    if (restrictedFields.includes(fieldName)) {
        return; // Not eligible for this field under the student's academic stream
    }
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
        const allCards = Array.from(document.querySelectorAll('.field-card'))
            .map(c => c.getAttribute('data-field'))
            .filter(f => f && !restrictedFields.includes(f));
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

    restrictedFields = getRestrictedFields();

    const restrictionNotice = document.getElementById('streamRestrictionNotice');
    if (restrictionNotice) {
        if (restrictedFields.length > 0) {
            restrictionNotice.textContent = `⚠️ Based on your academic stream, ${restrictedFields.join(', ')} ${restrictedFields.length === 1 ? 'is' : 'are'} not available.`;
            restrictionNotice.classList.remove('hidden');
        } else {
            restrictionNotice.classList.add('hidden');
        }
    }

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

    // Strip out any restricted field that slipped in from a saved/default selection
    if (restrictedFields.length > 0) {
        selectedFields = selectedFields.filter(f => !restrictedFields.includes(f));
        saveFields();
    }

    updateCardStyles();
});
