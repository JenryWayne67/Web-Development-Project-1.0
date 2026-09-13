// UniAdvisor - University Details JS (2026)

const fallbackImageMap = {
    'UIT': 'uit.jpg',
    'YTU': 'ytu.jpg',
    'WYTU': 'westuni.jpg',
    'TTU': 'eastuni.jpg',
    'TTI': 'tti.jpg',
    'HBTU': 'hbtu.jpg',
    'UCSY': 'ucsy.jpg',
    'UM1': 'um1.jpg',
    'UM2': 'um2.jpg',
    'UOPY': 'uopy.jpg',
    'UMT': 'umt.jpg',
    'UDM': 'udm.jpg',
    'UNursing': 'unursing.jpg',
    'UPH': 'uph.jpg',
    'YUFL': 'yufl.jpg',
    'YUE-Hlaing': 'yueco.jpg',
    'YUE-YTG': 'yueco_ytg.jpg',
    'Co-op': 'coop.jpg',
    'YUOE': 'yuoe.jpg',
    'MMU': 'mmu.jpg',
    'MMMC': 'mmmc.jpg',
    'NMDC': 'nmdc.jpg',
    'NUAC': 'nuac_orch.jpg',
    'YU': 'yangonuniversity.jpg',
    'WYU': 'westuni.jpg',
    'EYU': 'eastuni.jpg',
    'Dagon': 'dagonuni.jpg',
    'UVS': 'veterinary.jpg',
    'UTM': 'utm.jpg'
};

let currentUni = null;

// Get University ID from Query String
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function loadUniversityDetails() {
    const idParam = getQueryParam('id') || '1';
    const codeParam = getQueryParam('code');

    try {
        // First fetch target university
        let result = await window.apiFetch(`/api/universities/${idParam}`);

        if (!result.success || !result.data) {
            // If not found by ID, try fetching all to match by code
            const allData = await window.apiFetch('/api/universities');
            if (allData.success && allData.data.length > 0) {
                if (codeParam) {
                    currentUni = allData.data.find(u => (u.code || '').toLowerCase() === codeParam.toLowerCase()) || allData.data[0];
                } else {
                    currentUni = allData.data[0];
                }
            }
        } else {
            currentUni = result.data;
        }

        if (currentUni) {
            renderUniversity(currentUni);
            loadRelatedUniversities(currentUni);
        }
    } catch (err) {
        console.error('Error loading university details:', err);
        const heading = document.getElementById('uni-name-heading');
        if (heading) heading.textContent = 'Could Not Load University';
        const overview = document.getElementById('uni-overview-text');
        if (overview) {
            overview.innerHTML = `⚠️ ${err.message} <button onclick="loadUniversityDetails()" style="text-decoration:underline;cursor:pointer;background:none;border:none;color:inherit;font:inherit;">Try Again</button>`;
        }
    }
}

