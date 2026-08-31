// UniAdvisor - Assessment Step 1: Academic Results (2026)

let userSubjects = [
    { id: 'myanmar', name: 'Myanmar', type: 'Core Language', marks: 75, canDelete: false },
    { id: 'english', name: 'English', type: 'Core Language', marks: 82, canDelete: false },
    { id: 'mathematics', name: 'Mathematics', type: 'STEM Core', marks: 90, canDelete: false },
    { id: 'physics', name: 'Physics', type: 'Science / Engineering', marks: 85, canDelete: true },
    { id: 'chemistry', name: 'Chemistry', type: 'Science / Medicine', marks: 84, canDelete: true },
    { id: 'biology', name: 'Biology', type: 'Medical Sciences', marks: 86, canDelete: true }
];

function getGradeStatus(marks) {
    const num = parseInt(marks) || 0;
    if (num < 40) return { text: '❌ Ineligible (<40)', class: 'text-rose-700 bg-rose-100 border border-rose-300 font-bold' };
    if (num >= 80) return { text: '🌟 Distinction', class: 'text-emerald-800 bg-emerald-100 border border-emerald-300 font-semibold' };
    if (num >= 65) return { text: '✨ Credit', class: 'text-blue-800 bg-blue-100 border border-blue-300 font-semibold' };
    return { text: '✓ Pass', class: 'text-slate-700 bg-slate-100 border border-slate-300 font-medium' };
}

