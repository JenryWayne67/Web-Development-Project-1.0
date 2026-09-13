// UniAdvisor - Step 4: Your University Matches (2026)

let currentRecommendations = [];
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'best';

const RANK_LABELS = ['1st', '2nd', '3rd'];

// Friendlier names for interest values whose stored name differs from the
// label shown on step 2.
const INTEREST_DISPLAY_NAMES = {
    'Programming & Technology': 'IT & Computer Science',
    'Medicine and health': 'Medicine & Health'
};
const displayInterest = name => INTEREST_DISPLAY_NAMES[name] || name;

// Card styling for each admission status assigned by the backend.
const STATUS_STYLES = {
    safe: { icon: '🌟', label: 'Safe', hint: 'Comfortably above the cutoff', badge: 'bg-emerald-100 text-emerald-800 border border-emerald-300', panel: 'bg-emerald-50 border-emerald-200' },
    meets: { icon: '✅', label: 'Meets Cutoff', hint: 'At or just above the cutoff', badge: 'bg-green-100 text-green-800 border border-green-300', panel: 'bg-green-50 border-green-200' },
    borderline: { icon: '⚠️', label: 'Borderline', hint: 'Slightly below the cutoff', badge: 'bg-amber-100 text-amber-800 border border-amber-300', panel: 'bg-amber-50 border-amber-200' },
    below: { icon: '❌', label: 'Below Cutoff', hint: 'Does not meet the cutoff', badge: 'bg-rose-100 text-rose-800 border border-rose-300', panel: 'bg-rose-50 border-rose-200' }
};

const CHIP_ACTIVE = 'filter-chip px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-white shadow-sm transition-all';
const CHIP_INACTIVE = 'filter-chip px-3.5 py-1.5 rounded-full text-xs font-bold bg-surface-container text-on-surface-variant hover:bg-surface-variant transition-all';

function getUniUrl(item) {
    if (!item) return 'yourmatches.html';
    if (typeof item === 'object') {
        if (item.university_id) return `university-detail.html?id=${item.university_id}&from=matches`;
        if (item.detail_url && item.detail_url !== 'uniexp.html') {
            const separator = item.detail_url.includes('?') ? '&' : '?';
            return `${item.detail_url}${separator}from=matches`;
        }
        if (item.university_code) return `university-detail.html?code=${encodeURIComponent(item.university_code)}&from=matches`;
    }
    if (typeof item === 'string') {
        return `university-detail.html?code=${encodeURIComponent(item)}&from=matches`;
    }
    return 'yourmatches.html';
}

function getInterests() {
    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    return Array.isArray(assessment.fields) ? assessment.fields.slice(0, 3) : [];
}

function renderInterestSummary(interests) {
    const summary = document.getElementById('summaryInterestsDisplay');
    if (summary) {
        summary.textContent = interests.length > 0
            ? `Interests: ${interests.map((f, i) => `${RANK_LABELS[i]} ${displayInterest(f)}`).join(' · ')}`
            : 'No interests selected, showing all fields';
    }
    const chips = document.getElementById('interestFilterChips');
    if (chips) {
        chips.innerHTML = interests.map((f, i) =>
            `<button data-filter="interest:${f}" class="${CHIP_INACTIVE}">🎯 ${RANK_LABELS[i]}: ${displayInterest(f)}</button>`
        ).join('');
    }
}