function renderUniversity(uni) {
    // Document Title
    document.title = `${uni.university_name} - UniAdvisor`;
    const breadcrumb = document.getElementById('breadcrumb-current');
    if (breadcrumb) breadcrumb.textContent = uni.code || uni.university_name;

    // Image Handling - Resolving exact authentic image for each university
    const photoUrl = uni.image_url || fallbackImageMap[uni.code] || fallbackImageMap[uni.short_name] || 'uit.jpg';
    const mainImg = document.getElementById('uni-main-image');
    const imgLoading = document.getElementById('uni-image-loading');
    const heroBg = document.getElementById('hero-bg-image');
    const heroBgContainer = document.getElementById('hero-bg-container');

    if (mainImg) {
        mainImg.onerror = function() {
            this.onerror = null;
            this.src = 'uit.jpg';
            if (imgLoading) imgLoading.classList.add('hidden');
            this.classList.remove('hidden');
        };
        mainImg.onload = function() {
            if (imgLoading) imgLoading.classList.add('hidden');
            this.classList.remove('hidden');
        };
        mainImg.src = photoUrl;
        // Make visible immediately and hide placeholder loader
        if (imgLoading) imgLoading.classList.add('hidden');
        mainImg.classList.remove('hidden');
    }

    if (heroBg) {
        heroBg.onerror = function() {
            this.onerror = null;
            this.src = 'uit.jpg';
        };
        heroBg.src = photoUrl;
        heroBg.classList.remove('hidden');
        if (heroBgContainer) {
            heroBgContainer.classList.remove('opacity-20');
            heroBgContainer.classList.add('opacity-35');
        }
    }

    // Badges & Names
    const codeBadge = document.getElementById('uni-code-badge');
    if (codeBadge) codeBadge.textContent = uni.code || 'UNI';
    const typeBadge = document.getElementById('uni-type-badge');
    if (typeBadge) typeBadge.textContent = uni.type || 'State Public University';
    const nameHead = document.getElementById('uni-name-heading');
    if (nameHead) nameHead.textContent = uni.university_name;
    const locText = document.getElementById('uni-location-text');
    if (locText) locText.textContent = `${uni.location || 'Yangon'}, Myanmar`;
    const estText = document.getElementById('uni-established-text');
    if (estText) estText.textContent = `Est. ${uni.established || '1990'}`;

    // Quick Stats
    const progCount = uni.programs ? uni.programs.length : (uni.program_count || 0);
    const progCountEl = document.getElementById('stat-programs-count');
    if (progCountEl) progCountEl.textContent = `${progCount} Programs`;
    
    let minScore = uni.min_cutoff || uni.historical_cutoff || 300;
    const minCutoffEl = document.getElementById('stat-min-cutoff');
    if (minCutoffEl) minCutoffEl.textContent = `${minScore}+ Marks`;

    // Overview
    const overviewEl = document.getElementById('uni-overview-text');
    if (overviewEl) overviewEl.textContent = uni.overview || uni.description || 'Comprehensive undergraduate and graduate educational programs.';

    // Highlights Chips
    const highlightsContainer = document.getElementById('uni-highlights-container');
    if (highlightsContainer) {
        highlightsContainer.innerHTML = '';
        const highlights = uni.highlights || ["Accredited Programs", "Experienced Faculty", "Central Yangon Location"];
        highlights.forEach(h => {
            const chip = document.createElement('span');
            chip.className = 'inline-flex items-center gap-1 bg-blue-50 text-primary-container text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-100';
            chip.innerHTML = `<span class="text-prompt-gold">✦</span> ${h}`;
            highlightsContainer.appendChild(chip);
        });
    }

    // Admission Process & Career Outcomes
    const admEl = document.getElementById('uni-admission-process-text');
    if (admEl && uni.admission_process) {
        admEl.textContent = uni.admission_process;
    }
    const careerEl = document.getElementById('uni-careers-text');
    if (careerEl && uni.career_prospects) {
        careerEl.textContent = uni.career_prospects;
    }

    // Contact Information
    const addrEl = document.getElementById('contact-address-text');
    if (addrEl) addrEl.textContent = uni.address || `${uni.location}, Yangon`;
    const phoneEl = document.getElementById('contact-phone-text');
    if (phoneEl) phoneEl.textContent = uni.contact_phone || '+95 1 534000';
    const emailEl = document.getElementById('contact-email-text');
    if (emailEl) emailEl.textContent = uni.contact_email || 'info@uni.edu.mm';
    
    const webLink = document.getElementById('contact-website-link');
    if (webLink) {
        webLink.href = uni.website || '#';
        webLink.textContent = uni.website ? uni.website.replace('https://', '') : 'www.moe.edu.mm';
    }

    // Campus Facilities
    const facilitiesContainer = document.getElementById('uni-facilities-container');
    if (facilitiesContainer) {
        facilitiesContainer.innerHTML = '';
        const facilities = uni.campus_facilities || [
            "Advanced Computer & Science Labs",
            "Central Academic Library",
            "Student Cafeteria & Recreation Center",
            "Sports Fields & Gym Facilities",
            "High-Speed Campus Network",
            "On-Campus Housing & Dormitories"
        ];
        facilities.forEach(fac => {
            const facDiv = document.createElement('div');
            facDiv.className = 'flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs font-medium text-primary-container';
            facDiv.innerHTML = `
                <span class="w-6 h-6 rounded-full bg-blue-100 text-primary-container flex items-center justify-center text-xs">✓</span>
                <span>${fac}</span>
            `;
            facilitiesContainer.appendChild(facDiv);
        });
    }

    // Programs List
    renderProgramsList(uni.programs || []);
}