function renderSubjectsTable() {
    const tbody = document.getElementById('subjectsTableBody');
    if (!tbody) return;

    tbody.innerHTML = userSubjects.map((sub, index) => {
        const status = getGradeStatus(sub.marks);
        const isFailing = (parseInt(sub.marks) || 0) < 40;
        const inputClass = isFailing 
            ? 'subject-mark-input w-[110px] rounded-md border-rose-400 bg-rose-50 text-rose-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 px-3 py-1.5 text-sm font-bold shadow-sm'
            : 'subject-mark-input w-[110px] rounded-md border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary px-3 py-1.5 text-on-surface bg-surface-bright text-sm font-bold';

        return `
        <tr class="border-b border-surface-variant/50 ${isFailing ? 'bg-rose-50/40' : ''}">
            <td class="py-3 pl-2 text-on-surface font-medium">
                <span class="flex items-center gap-1.5">
                    ${sub.name}
                    ${isFailing ? '<span class="text-rose-600 font-bold text-xs" title="Score must be at least 40 to be eligible">⚠️ &lt;40</span>' : ''}
                </span>
            </td>
            <td class="py-3 text-xs text-on-surface-variant">${sub.type || 'Academic Subject'}</td>
            <td class="py-3">
                <input data-index="${index}" aria-label="${sub.name} marks" class="${inputClass}" type="number" min="0" max="100" value="${sub.marks}">
            </td>
            <td class="py-3 text-right pr-2 text-xs">
                <span class="inline-block px-2.5 py-0.5 rounded ${status.class}">${status.text}</span>
            </td>
            <td class="py-3 text-center">
                ${sub.canDelete ? `
                    <button type="button" onclick="removeSubject(${index})" title="Remove Subject" class="text-gray-400 hover:text-red-600 p-1 transition-colors">
                        <span class="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                ` : `<span class="text-gray-300 text-xs">—</span>`}
            </td>
        </tr>
        `;
    }).join('');

    // Attach listeners
    document.querySelectorAll('.subject-mark-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = parseInt(e.target.getAttribute('data-index'));
            const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
            userSubjects[idx].marks = val;
            calculateTotals();
            
            const status = getGradeStatus(val);
            const row = e.target.closest('tr');
            if (row) {
                const statusTd = row.children[3];
                if (statusTd) {
                    statusTd.innerHTML = `<span class="inline-block px-2.5 py-0.5 rounded ${status.class}">${status.text}</span>`;
                }
                if (val < 40) {
                    e.target.className = 'subject-mark-input w-[110px] rounded-md border-rose-400 bg-rose-50 text-rose-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 px-3 py-1.5 text-sm font-bold shadow-sm';
                } else {
                    e.target.className = 'subject-mark-input w-[110px] rounded-md border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary px-3 py-1.5 text-on-surface bg-surface-bright text-sm font-bold';
                }
            }
        });
    });

    calculateTotals();
}

function calculateTotals() {
    let total = 0;
    let distinctions = 0;
    const failingSubjects = [];

    userSubjects.forEach(s => {
        const m = parseInt(s.marks) || 0;
        total += m;
        if (m >= 80) distinctions++;
        if (m < 40) failingSubjects.push({ name: s.name, marks: m });
    });

    const totalEl = document.getElementById('displayTotalMarks');
    const maxEl = document.getElementById('displayMaxMarks');
    const distEl = document.getElementById('distinctionCount');
    const countBadge = document.getElementById('subjectCountBadge');
    const banner = document.getElementById('eligibilityBanner');
    const alertBox = document.getElementById('ineligibleAlertBox');
    const alertText = document.getElementById('ineligibleAlertText');

    if (totalEl) totalEl.innerText = total;
    if (maxEl) maxEl.innerText = `/ ${userSubjects.length * 100}`;
    if (distEl) distEl.innerText = `${distinctions} Distinction${distinctions === 1 ? '' : 's'}`;
    if (countBadge) countBadge.innerText = `${userSubjects.length} of ${userSubjects.length} subjects`;

    const isEligible = failingSubjects.length === 0;

    if (banner) {
        if (!isEligible) {
            banner.className = 'p-3 rounded-lg border flex items-center justify-between bg-rose-50 border-rose-300 text-rose-800';
            banner.innerHTML = `
                <div class="flex items-center gap-2">
                    <span class="text-rose-600 font-bold">⚠️</span>
                    <span class="text-xs font-semibold">Admission Ineligible: Score < 40 in ${failingSubjects.map(f => f.name).join(', ')}</span>
                </div>
                <span class="text-xs px-2 py-0.5 bg-rose-200 text-rose-900 rounded font-bold">Action Needed</span>
            `;
        } else {
            banner.className = 'p-3 rounded-lg border flex items-center justify-between bg-emerald-50 border-emerald-200 text-emerald-800';
            banner.innerHTML = `
                <div class="flex items-center gap-2">
                    <span class="text-emerald-600 font-bold">✓</span>
                    <span class="text-xs font-semibold">Academic Eligibility: All subject criteria fulfilled for 2026 Intake</span>
                </div>
                <span class="text-xs px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded font-bold">Passing</span>
            `;
        }
    }

    if (alertBox) {
        if (!isEligible) {
            alertBox.classList.remove('hidden');
            if (alertText) {
                const failNames = failingSubjects.map(f => `<strong>${f.name}</strong> (${f.marks} marks)`).join(', ');
                alertText.innerHTML = `
                    Under Myanmar Matriculation Examination regulations, students must achieve a minimum of <strong>40 marks</strong> in each subject to qualify for university applications.
                    <br><br>
                    Current failing subjects below 40: ${failNames}.
                    <br><br>
                    <strong>Please update your marks to 40 or above for every subject to continue the university assessment.</strong>
                `;
            }
        } else {
            alertBox.classList.add('hidden');
        }
    }

    return { total, distinctions, isEligible, failingSubjects };
}

function removeSubject(idx) {
    if (userSubjects[idx] && userSubjects[idx].canDelete) {
        userSubjects.splice(idx, 1);
        renderSubjectsTable();
        saveState();
    }
}

window.removeSubject = removeSubject;

let currentStream = 'science_bio';

function loadCombination(streamType) {
    currentStream = streamType;
    if (streamType === 'bio' || streamType === 'science_bio') {
        currentStream = 'science_bio';
        userSubjects = [
            { id: 'myanmar', name: 'Myanmar', type: 'Core Language', marks: 75, canDelete: false },
            { id: 'english', name: 'English', type: 'Core Language', marks: 82, canDelete: false },
            { id: 'mathematics', name: 'Mathematics', type: 'STEM Core', marks: 90, canDelete: false },
            { id: 'physics', name: 'Physics', type: 'Science / Engineering', marks: 85, canDelete: true },
            { id: 'chemistry', name: 'Chemistry', type: 'Science / Medicine', marks: 84, canDelete: true },
            { id: 'biology', name: 'Biology', type: 'Medical Sciences', marks: 86, canDelete: true }
        ];
    } else if (streamType === 'eco' || streamType === 'science_eco') {
        currentStream = 'science_eco';
        userSubjects = [
            { id: 'myanmar', name: 'Myanmar', type: 'Core Language', marks: 75, canDelete: false },
            { id: 'english', name: 'English', type: 'Core Language', marks: 82, canDelete: false },
            { id: 'mathematics', name: 'Mathematics', type: 'STEM Core', marks: 90, canDelete: false },
            { id: 'physics', name: 'Physics', type: 'Science / Engineering', marks: 85, canDelete: true },
            { id: 'chemistry', name: 'Chemistry', type: 'Science', marks: 84, canDelete: true },
            { id: 'economics', name: 'Economics', type: 'Commerce / Social Science', marks: 86, canDelete: true }
        ];
    } else if (streamType === 'arts' || streamType === 'arts_humanities') {
        currentStream = 'arts';
        userSubjects = [
            { id: 'myanmar', name: 'Myanmar', type: 'Core Language', marks: 80, canDelete: false },
            { id: 'english', name: 'English', type: 'Core Language', marks: 78, canDelete: false },
            { id: 'mathematics', name: 'Mathematics', type: 'Core Requirement', marks: 65, canDelete: false },
            { id: 'geography', name: 'Geography', type: 'Humanities', marks: 85, canDelete: true },
            { id: 'history', name: 'History', type: 'Humanities', marks: 84, canDelete: true },
            { id: 'economics', name: 'Economics', type: 'Social Sciences', marks: 80, canDelete: true }
        ];
    }

    // Update Quick Track button active styles
    document.querySelectorAll('.preset-btn').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick') || '';
        const isMatch = (streamType === 'bio' && onclickAttr.includes('bio')) ||
                        (streamType === 'eco' && onclickAttr.includes('eco')) ||
                        (streamType === 'arts' && onclickAttr.includes('arts'));
        if (isMatch) {
            btn.className = 'preset-btn px-2.5 py-1 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 shadow-sm transition-all';
        } else {
            btn.className = 'preset-btn px-2.5 py-1 rounded-lg bg-surface-container text-primary text-xs font-bold hover:bg-surface-variant transition-all';
        }
    });

    renderSubjectsTable();
    saveState();
}

window.loadCombination = loadCombination;

function saveState() {
    const { total, distinctions, isEligible, failingSubjects } = calculateTotals();
    const gender = document.querySelector('input[name="studentGender"]:checked')?.value || 'male';
    const stream = currentStream || 'science_bio';

    const marksMap = {};
    userSubjects.forEach(s => {
        const key = s.name.toLowerCase().replace(/[^a-z]/g, '');
        marksMap[key] = parseInt(s.marks) || 0;
    });

    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    assessment.subjects = userSubjects;
    assessment.total_marks = total;
    assessment.distinctions = distinctions;
    assessment.gender = gender;
    assessment.academic_stream = stream;
    assessment.stream = stream;
    assessment.marks = marksMap;
    assessment.is_eligible = isEligible;
    assessment.failing_subjects = failingSubjects;

    localStorage.setItem('advisor_assessment', JSON.stringify(assessment));
    return { isEligible, failingSubjects };
}

document.addEventListener('DOMContentLoaded', () => {
    // Add subject tray setup
    const openAddSubjectBtn = document.getElementById('openAddSubjectBtn');
    const cancelAddSubjectBtn = document.getElementById('cancelAddSubjectBtn');
    const confirmAddSubjectBtn = document.getElementById('confirmAddSubjectBtn');
    const addSubjectTray = document.getElementById('addSubjectTray');
    const presetSelect = document.getElementById('presetSubjectSelect');
    const customContainer = document.getElementById('customSubjectNameContainer');
    const customInput = document.getElementById('customSubjectName');
    const marksInput = document.getElementById('newSubjectMarks');

    if (openAddSubjectBtn && addSubjectTray) {
        openAddSubjectBtn.addEventListener('click', () => {
            addSubjectTray.classList.toggle('hidden');
        });
    }

    if (cancelAddSubjectBtn && addSubjectTray) {
        cancelAddSubjectBtn.addEventListener('click', () => {
            addSubjectTray.classList.add('hidden');
        });
    }

    if (presetSelect && customContainer) {
        presetSelect.addEventListener('change', () => {
            if (presetSelect.value === 'custom') {
                customContainer.classList.remove('hidden');
                if (customInput) customInput.focus();
            } else {
                customContainer.classList.add('hidden');
            }
        });
    }

    if (confirmAddSubjectBtn) {
        confirmAddSubjectBtn.addEventListener('click', () => {
            let subName = '';
            let subType = 'Academic Subject';
            if (presetSelect && presetSelect.value === 'custom') {
                subName = customInput?.value?.trim() || 'Additional Subject';
                subType = 'Elective';
            } else if (presetSelect) {
                const parts = presetSelect.value.split('|');
                subName = parts[0] || 'Subject';
                subType = parts[1] || 'Academic Subject';
            }
            const marksVal = Math.min(100, Math.max(0, parseInt(marksInput?.value) || 75));
            const subId = subName.toLowerCase().replace(/[^a-z0-9]/g, '');

            userSubjects.push({
                id: subId,
                name: subName,
                type: subType,
                marks: marksVal,
                canDelete: true
            });

            if (addSubjectTray) addSubjectTray.classList.add('hidden');
            if (customInput) customInput.value = '';
            renderSubjectsTable();
            saveState();
        });
    }

    document.querySelectorAll('input[name="studentGender"]').forEach(radio => {
        radio.addEventListener('change', saveState);
    });

    document.getElementById('continueStep2Btn')?.addEventListener('click', () => {
        const { isEligible, failingSubjects } = saveState();
        
        if (!isEligible) {
            const alertBox = document.getElementById('ineligibleAlertBox');
            const alertText = document.getElementById('ineligibleAlertText');
            if (alertBox && alertText) {
                alertBox.classList.remove('hidden');
                const failNames = failingSubjects.map(f => `<strong>${f.name}</strong> (${f.marks} marks)`).join(', ');
                alertText.innerHTML = `
                    Under Myanmar Matriculation Examination regulations, students must score at least <strong>40 marks</strong> in each subject to pass and qualify for university applications.
                    <br><br>
                    Current failing subjects below 40: ${failNames}.
                    <br><br>
                    <strong>Please update your marks to 40 or above for every subject to continue the university assessment.</strong>
                `;
            }
            document.querySelectorAll('.subject-mark-input').forEach(input => {
                const idx = parseInt(input.getAttribute('data-index'));
                if (userSubjects[idx] && userSubjects[idx].marks < 40) {
                    input.classList.add('ring-4', 'ring-rose-400', 'border-rose-600');
                    input.focus();
                }
            });
            return;
        }

        window.location.href = 'assessment2.html';
    });

    document.getElementById('saveDraftBtn')?.addEventListener('click', () => {
        saveState();
        const banner = document.getElementById('eligibilityBanner');
        if (banner) {
            const orig = banner.innerHTML;
            banner.innerHTML = `<span class="text-xs font-bold text-green-800">✓ Academic marks saved successfully!</span>`;
            setTimeout(() => { banner.innerHTML = orig; }, 2000);
        }
    });

    const saved = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    if (Array.isArray(saved.subjects) && saved.subjects.length > 0) {
        userSubjects = saved.subjects;
    }
    if (saved.stream || saved.academic_stream) {
        currentStream = saved.stream || saved.academic_stream;
    }
    if (saved.gender) {
        const radio = document.querySelector(`input[name="studentGender"][value="${saved.gender}"]`);
        if (radio) radio.checked = true;
    }

    // Highlight initial active preset button
    document.querySelectorAll('.preset-btn').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick') || '';
        const isMatch = (currentStream === 'science_bio' && onclickAttr.includes('bio')) ||
                        (currentStream === 'science_eco' && onclickAttr.includes('eco')) ||
                        (currentStream === 'arts' && onclickAttr.includes('arts'));
        if (isMatch) {
            btn.className = 'preset-btn px-2.5 py-1 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 shadow-sm transition-all';
        } else {
            btn.className = 'preset-btn px-2.5 py-1 rounded-lg bg-surface-container text-primary text-xs font-bold hover:bg-surface-variant transition-all';
        }
    });

    renderSubjectsTable();
});