async function loadMatches(customMarks = null) {
    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    const totalMarks = customMarks !== null ? customMarks : (assessment.total_marks || 502);
    const gender = assessment.gender || 'male';
    const fields = getInterests();
    const marks = assessment.marks || {};
    const stream = assessment.stream || assessment.academic_stream || '';

    const noticeBanner = document.getElementById('ineligibleNoticeBanner');
    const noticeDetail = document.getElementById('ineligibleNoticeDetail');
    if (Array.isArray(assessment.subjects)) {
        const failing = assessment.subjects.filter(s => (parseInt(s.marks) || 0) < 40);
        if (failing.length > 0 && noticeBanner && noticeDetail) {
            noticeBanner.classList.remove('hidden');
            noticeDetail.innerHTML = `You have <strong>${failing.length} subject(s)</strong> (${failing.map(f => f.name + ': ' + f.marks).join(', ')}) below the required Myanmar matriculation pass standard (40 marks). Official university admission requires ≥ 40 across all subjects.`;
        } else if (noticeBanner) {
            noticeBanner.classList.add('hidden');
        }
    }

    const summaryScoreDisplay = document.getElementById('summaryScoreDisplay');
    if (summaryScoreDisplay) {
        const distCount = assessment.distinctions ?? 5;
        const distinctions = distCount > 0 ? ` • ${distCount} Distinction${distCount === 1 ? '' : 's'}` : '';
        const genderLabel = (gender || 'student').charAt(0).toUpperCase() + (gender || 'student').slice(1);
        summaryScoreDisplay.innerHTML = `Total Marks: <span class="text-gold font-bold">${totalMarks}</span> / 600 (${genderLabel}${distinctions})`;
    }

    try {
        const params = new URLSearchParams({ total_marks: totalMarks, gender, stream });
        if (fields.length > 0) params.append('fields', fields.join(','));
        ['english', 'mathematics', 'physics', 'chemistry', 'biology', 'economics', 'geography', 'history'].forEach(subject => {
            if (marks[subject]) params.append(subject, marks[subject]);
        });

        const data = await window.apiFetch(`/api/recommendations?${params.toString()}`);
        if (data.success && Array.isArray(data.data)) {
            currentRecommendations = data.data;
            try {
                localStorage.setItem('advisor_results', JSON.stringify(data.data));
            } catch (storageErr) {
                console.warn('Storage save error:', storageErr);
            }
            renderCards();
        } else {
            throw new Error('Unexpected response from server.');
        }
    } catch (e) {
        console.error('Error fetching recommendations:', e);
        // Only reuse cached results in the current (status-based) format
        const cached = JSON.parse(localStorage.getItem('advisor_results') || '[]');
        const usable = Array.isArray(cached) ? cached.filter(item => item && item.status) : [];
        if (usable.length > 0) {
            currentRecommendations = usable;
            renderCards();
        } else {
            const container = document.getElementById('matchesCardsContainer');
            if (container) {
                container.innerHTML = `
                    <div class="bg-white rounded-2xl p-12 text-center border border-outline-variant/30">
                        <span class="text-4xl mb-4 block">⚠️</span>
                        <h3 class="font-headline-md font-bold text-primary mb-2">Could Not Load Your Matches</h3>
                        <p class="text-sm text-on-surface-variant mb-6">${e.message}</p>
                        <button onclick="loadMatches()" class="bg-gold text-primary font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-yellow-400">Try Again</button>
                    </div>
                `;
            }
        }
    }
}

function matchesFilter(item) {
    if (currentFilter.startsWith('status:')) {
        return item.status === currentFilter.slice('status:'.length);
    }
    if (currentFilter.startsWith('interest:')) {
        const field = currentFilter.slice('interest:'.length);
        return item.interest_field === field || (item.other_programs || []).some(p => p.interest_field === field);
    }
    return true;
}

// One requirement chip, e.g. "✓ Total marks: 510 / 480 (+30)". A requirement the
// student didn't meet is only shown as failed if it actually blocks admission
// (not when they qualified through an alternative path).
function renderRequirement(req, item) {
    const hasMarks = req.student !== null && req.student !== undefined;
    const diff = hasMarks ? req.student - req.required : null;
    const diffText = diff === null ? '' : ` (${diff >= 0 ? '+' : ''}${diff})`;
    let cls = 'bg-surface border-outline-variant/30 text-on-surface';
    let mark = '•';
    if (req.met === true) {
        cls = 'bg-emerald-50 border-emerald-200 text-emerald-800';
        mark = '✓';
    } else if (req.met === false && !item.eligible) {
        cls = 'bg-rose-50 border-rose-200 text-rose-800';
        mark = '✗';
    }
    return `<span class="px-2.5 py-1 rounded-lg border font-medium ${cls}">${mark} ${req.label}: <strong>${hasMarks ? req.student : '—'}</strong> / ${req.required}${diffText}</span>`;
}

