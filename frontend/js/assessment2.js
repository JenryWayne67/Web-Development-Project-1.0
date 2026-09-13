// UniAdvisor - Assessment Step 2: Ranked Interests (2026)

// Fields a student can rank. `value` must match a field_name in backend/db_data.js
// exactly: recommendations only include programs in the chosen fields.
const INTEREST_OPTIONS = [
    { value: 'Programming & Technology', label: '💻 Programming & Technology', description: 'Computer Science, Software Engineering, AI, Data Science (UIT, UCSY)' },
    { value: 'Engineering', label: '🔧 Engineering', description: 'Mechanical, Electrical, Civil, Mechatronics, Chemical, Architecture (YTU, WYTU, TTU)' },
    { value: 'Medicine and health', label: '🏥 Medicine & Health', description: 'Medicine (MBBS), Dental, Pharmacy, Nursing, Medical Technology, Public Health (UM1, UM2)' },
    { value: 'Economics', label: '📊 Business & Economics', description: 'Commerce, Business Administration, Accounting, Economics, Statistics, Finance (YUECO, NMDC, Co-op)' },
    { value: 'Science', label: '🔬 Pure & Applied Science', description: 'Biology, Chemistry, Physics, Biochemistry, Industrial Chemistry (UY, East, West)' },
    { value: 'Mathematics', label: '📐 Mathematics', description: 'Pure Mathematics, Applied Mathematics, Computational Statistics' },
    { value: 'Languages', label: '🗣️ Foreign Languages', description: 'English, Japanese, Chinese, Korean, French, German, Russian (YUFL)' },
    { value: 'Arts & Humanities', label: '🏛️ Arts & Humanities', description: 'Law (LLB), International Relations, Political Science, History, Philosophy, Psychology (UY, Dagon, NUAC)' },
    { value: 'Education', label: '🎓 Education', description: 'Educational Science (BSc), Educational Arts (BA), Library Studies' },
    { value: 'Environment & Geography', label: '🌿 Environment & Geography', description: 'Environmental Studies, Geography, Fisheries, Water Resource Studies' },
    { value: 'Marine', label: '⚓ Marine & Maritime', description: 'Nautical Science, Marine Engineering, Port & Harbour (MMU Thanlyin)' }
];

// Academic-stream eligibility rules: a Myanmar matriculation stream restricts which
// fields a student is even allowed to select, regardless of personal interest.
const STREAM_FIELD_RESTRICTIONS = {
    eco: ["Medicine and health"],
    science_eco: ["Medicine and health"],
    arts: ["Science", "Engineering", "Medicine and health", "Marine", "Programming & Technology"],
    arts_humanities: ["Science", "Engineering", "Medicine and health", "Marine", "Programming & Technology"]
};

// interests[0] is the first (highest-ranked) interest; '' means not chosen.
let interests = ['', '', ''];
let restrictedFields = [];

function getRestrictedFields() {
    const saved = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    const stream = saved.stream || saved.academic_stream || '';
    return STREAM_FIELD_RESTRICTIONS[stream] || [];
}

function renderInterestSelects() {
    interests.forEach((current, i) => {
        const select = document.getElementById(`interest${i + 1}`);
        if (!select) return;

        const chosenElsewhere = interests.filter((v, j) => j !== i && v);
        const options = INTEREST_OPTIONS.map(opt => {
            const restricted = restrictedFields.includes(opt.value);
            const taken = chosenElsewhere.includes(opt.value);
            const note = restricted ? ' (not available for your stream)' : taken ? ' (already chosen)' : '';
            return `<option value="${opt.value}"${restricted || taken ? ' disabled' : ''}${opt.value === current ? ' selected' : ''}>${opt.label}${note}</option>`;
        });
        select.innerHTML = `<option value="">${i === 0 ? 'Choose your top interest…' : 'None'}</option>` + options.join('');
        // The 2nd and 3rd choices unlock once the one above them is chosen
        select.disabled = i > 0 && !interests[i - 1];

        const desc = document.getElementById(`interest${i + 1}Desc`);
        if (desc) desc.textContent = INTEREST_OPTIONS.find(o => o.value === current)?.description || '';
    });

    const continueBtn = document.getElementById('continueStep3Btn');
    if (continueBtn) continueBtn.disabled = !interests[0];
}

function setInterest(index, value) {
    interests[index] = value;
    // Keep choices contiguous: clearing the 2nd moves the 3rd up
    interests = [...interests.filter(Boolean), '', '', ''].slice(0, 3);
    renderInterestSelects();
    saveInterests();
}

function saveInterests() {
    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    assessment.fields = interests.filter(Boolean);
    delete assessment.passions;
    localStorage.setItem('advisor_assessment', JSON.stringify(assessment));
}

document.addEventListener('DOMContentLoaded', () => {
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

    // Restore saved choices, dropping anything unknown, duplicated, or restricted
    const saved = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    const allowed = INTEREST_OPTIONS.map(o => o.value).filter(v => !restrictedFields.includes(v));
    const savedFields = (Array.isArray(saved.fields) ? saved.fields : [])
        .filter((f, i, arr) => allowed.includes(f) && arr.indexOf(f) === i);
    interests = [...savedFields, '', '', ''].slice(0, 3);
    saveInterests();

    interests.forEach((_, i) => {
        document.getElementById(`interest${i + 1}`)?.addEventListener('change', e => setInterest(i, e.target.value));
    });

    document.getElementById('continueStep3Btn')?.addEventListener('click', () => {
        if (!interests[0]) return;
        saveInterests();
        window.location.href = 'assessment3.html';
    });

    renderInterestSelects();
});