function renderProgramsList(programs) {
    const container = document.getElementById('programs-list-container');
    const countBadge = document.getElementById('program-count-badge');
    if (countBadge) countBadge.textContent = `${programs.length} ${programs.length === 1 ? 'Program' : 'Programs'} Listed`;

    if (!container) return;

    if (!programs || programs.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-on-surface-variant text-sm bg-gray-50 rounded-xl">
                No programs currently cataloged for this faculty.
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    programs.forEach(prog => {
        const card = document.createElement('div');
        card.className = 'p-4 sm:p-5 rounded-xl border border-outline-variant/20 hover:border-prompt-gold/50 bg-gray-50/50 hover:bg-white transition-all shadow-2xs space-y-3';
        
        // Format cutoff details
        let cutoffDetails = '';
        if (prog.min_score > 0) {
            cutoffDetails += `<span class="bg-amber-100 text-amber-900 font-bold text-xs px-2.5 py-1 rounded-md">Cutoff: ${prog.min_score} Marks</span>`;
        }
        if (prog.min_score_male > 0 || prog.min_score_female > 0) {
            cutoffDetails += `<span class="bg-blue-100 text-blue-900 font-semibold text-xs px-2.5 py-1 rounded-md">Male: ${prog.min_score_male} | Female: ${prog.min_score_female}</span>`;
        }
        if (prog.min_4sub_male > 0) {
            cutoffDetails += `<span class="bg-purple-100 text-purple-900 font-semibold text-xs px-2.5 py-1 rounded-md">4-Sub Cutoff: ${prog.min_4sub_male}</span>`;
        }
        if (prog.min_eng_chem_bio_male > 0) {
            cutoffDetails += `<span class="bg-emerald-100 text-emerald-900 font-semibold text-xs px-2.5 py-1 rounded-md">Eng+Chem+Bio: ${prog.min_eng_chem_bio_male}+</span>`;
        }

        card.innerHTML = `
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-sm">${prog.field_icon || '🎓'}</span>
                        <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">${prog.field_name || 'Academic Degree'}</span>
                    </div>
                    <h4 class="font-bold text-base text-primary-container">${prog.program_name}</h4>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    ${cutoffDetails}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

async function loadRelatedUniversities(currentUniObj) {
    try {
        const currentId = currentUniObj ? currentUniObj.university_id : null;
        const currentCode = currentUniObj ? (currentUniObj.code || '').toLowerCase() : '';
        const savedMatches = JSON.parse(localStorage.getItem('advisor_results') || '[]');
        const container = document.getElementById('related-unis-container');
        const relatedSection = document.getElementById('related-matches-section');
        if (!container) return;

        // "Potential Matches" only makes sense when the student actually arrived here
        // from their assessment results (yourmatches.html links with ?from=matches).
        // Browsing straight from the University Explorer must never show match-related
        // UI, even if an old assessment left matches sitting in localStorage.
        const arrivedFromMatches = getQueryParam('from') === 'matches';
        if (!arrivedFromMatches || !savedMatches || savedMatches.length === 0) {
            if (relatedSection) relatedSection.classList.add('hidden');
            return;
        }

        if (relatedSection) relatedSection.classList.remove('hidden');

        // Configure the breadcrumb to point to your potential matches
        const breadcrumbParent = document.getElementById('breadcrumb-parent-link');
        const sectionTitle = document.getElementById('related-section-title');
        const sectionSubtitle = document.getElementById('related-section-subtitle');
        const viewAllBtn = document.getElementById('related-section-viewall');

        if (savedMatches && savedMatches.length > 0) {
            if (breadcrumbParent) {
                breadcrumbParent.href = 'yourmatches.html';
                breadcrumbParent.textContent = 'Potential Matches';
            }
            if (sectionTitle) sectionTitle.innerHTML = '<span>🎯</span> Other Potential University Matches';
            if (sectionSubtitle) sectionSubtitle.textContent = 'Explore other top-recommended universities matching your academic profile';
            if (viewAllBtn) {
                viewAllBtn.href = 'yourmatches.html';
                viewAllBtn.innerHTML = `View All Matches (${savedMatches.length}) <span class="material-symbols-outlined text-sm">arrow_forward</span>`;
            }

            // Filter out current university to show OTHER potential matches
            const otherMatches = savedMatches.filter(m => {
                const mId = m.university_id;
                const mCode = (m.university_code || '').toLowerCase();
                return mId !== currentId && mCode !== currentCode;
            }).slice(0, 4);

            if (otherMatches.length > 0) {
                container.innerHTML = '';
                otherMatches.forEach(m => {
                    const img = m.image_url || fallbackImageMap[m.university_code] || (m.university_code === 'YU' ? 'yangonuniversity.jpg' : 'uit.jpg');
                    const suggestionNo = m.suggestion_no || (savedMatches.indexOf(m) + 1);
                    const statusLabel = m.status_label || 'Suggested';
                    const card = document.createElement('div');
                    card.className = 'bg-white rounded-2xl overflow-hidden border border-outline-variant/20 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between';
                    
                    card.innerHTML = `
                        <div>
                            <div class="h-32 w-full overflow-hidden bg-gray-100 relative">
                                <img src="${img}" alt="${m.university_name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null; this.src='uit.jpg';">
                                <div class="absolute top-2 left-2 bg-[#002147] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                                    No. ${suggestionNo}
                                </div>
                                <div class="absolute top-2 right-2 bg-prompt-gold text-primary-container text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                                    ${statusLabel}
                                </div>
                            </div>
                            <div class="p-4 space-y-1.5">
                                <div class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">${m.university_code}</div>
                                <h4 class="font-bold text-sm text-primary-container line-clamp-1">${m.university_name}</h4>
                                <p class="text-xs text-primary font-medium line-clamp-1">${m.program_name || 'Undergraduate Degree'}</p>
                                <div class="flex items-center gap-2 pt-1 text-[11px] text-on-surface-variant">
                                    <span>📍 ${m.university_location || 'Yangon'}</span>
                                    <span>•</span>
                                    <span class="font-semibold text-primary">${m.cutoff_label || 'See details'}</span>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 pt-0">
                            <a href="university-detail.html?id=${m.university_id || 1}&from=matches" class="w-full bg-surface-container-low hover:bg-gold hover:text-primary text-primary font-bold text-xs py-2 px-3 rounded-xl border border-outline-variant/30 transition-all flex items-center justify-center gap-1">
                                Check Potential <span class="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>
                    `;
                    container.appendChild(card);
                });
                return;
            }
        }

        // Fallback: assessment matches exist but none remain after excluding this university
        const result = await window.apiFetch('/api/universities');
        if (result.success && result.data) {
            const otherUnis = result.data.filter(u => u.university_id !== currentId).slice(0, 4);
            container.innerHTML = '';

            otherUnis.forEach(u => {
                const img = u.image_url || fallbackImageMap[u.code] || 'yangonuniversity.jpg';
                const card = document.createElement('div');
                card.className = 'bg-white rounded-2xl overflow-hidden border border-outline-variant/15 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between';
                card.innerHTML = `
                    <div>
                        <div class="h-32 w-full overflow-hidden bg-gray-100 relative">
                            <img src="${img}" alt="${u.university_name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                            <span class="absolute top-2 right-2 bg-primary-container/85 text-prompt-gold text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                                ${u.code}
                            </span>
                        </div>
                        <div class="p-4">
                            <h4 class="font-bold text-sm text-primary-container line-clamp-1 mb-1">${u.university_name}</h4>
                            <p class="text-xs text-on-surface-variant mb-2">📍 ${u.location}</p>
                            <p class="text-xs text-gray-500 line-clamp-2">${u.description}</p>
                        </div>
                    </div>
                    <div class="p-4 pt-0">
                        <a href="university-detail.html?id=${u.university_id}&from=matches" class="w-full bg-gray-50 hover:bg-prompt-gold hover:text-primary-container text-primary-container font-bold text-xs py-2 px-3 rounded-lg border border-gray-200 transition-colors flex items-center justify-center gap-1">
                            View Details <span class="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    } catch (err) {
        console.error('Error fetching related unis:', err);
    }
}

// ---- Admission chance checker ----
// Cutoffs in our data are predictions (official 2026 cutoffs aren't released
// yet), so the backend returns an *estimated* chance for each program.

// Matriculation subjects for each stream (same sets as assessment step 1)
const STREAM_SUBJECTS = {
    science_bio: [['myanmar', 'Myanmar'], ['english', 'English'], ['mathematics', 'Mathematics'], ['physics', 'Physics'], ['chemistry', 'Chemistry'], ['biology', 'Biology']],
    science_eco: [['myanmar', 'Myanmar'], ['english', 'English'], ['mathematics', 'Mathematics'], ['physics', 'Physics'], ['chemistry', 'Chemistry'], ['economics', 'Economics']],
    arts: [['myanmar', 'Myanmar'], ['english', 'English'], ['mathematics', 'Mathematics'], ['geography', 'Geography'], ['history', 'History'], ['economics', 'Economics']]
};

const CHANCE_STATUS_BADGES = {
    safe: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    meets: 'bg-green-100 text-green-800 border border-green-300',
    borderline: 'bg-amber-100 text-amber-800 border border-amber-300',
    below: 'bg-rose-100 text-rose-800 border border-rose-300'
};

// Marks typed so far, keyed by subject id (kept when switching streams)
let chanceMarks = {};

// Hide results once the inputs change, so they never show outdated marks
function clearChanceResults() {
    document.getElementById('chance-results').classList.add('hidden');
}

function updateChanceTotal() {
    const stream = document.getElementById('chance-stream').value;
    const total = STREAM_SUBJECTS[stream].reduce((sum, [id]) => sum + (Number(chanceMarks[id]) || 0), 0);
    document.getElementById('chance-total').textContent = total;
}

function renderChanceSubjectInputs() {
    const stream = document.getElementById('chance-stream').value;
    const container = document.getElementById('chance-subject-inputs');
    container.innerHTML = STREAM_SUBJECTS[stream].map(([id, name]) => `
        <label class="flex flex-col gap-1 text-xs font-semibold text-primary-container">
            ${name}
            <input type="number" min="0" max="100" inputmode="numeric" placeholder="0-100" data-subject="${id}" value="${chanceMarks[id] ?? ''}"
                class="chance-mark-input h-10 px-3 rounded-lg border border-gray-300 bg-white text-sm font-bold text-primary-container">
        </label>
    `).join('');

    container.querySelectorAll('.chance-mark-input').forEach(input => {
        // A mouse wheel over a focused number box changes its value in some
        // browsers; drop focus so scrolling the page can't alter marks
        input.addEventListener('wheel', () => input.blur(), { passive: true });
        input.addEventListener('input', () => {
            clearChanceResults();
            const raw = input.value.trim();
            if (raw === '') {
                delete chanceMarks[input.dataset.subject];
            } else {
                // Keep marks within 0-100
                const val = Math.min(100, Math.max(0, parseInt(raw, 10) || 0));
                if (String(val) !== raw) input.value = val;
                chanceMarks[input.dataset.subject] = val;
            }
            updateChanceTotal();
        });
    });
    updateChanceTotal();
}

function initChanceChecker() {
    const streamSelect = document.getElementById('chance-stream');
    if (!streamSelect) return;

    // Prefill from the student's saved assessment, if they took it
    const saved = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    chanceMarks = { ...(saved.marks || {}) };
    const stream = saved.stream || saved.academic_stream;
    if (STREAM_SUBJECTS[stream]) streamSelect.value = stream;
    if (saved.gender === 'male' || saved.gender === 'female') {
        document.getElementById('chance-gender').value = saved.gender;
    }

    streamSelect.addEventListener('change', () => {
        clearChanceResults();
        renderChanceSubjectInputs();
    });
    document.getElementById('chance-gender').addEventListener('change', clearChanceResults);
    document.getElementById('chance-check-btn').addEventListener('click', checkAdmissionChances);
    renderChanceSubjectInputs();
}

async function checkAdmissionChances() {
    const errorEl = document.getElementById('chance-error');
    const btn = document.getElementById('chance-check-btn');
    const stream = document.getElementById('chance-stream').value;
    const subjects = STREAM_SUBJECTS[stream];

    const showError = message => {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    };

    const missing = subjects.filter(([id]) => chanceMarks[id] == null || chanceMarks[id] === '').map(([, name]) => name);
    if (missing.length > 0) return showError(`Please enter your marks for: ${missing.join(', ')}.`);
    if (!currentUni) return showError('University details are still loading. Please try again in a moment.');
    errorEl.classList.add('hidden');

    const marks = Object.fromEntries(subjects.map(([id]) => [id, Number(chanceMarks[id])]));
    const originalLabel = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Checking...';

    try {
        const result = await window.apiFetch(`/api/universities/${currentUni.university_id}/chances`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gender: document.getElementById('chance-gender').value, stream, marks })
        });
        if (!result.success || !result.data) throw new Error(result.message || 'Unexpected response from server.');
        renderChanceResults(result.data);
    } catch (err) {
        showError(`⚠️ Could not check your chances: ${err.message}`);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalLabel;
    }
}