function renderCards() {
    const container = document.getElementById('matchesCardsContainer');
    if (!container) return;

    let list = currentRecommendations.filter(matchesFilter);

    if (currentSearch.trim()) {
        const q = currentSearch.toLowerCase();
        list = list.filter(item =>
            (item.university_name && item.university_name.toLowerCase().includes(q)) ||
            (item.program_name && item.program_name.toLowerCase().includes(q)) ||
            (item.field_name && item.field_name.toLowerCase().includes(q)) ||
            (item.university_location && item.university_location.toLowerCase().includes(q)) ||
            (item.other_programs || []).some(p => (p.program_name || '').toLowerCase().includes(q))
        );
    }

    list.sort((a, b) => currentSort === 'name_asc'
        ? (a.university_name || '').localeCompare(b.university_name || '')
        : (a.suggestion_no || 0) - (b.suggestion_no || 0));

    if (list.length === 0) {
        const noResultsAtAll = currentRecommendations.length === 0;
        container.innerHTML = `
            <div class="bg-white rounded-2xl p-12 text-center border border-outline-variant/30">
                <span class="text-4xl mb-4 block">🔍</span>
                <h3 class="font-headline-md font-bold text-primary mb-2">${noResultsAtAll ? 'No Universities Found for Your Interests' : 'No Matches Found for this Filter'}</h3>
                <p class="text-sm text-on-surface-variant mb-6">${noResultsAtAll ? 'Try choosing different interests.' : "Try selecting 'All' or clearing your search."}</p>
                ${noResultsAtAll
                    ? `<button onclick="location.href='assessment2.html'" class="bg-gold text-primary font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-yellow-400">Change Interests</button>`
                    : `<button onclick="resetFilters()" class="bg-gold text-primary font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-yellow-400">Reset Filters</button>`}
            </div>
        `;
        return;
    }

    container.innerHTML = list.map((item, index) => {
        const style = STATUS_STYLES[item.status] || STATUS_STYLES.meets;
        // Heading before the first university that's outside the student's interests
        const showOutsideHeading = currentSort === 'best' && item.outside_interests && (index === 0 || !list[index - 1].outside_interests);
        const suggestionNumber = item.suggestion_no;
        const isBest = suggestionNumber === 1;
        const detailUrl = getUniUrl(item);
        const rankLabel = item.interest_rank ? RANK_LABELS[item.interest_rank - 1] : '';
        const requirements = Array.isArray(item.requirements) ? item.requirements : [];
        const others = Array.isArray(item.other_programs) ? item.other_programs : [];

        const othersHtml = others.length > 0 ? `
            <div class="mt-3">
                <div class="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-wider mb-1.5">Other matching programs here</div>
                <div class="flex flex-wrap gap-1.5">
                    ${others.slice(0, 6).map(p => {
                        const s = STATUS_STYLES[p.status] || STATUS_STYLES.meets;
                        return `<span class="px-2 py-0.5 rounded-full text-[11px] font-medium ${s.badge}" title="${s.label}">${s.icon} ${p.program_name}</span>`;
                    }).join('')}
                    ${others.length > 6 ? `<span class="px-2 py-0.5 text-[11px] text-on-surface-variant">+${others.length - 6} more</span>` : ''}
                </div>
            </div>` : '';

        return `
        ${showOutsideHeading ? `
        <div class="pt-4 border-t border-outline-variant/40">
            <h3 class="font-bold text-primary text-base sm:text-lg">Top universities you qualify for, outside your interests</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant">High-cutoff universities whose requirements you meet, most competitive first, added to complete your list of 20.</p>
        </div>` : ''}
        <div class="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border-l-[4px] sm:border-l-[6px] ${isBest ? 'border-l-gold' : 'border-l-primary'} border-y border-r border-outline-variant/30 relative overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] pt-8 sm:pt-6">
            ${isBest ? `
            <div class="absolute top-0 right-0 bg-gold text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl font-bold text-[11px] sm:text-sm flex items-center gap-1 shadow-sm">
                👑 Best Suggestion
            </div>` : item.top_pick && rankLabel ? `
            <div class="absolute top-0 right-0 bg-[#002147] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl font-bold text-[11px] sm:text-sm flex items-center gap-1 shadow-sm">
                ⭐ Top pick for your ${rankLabel} interest
            </div>` : ''}

            <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:items-center">
                <!-- Left: University Photo, Rank and Admission Status -->
                <div class="w-full lg:w-[200px] shrink-0">
                    <div class="relative h-40 lg:h-[130px] rounded-xl sm:rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30">
                        <img src="${item.image_url || 'uit.jpg'}" alt="${item.university_name}" loading="lazy" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='uit.jpg';">
                        <div class="absolute top-2 left-2 px-2 py-0.5 rounded-md font-black text-[11px] sm:text-xs ${isBest ? 'bg-gold text-primary' : 'bg-primary-container text-white'} tracking-wider shadow-sm">
                            No. ${suggestionNumber}
                        </div>
                    </div>
                    <div class="mt-2 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs sm:text-sm font-bold ${style.badge}" title="${style.hint}">
                        ${style.icon} ${style.label}
                    </div>
                </div>

                <!-- Center: University & Program Info -->
                <div class="flex-1">
                    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                        ${rankLabel ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-gold/15 text-primary border border-gold/30">🎯 ${rankLabel} interest: ${displayInterest(item.interest_field)}</span>` : ''}
                        ${item.outside_interests ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold bg-surface-container-high text-on-surface-variant border border-outline-variant/40">➕ Outside your interests</span>` : ''}
                        ${item.field_name && item.field_name !== item.interest_field ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-surface-container text-on-surface-variant">${item.field_icon || ''} ${item.field_name}</span>` : ''}
                        ${item.is_top_tier_medical ? `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs">🏆 Top Medical</span>` : ''}
                    </div>

                    <h3 class="font-headline-md text-base sm:text-xl font-bold text-primary mb-1">${item.university_name}</h3>

                    <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 text-on-surface-variant font-body-md text-xs sm:text-sm">
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">location_on</span> ${item.university_location || 'Yangon, Myanmar'}</span>
                        <span class="text-outline-variant">•</span>
                        <span class="flex items-center gap-1 font-medium text-primary"><span class="material-symbols-outlined text-[15px]">school</span> ${item.program_name}</span>
                    </div>

                    <!-- Cutoff Requirements -->
                    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                        ${requirements.map(req => renderRequirement(req, item)).join('')}
                    </div>
                    ${item.note ? `<p class="text-[11px] sm:text-xs text-on-surface-variant mt-2">ℹ️ ${item.note}</p>` : ''}

                    ${othersHtml}
                </div>

                <!-- Right: Actions -->
                <div class="flex flex-col gap-2 sm:gap-3 w-full lg:w-auto lg:min-w-[180px] shrink-0 mt-2 lg:mt-0">
                    <button onclick="location.href='${detailUrl}'" class="w-full bg-gold text-primary font-bold py-3 sm:py-2.5 px-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-sm text-sm text-center min-h-[44px] flex items-center justify-center gap-1">
                        <span>View University Details</span>
                        <span class="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// jsPDF's built-in fonts only cover basic Latin, so swap "≥" and drop emoji.
const pdfText = value => String(value ?? '').replace(/≥/g, '>=').replace(/[^\x20-\x7E\n]/g, '').trim();

const STATUS_PDF_COLORS = {
    safe: [4, 120, 87],
    meets: [21, 128, 61],
    borderline: [180, 83, 9],
    below: [190, 18, 60]
};

// Downloads the full suggestion list (ignoring the on-screen filter/search) as a
// PDF, using jsPDF + AutoTable loaded from cdnjs in yourmatches.html.
// Resolves with the loaded image, or null if it can't be loaded.
function loadImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
    });
}

async function downloadMatchesPdf() {
    const jsPDF = window.jspdf && window.jspdf.jsPDF;
    if (currentRecommendations.length === 0) {
        alert('Your university list is still loading. Please try again in a moment.');
        return;
    }
    // AutoTable registers on jsPDF.API (not the prototype); if it didn't
    // auto-register, its UMD build leaves applyPlugin() on window.
    if (jsPDF && typeof jsPDF.API.autoTable !== 'function' && typeof window.applyPlugin === 'function') {
        window.applyPlugin(jsPDF);
    }
    if (!jsPDF || typeof jsPDF.API.autoTable !== 'function') {
        alert('The PDF tool could not load. Check your internet connection and try again.');
        return;
    }

    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 36;

    // Header: title and student profile
    const totalMarks = currentRecommendations[0].user_score ?? assessment.total_marks;
    const gender = assessment.gender ? ` (${assessment.gender.charAt(0).toUpperCase()}${assessment.gender.slice(1)})` : '';
    const interests = getInterests().map((f, i) => `${RANK_LABELS[i]} ${displayInterest(f)}`).join(', ');

    // Logo (skipped if it fails to load) beside the title
    const logo = await loadImage('assets/logo.png');
    const logoSize = 40;
    let titleX = marginX;
    if (logo) {
        const aspect = logo.naturalWidth / logo.naturalHeight || 1;
        const logoWidth = logoSize * aspect;
        // Downscale first: the source logo is 1024px, far more than a 40pt header needs
        const canvas = document.createElement('canvas');
        canvas.height = 160;
        canvas.width = Math.round(160 * aspect);
        canvas.getContext('2d').drawImage(logo, 0, 0, canvas.width, canvas.height);
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', marginX, 24, logoWidth, logoSize);
        titleX = marginX + logoWidth + 10;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 33, 71);
    doc.text('UniAdvisor', titleX, 41);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(85, 95, 108);
    doc.text('Your University Suggestions', titleX, 58);
    doc.setFontSize(10);
    doc.text(`Generated ${new Date().toLocaleDateString()}`, pageWidth - marginX, 41, { align: 'right' });
    doc.text(`Total marks: ${totalMarks} / 600${gender}`, marginX, 86);
    doc.text(`Interests: ${pdfText(interests) || 'All fields'}`, marginX, 100);

    const describeRequirement = r => {
        const hasMarks = r.student !== null && r.student !== undefined;
        const diff = hasMarks ? r.student - r.required : null;
        return `${pdfText(r.label)}: ${hasMarks ? r.student : '-'} / ${r.required}${diff === null ? '' : ` (${diff >= 0 ? '+' : ''}${diff})`}`;
    };

    const rows = currentRecommendations.map(item => [
        item.suggestion_no,
        pdfText(item.university_name),
        pdfText(item.program_name),
        item.interest_rank
            ? `${RANK_LABELS[item.interest_rank - 1]}: ${pdfText(displayInterest(item.interest_field))}`
            : (item.outside_interests ? `Outside your interests (${pdfText(displayInterest(item.field_name))})` : pdfText(displayInterest(item.field_name))),
        pdfText(item.status_label),
        (item.requirements || []).map(describeRequirement).join('\n') || 'No published cutoff'
    ]);

    doc.autoTable({
        startY: 114,
        rowPageBreak: 'avoid',
        head: [['No.', 'University', 'Best program', 'Interest', 'Status', 'Cutoff check']],
        body: rows,
        margin: { left: marginX, right: marginX, bottom: 40 },
        styles: { font: 'helvetica', fontSize: 8.5, cellPadding: 5, valign: 'top', textColor: [25, 28, 29], lineColor: [225, 227, 228], lineWidth: 0.5 },
        headStyles: { fillColor: [0, 33, 71], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [248, 249, 250] },
        columnStyles: {
            0: { cellWidth: 30, halign: 'center' },
            1: { cellWidth: 180, fontStyle: 'bold' },
            2: { cellWidth: 170 },
            3: { cellWidth: 130 },
            4: { cellWidth: 75, fontStyle: 'bold' }
        },
        didParseCell: data => {
            if (data.section === 'body' && data.column.index === 4) {
                const status = currentRecommendations[data.row.index].status;
                data.cell.styles.textColor = STATUS_PDF_COLORS[status] || [25, 28, 29];
            }
        },
        didDrawPage: () => {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(120, 120, 120);
            doc.text('Cutoffs change every year. Always verify with the official university before applying.', marginX, pageHeight - 20);
            doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth - marginX, pageHeight - 20, { align: 'right' });
        }
    });

    // Status legend under the table
    let y = doc.lastAutoTable.finalY + 22;
    if (y > pageHeight - 90) {
        doc.addPage();
        y = 44;
    }
    doc.setFontSize(9);
    [
        ['safe', 'Safe: 15+ marks above the cutoff'],
        ['meets', 'Meets Cutoff: at or just above the cutoff'],
        ['borderline', 'Borderline: slightly below (within 15 marks)']
    ].forEach(([status, text], i) => {
        doc.setTextColor(...STATUS_PDF_COLORS[status]);
        doc.text(text, marginX, y + i * 13);
    });
    if (currentRecommendations.some(item => item.outside_interests)) {
        doc.setTextColor(85, 95, 108);
        doc.text('"Outside your interests": top high-cutoff universities you qualify for, added to complete your list of 20.', marginX, y + 3 * 13 + 4);
    }

    doc.save('UniAdvisor-University-List.pdf');
}

