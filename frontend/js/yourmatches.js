// UniAdvisor - Step 4: Your University Matches (2026)

let currentRecommendations = [];
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'match_desc';

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

async function loadMatches(customMarks = null) {
    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    const totalMarks = customMarks !== null ? customMarks : (assessment.total_marks || 502);
    const gender = assessment.gender || 'male';
    const fields = Array.isArray(assessment.fields) ? assessment.fields : [];
    const location = assessment.preferred_location || assessment.location || 'Yangon';
    const learningStyle = assessment.learning_style || 'practical';
    const marks = assessment.marks || {};

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
        const params = new URLSearchParams({
            total_marks: totalMarks,
            gender: gender,
            location: location,
            learning_style: learningStyle
        });

        if (fields.length > 0) {
            params.append('fields', fields.join(','));
        }

        if (marks.english) params.append('english', marks.english);
        if (marks.mathematics) params.append('mathematics', marks.mathematics);
        if (marks.physics) params.append('physics', marks.physics);
        if (marks.chemistry) params.append('chemistry', marks.chemistry);
        if (marks.biology) params.append('biology', marks.biology);
        if (marks.economics) params.append('economics', marks.economics);
        if (marks.geography) params.append('geography', marks.geography);
        if (marks.history) params.append('history', marks.history);

        const res = await fetch(`/api/recommendations?${params.toString()}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
            currentRecommendations = data.data;
            try {
                localStorage.setItem('advisor_results', JSON.stringify(data.data));
            } catch (storageErr) {
                console.warn('Storage save error:', storageErr);
            }
            renderCards();
        }
    } catch (e) {
        console.error('Error fetching recommendations:', e);
        const cached = JSON.parse(localStorage.getItem('advisor_results') || '[]');
        if (Array.isArray(cached) && cached.length > 0) {
            currentRecommendations = cached;
            renderCards();
        }
    }
}

function renderCards() {
    const container = document.getElementById('matchesCardsContainer');
    if (!container) return;

    let list = [...currentRecommendations];

    // Apply filter
    if (currentFilter !== 'all') {
        if (currentFilter === 'interest_only') {
            list = list.filter(item => item.is_interest_matched);
        } else if (currentFilter === 'safe_only') {
            list = list.filter(item => item.admission_chance === 'Very High' || item.admission_chance === 'High');
        } else if (currentFilter === 'target_only') {
            list = list.filter(item => item.admission_chance === 'Moderate');
        } else if (currentFilter === 'reach_only') {
            list = list.filter(item => item.admission_chance === 'Reach' || item.admission_chance === 'Competitive');
        } else if (currentFilter === 'Economics') {
            list = list.filter(item => {
                const fn = (item.field_name || '').toLowerCase();
                const pn = (item.program_name || '').toLowerCase();
                return fn.includes('economics') || pn.includes('economics') || pn.includes('commerce') || pn.includes('business') || pn.includes('accounting') || pn.includes('finance') || pn.includes('co-operative');
            });
        } else if (currentFilter === 'Arts & Humanities') {
            list = list.filter(item => {
                const fn = (item.field_name || '').toLowerCase();
                const pn = (item.program_name || '').toLowerCase();
                return fn.includes('arts') || fn.includes('humanities') || fn.includes('languages') || fn.includes('education') || fn.includes('environment') || pn.includes('law') || pn.includes('international') || pn.includes('history') || pn.includes('philosophy') || pn.includes('geography') || pn.includes('literature');
            });
        } else {
            list = list.filter(item => 
                item.field_name === currentFilter || 
                (item.field_name && item.field_name.toLowerCase().includes(currentFilter.toLowerCase()))
            );
        }
    }

    // Apply search query
    if (currentSearch.trim()) {
        const q = currentSearch.toLowerCase();
        list = list.filter(item => 
            (item.university_name && item.university_name.toLowerCase().includes(q)) ||
            (item.program_name && item.program_name.toLowerCase().includes(q)) ||
            (item.field_name && item.field_name.toLowerCase().includes(q)) ||
            (item.university_location && item.university_location.toLowerCase().includes(q))
        );
    }

    // Apply sort
    list.sort((a, b) => {
        if (currentSort === 'match_desc') {
            if (a.is_interest_matched !== b.is_interest_matched) return a.is_interest_matched ? -1 : 1;
            if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
            
            // Top-tier Medical Priority: UM1 and UM2 rank #1 and #2 when student likes medicine and meets all requirements
            const isTopMedA = a.eligible && (a.university_code === 'UM1' || a.university_code === 'UM2') && a.is_interest_matched;
            const isTopMedB = b.eligible && (b.university_code === 'UM1' || b.university_code === 'UM2') && b.is_interest_matched;
            if (isTopMedA !== isTopMedB) {
                return isTopMedA ? -1 : 1;
            }
            if (isTopMedA && isTopMedB) {
                if (a.university_code === 'UM1') return -1;
                if (b.university_code === 'UM1') return 1;
            }
            return (b.profile_match_percent || 0) - (a.profile_match_percent || 0);
        }
        if (currentSort === 'cutoff_desc') return (b.required_cutoff_score || 0) - (a.required_cutoff_score || 0);
        if (currentSort === 'cutoff_asc') return (a.required_cutoff_score || 0) - (b.required_cutoff_score || 0);
        if (currentSort === 'name_asc') return (a.university_name || '').localeCompare(b.university_name || '');
        return 0;
    });

    if (list.length === 0) {
        container.innerHTML = `
            <div class="bg-white rounded-2xl p-12 text-center border border-outline-variant/30">
                <span class="text-4xl mb-4 block">🔍</span>
                <h3 class="font-headline-md font-bold text-primary mb-2">No Matches Found for this Filter</h3>
                <p class="text-sm text-on-surface-variant mb-6">Try selecting 'All Matches', adjusting your test score, or resetting filters.</p>
                <button onclick="resetFilters()" class="bg-gold text-primary font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-yellow-400">Reset Filters</button>
            </div>
        `;
        return;
    }

    container.innerHTML = list.map((item, index) => {
        const suggestionNumber = index + 1;
        const isTop = index === 0 && currentFilter === 'all';
        const isRunnerUp = (index === 1 || index === 2) && currentFilter === 'all';
        const detailUrl = getUniUrl(item);
        const uniName = item.university_name || 'University of Yangon';
        const progName = item.program_name || 'Bachelor Program';
        const fieldName = item.field_name || 'Academic Studies';
        const uniLocation = item.university_location || 'Yangon, Myanmar';
        const matchScore = item.profile_match_percent ?? 85;
        const admissionEst = item.admission_rate ?? 'Eligible';
        const isTopTierMed = Boolean(item.is_top_tier_medical || ((item.university_code === 'UM1' || item.university_code === 'UM2') && item.eligible));
        
        let chanceBadgeClass = 'bg-blue-100 text-blue-800 border border-blue-200';
        let chanceIcon = '⚖️';
        let chanceLabel = item.admission_chance ?? 'Eligible';
        
        if (item.admission_chance === 'Very High') {
            chanceBadgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
            chanceIcon = '🌟';
            chanceLabel = 'Safe Match (Very High)';
        } else if (item.admission_chance === 'High') {
            chanceBadgeClass = 'bg-green-100 text-green-800 border border-green-300';
            chanceIcon = '✨';
            chanceLabel = 'Strong Match (High)';
        } else if (item.admission_chance === 'Moderate') {
            chanceBadgeClass = 'bg-blue-100 text-blue-800 border border-blue-200';
            chanceIcon = '🎯';
            chanceLabel = 'Target Program';
        } else if (item.admission_chance === 'Reach') {
            chanceBadgeClass = 'bg-amber-100 text-amber-800 border border-amber-300';
            chanceIcon = '🚀';
            chanceLabel = 'Reach Program';
        } else {
            chanceBadgeClass = 'bg-rose-100 text-rose-800 border border-rose-300';
            chanceIcon = '⚡';
            chanceLabel = 'Competitive';
        }

        const diff = item.score_difference ?? 0;
        const diffText = diff >= 0 ? `+${diff} above cutoff` : `${Math.abs(diff)} below cutoff`;
        const diffClass = diff >= 0 ? 'text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold' : 'text-amber-700 bg-amber-50 border-amber-200 font-semibold';

        const reasonsHtml = Array.isArray(item.match_reasons) && item.match_reasons.length > 0 
            ? item.match_reasons.slice(0, 3).map(r => `<div class="flex items-start gap-1.5 text-xs text-on-surface-variant"><span class="text-gold font-bold">✓</span> <span>${r}</span></div>`).join('')
            : '';

        let badgeHtml = '';
        if (isTop) {
            badgeHtml = `
            <div class="absolute top-0 right-0 bg-gold text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl font-bold text-[11px] sm:text-sm flex items-center gap-1 shadow-sm">
                👑 No. ${suggestionNumber} • Best Match
            </div>`;
        } else if (isRunnerUp) {
            badgeHtml = `
            <div class="absolute top-0 right-0 bg-[#002147] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl font-bold text-[11px] sm:text-sm flex items-center gap-1 shadow-sm">
                ⭐ No. ${suggestionNumber} Match
            </div>`;
        } else if (item.is_interest_matched) {
            badgeHtml = `
            <div class="absolute top-0 right-0 bg-secondary-fixed text-primary px-2.5 sm:px-3 py-1 rounded-bl-xl text-[11px] font-bold flex items-center gap-1">
                🎯 No. ${suggestionNumber} • Passion
            </div>`;
        } else {
            badgeHtml = `
            <div class="absolute top-0 right-0 bg-surface-container text-on-surface-variant px-2.5 sm:px-3 py-1 rounded-bl-xl text-[11px] font-bold flex items-center gap-1">
                No. ${suggestionNumber}
            </div>`;
        }

        return `
        <div class="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.06)] ${isTop ? 'border-l-[4px] sm:border-l-[6px] border-l-gold' : (item.is_interest_matched ? 'border-l-[4px] sm:border-l-[6px] border-l-primary' : 'border-l-[4px] sm:border-l-[6px] border-l-outline-variant')} border-y border-r border-outline-variant/30 relative overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] pt-8 sm:pt-6">
            ${badgeHtml}
            
            <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:items-center">
                <!-- Left: Score Circle and Rank No. -->
                <div class="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full lg:w-auto lg:min-w-[140px] p-3 sm:p-4 ${isTop ? 'bg-gold-light border-gold/40' : (item.is_interest_matched ? 'bg-primary/5 border-primary/20' : 'bg-surface-container-low border-outline-variant/30')} rounded-xl sm:rounded-2xl border text-center">
                    <div class="flex items-center sm:flex-col gap-2 sm:gap-0">
                        <div class="inline-flex items-center justify-center px-2 py-0.5 rounded-md font-black text-[11px] sm:text-xs ${isTop ? 'bg-gold text-primary shadow-xs' : 'bg-primary-container text-white'} sm:mb-1.5 tracking-wider">
                            No. ${suggestionNumber}
                        </div>
                        <span class="sm:hidden font-bold text-xs text-on-surface-variant">Profile Match</span>
                    </div>
                    <div class="flex items-baseline sm:flex-col gap-1 sm:gap-0">
                        <div class="text-2xl sm:text-[40px] font-bold ${isTop ? 'text-gold' : 'text-primary'} leading-none sm:mb-1 font-display tracking-tighter">${matchScore}%</div>
                        <div class="hidden sm:block font-label-sm text-[11px] text-on-surface-variant tracking-wider uppercase font-semibold">Profile Match</div>
                    </div>
                    <div class="text-[10px] text-primary/70 font-medium sm:mt-1">${admissionEst} Est.</div>
                </div>
                
                <!-- Center: University & Program Info -->
                <div class="flex-1">
                    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                        <span class="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-bold ${chanceBadgeClass}">
                            ${chanceIcon} ${chanceLabel}
                        </span>
                        <span class="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium bg-surface-container text-on-surface-variant">
                            ${fieldName}
                        </span>
                        ${isTopTierMed ? `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs">🏆 Top Medical</span>` : ''}
                        ${item.is_interest_matched ? `<span class="px-2 py-0.5 rounded-full text-[11px] font-bold bg-gold/15 text-primary border border-gold/30">🎯 Passion</span>` : ''}
                    </div>

                    <div class="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mb-1">
                        <span class="text-xs sm:text-sm font-black text-gold tracking-wide">No. ${suggestionNumber}</span>
                        <h3 class="font-headline-md text-base sm:text-xl font-bold text-primary">${uniName}</h3>
                    </div>

                    <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 text-on-surface-variant font-body-md text-xs sm:text-sm">
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">location_on</span> ${uniLocation}</span>
                        <span class="text-outline-variant">•</span>
                        <span class="flex items-center gap-1 font-medium text-primary"><span class="material-symbols-outlined text-[15px]">school</span> ${progName}</span>
                    </div>

                    <!-- Score Cutoff and Specific Criteria -->
                    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs mb-3">
                        <span class="bg-surface px-2.5 py-1 rounded-lg border border-outline-variant/30 text-on-surface font-medium">
                            📊 Required: <strong>${item.required_cutoff_score > 0 ? item.required_cutoff_score : 'Open / 300+'}</strong>
                        </span>
                        <span class="px-2.5 py-1 rounded-lg border ${diffClass}">
                            ${diffText}
                        </span>
                        ${item.subject_criteria_detail ? `
                        <span class="bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-lg font-medium">
                            🧪 ${item.subject_criteria_detail}
                        </span>` : ''}
                    </div>

                    <!-- Matching Insights -->
                    ${reasonsHtml ? `
                    <div class="bg-surface-container-low/80 p-2.5 sm:p-3 rounded-xl border border-outline-variant/20 space-y-1">
                        <div class="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                            <span>💡</span> Matching Breakdown
                        </div>
                        ${reasonsHtml}
                    </div>` : ''}
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

function resetFilters() {
    currentFilter = 'all';
    currentSearch = '';
    currentSort = 'match_desc';
    if (document.getElementById('matchSearchInput')) document.getElementById('matchSearchInput').value = '';
    if (document.getElementById('matchSortSelect')) document.getElementById('matchSortSelect').value = 'match_desc';
    document.querySelectorAll('.filter-chip').forEach(c => {
        if (c.getAttribute('data-filter') === 'all') {
            c.className = 'filter-chip px-4 py-2 rounded-full text-xs font-bold bg-primary text-white shadow-sm transition-all';
        } else {
            c.className = 'filter-chip px-4 py-2 rounded-full text-xs font-bold bg-surface-container text-on-surface-variant hover:bg-surface-variant transition-all';
        }
    });
    renderCards();
}

window.resetFilters = resetFilters;
window.getUniUrl = getUniUrl;

document.addEventListener('DOMContentLoaded', () => {
    // Filter chip listeners
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            currentFilter = chip.getAttribute('data-filter');
            document.querySelectorAll('.filter-chip').forEach(c => {
                c.className = 'filter-chip px-4 py-2 rounded-full text-xs font-bold bg-surface-container text-on-surface-variant hover:bg-surface-variant transition-all';
            });
            chip.className = 'filter-chip px-4 py-2 rounded-full text-xs font-bold bg-primary text-white shadow-sm transition-all';
            renderCards();
        });
    });

    // Search input listener
    document.getElementById('matchSearchInput')?.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderCards();
    });

    // Sort select listener
    document.getElementById('matchSortSelect')?.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderCards();
    });

    // Recalculate listener
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