function renderChanceRequirement(req, program) {
    const hasMarks = req.student !== null && req.student !== undefined;
    const diff = hasMarks ? req.student - req.required : null;
    // A requirement the student misses only counts as failed if it blocks
    // admission (not when they qualify through an alternative path)
    const failed = req.met === false && !program.eligible;
    const cls = req.met === true ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
        : failed ? 'bg-rose-50 border-rose-200 text-rose-800'
        : 'bg-gray-50 border-gray-200 text-gray-700';
    const mark = req.met === true ? '✓' : failed ? '✗' : '•';
    const diffText = diff === null ? '' : ` (${diff >= 0 ? '+' : ''}${diff})`;
    return `<span class="px-2 py-0.5 rounded-md border text-[11px] font-medium ${cls}">${mark} ${req.label}: <strong>${hasMarks ? req.student : '—'}</strong> / ${req.required}${diffText}</span>`;
}

function renderChanceResults(data) {
    const resultsEl = document.getElementById('chance-results');
    const programs = data.programs || [];
    const rated = programs.filter(p => !p.restricted_by_stream && p.chance_percent !== null);
    const goodChance = rated.filter(p => p.chance_percent >= 70).length;

    const summary = rated.length > 0
        ? `With <strong>${data.total_marks}</strong> total marks, you have a good chance (70% or more) at <strong>${goodChance}</strong> of ${rated.length} program${rated.length === 1 ? '' : 's'} here.`
        : `With <strong>${data.total_marks}</strong> total marks. None of the programs here can be rated for you.`;

    const cards = programs.map(p => {
        const header = `
            <div class="min-w-0">
                <div class="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">${p.field_icon || '🎓'} ${p.field_name || 'Academic Degree'}</div>
                <h4 class="font-bold text-sm sm:text-base text-primary-container">${p.program_name}</h4>
            </div>`;

        if (p.restricted_by_stream) {
            return `
            <div class="p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-1">
                ${header}
                <p class="text-xs text-on-surface-variant">🚫 Not open to students from your matriculation stream.</p>
            </div>`;
        }

        const chance = p.chance_percent;
        if (chance === null) {
            return `
            <div class="p-4 rounded-xl border border-outline-variant/20 bg-white flex items-start justify-between gap-3">
                ${header}
                <div class="text-sm font-bold text-primary-container shrink-0">Open admission</div>
            </div>`;
        }

        const color = chance >= 70 ? 'text-emerald-700' : chance >= 40 ? 'text-amber-600' : 'text-rose-700';
        const bar = chance >= 70 ? 'bg-emerald-500' : chance >= 40 ? 'bg-amber-500' : 'bg-rose-500';
        return `
            <div class="p-4 rounded-xl border border-outline-variant/20 bg-white space-y-2.5">
                <div class="flex items-start justify-between gap-3">
                    ${header}
                    <div class="text-right shrink-0">
                        <div class="text-2xl sm:text-3xl font-extrabold leading-none ${color}">${chance}%</div>
                        <div class="text-[10px] text-on-surface-variant mt-0.5">estimated chance</div>
                    </div>
                </div>
                <div class="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div class="h-full rounded-full ${bar}" style="width: ${chance}%"></div>
                </div>
                <div class="flex flex-wrap items-center gap-1.5">
                    <span class="px-2 py-0.5 rounded-md text-[11px] font-bold ${CHANCE_STATUS_BADGES[p.status] || ''}">${p.status_label}</span>
                    ${(p.requirements || []).map(req => renderChanceRequirement(req, p)).join('')}
                </div>
                ${p.note ? `<p class="text-[11px] text-on-surface-variant">ℹ️ ${p.note}</p>` : ''}
            </div>`;
    }).join('');

    resultsEl.innerHTML = `
        <div class="p-3 rounded-xl bg-blue-50 border border-blue-100 text-sm text-primary-container">${summary}</div>
        ${cards}
        <p class="text-[11px] text-on-surface-variant leading-relaxed">
            How the estimate works: scoring exactly the predicted cutoff gives a 50% chance, and it rises or falls the further above or below it you are.
            Programs with extra subject requirements (such as Eng+Chem+Bio) take each requirement into account. It never shows 0% or 100%, because the cutoffs are predictions.
        </p>`;
    resultsEl.classList.remove('hidden');
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initChanceChecker();
    loadUniversityDetails();
});