function setActiveChip(filter) {
    document.querySelectorAll('.filter-chip').forEach(c => {
        c.className = c.getAttribute('data-filter') === filter ? CHIP_ACTIVE : CHIP_INACTIVE;
    });
}

function resetFilters() {
    currentFilter = 'all';
    currentSearch = '';
    currentSort = 'best';
    if (document.getElementById('matchSearchInput')) document.getElementById('matchSearchInput').value = '';
    if (document.getElementById('matchSortSelect')) document.getElementById('matchSortSelect').value = 'best';
    setActiveChip('all');
    renderCards();
}

window.resetFilters = resetFilters;
window.downloadMatchesPdf = downloadMatchesPdf;
window.getUniUrl = getUniUrl;

document.addEventListener('DOMContentLoaded', () => {
    renderInterestSummary(getInterests());
    setActiveChip('all');

    // Filter chips (the interest chips are rendered dynamically, so delegate)
    document.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        currentFilter = chip.getAttribute('data-filter') || 'all';
        setActiveChip(currentFilter);
        renderCards();
    });

    document.getElementById('matchSearchInput')?.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderCards();
    });

    document.getElementById('matchSortSelect')?.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderCards();
    });

    document.getElementById('recalculateBtn')?.addEventListener('click', () => {
        const val = parseInt(document.getElementById('scoreSimulatorInput')?.value);
        if (val && val >= 100 && val <= 600) {
            loadMatches(val);
        }
    });

    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    if (assessment.total_marks) {
        const input = document.getElementById('scoreSimulatorInput');
        if (input) input.value = assessment.total_marks;
    }
    loadMatches();
});
