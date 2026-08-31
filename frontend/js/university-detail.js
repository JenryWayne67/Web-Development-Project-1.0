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
        let response = await fetch(`/api/universities/${idParam}`);
        let result = await response.json();

        if (!result.success || !result.data) {
            // If not found by ID, try fetching all to match by code
            const allRes = await fetch('/api/universities');
            const allData = await allRes.json();
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
        if (heading) heading.textContent = 'University Information';
        const overview = document.getElementById('uni-overview-text');
        if (overview) overview.textContent = 'Please select a university from the University Explorer directory.';
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
    const rateText = document.getElementById('uni-rating-text');
    if (rateText) rateText.textContent = `⭐ ${uni.rating || '4.8'}`;

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

    // Update Bookmark state
    checkBookmarkState(uni.university_id);
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
        if (!container) return;

        // Configure back buttons and breadcrumbs to point to your potential matches
        const navBackBtn = document.getElementById('nav-back-button');
        const navBackText = document.getElementById('nav-back-text');
        const breadcrumbParent = document.getElementById('breadcrumb-parent-link');
        const sidebarBackBtn = document.getElementById('sidebar-back-button');
        const sidebarBackText = document.getElementById('sidebar-back-text');
        const sectionTitle = document.getElementById('related-section-title');
        const sectionSubtitle = document.getElementById('related-section-subtitle');
        const viewAllBtn = document.getElementById('related-section-viewall');

        if (savedMatches && savedMatches.length > 0) {
            if (navBackBtn) navBackBtn.href = 'yourmatches.html';
            if (navBackText) navBackText.textContent = 'Back to Potential Matches';
            if (breadcrumbParent) {
                breadcrumbParent.href = 'yourmatches.html';
                breadcrumbParent.textContent = 'Potential Matches';
            }
            if (sidebarBackBtn) sidebarBackBtn.href = 'yourmatches.html';
            if (sidebarBackText) sidebarBackText.textContent = 'Back to Potential Matches';
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
                    const matchPercent = m.profile_match_percent || 85;
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
                                    ${matchPercent}% Match
                                </div>
                            </div>
                            <div class="p-4 space-y-1.5">
                                <div class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">${m.university_code}</div>
                                <h4 class="font-bold text-sm text-primary-container line-clamp-1">${m.university_name}</h4>
                                <p class="text-xs text-primary font-medium line-clamp-1">${m.program_name || 'Undergraduate Degree'}</p>
                                <div class="flex items-center gap-2 pt-1 text-[11px] text-on-surface-variant">
                                    <span>📍 ${m.university_location || 'Yangon'}</span>
                                    <span>•</span>
                                    <span class="font-semibold text-primary">Cutoff: ${m.required_cutoff_score || 400}</span>
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

        // Fallback if no assessment matches saved yet
        const res = await fetch('/api/universities');
        const result = await res.json();
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

// Bookmark Handling
function checkBookmarkState(uniId) {
    const bookmarks = JSON.parse(localStorage.getItem('uni_bookmarks') || '[]');
    const isSaved = bookmarks.includes(uniId);
    const icon = document.getElementById('bookmark-icon');
    const text = document.getElementById('bookmark-text');

    if (!icon || !text) return;

    if (isSaved) {
        icon.textContent = 'bookmark';
        icon.classList.add('text-prompt-gold');
        text.textContent = 'Saved to My List';
    } else {
        icon.textContent = 'bookmark_border';
        icon.classList.remove('text-prompt-gold');
        text.textContent = 'Save University';
    }
}

function toggleBookmark() {
    if (!currentUni) return;
    let bookmarks = JSON.parse(localStorage.getItem('uni_bookmarks') || '[]');
    const uniId = currentUni.university_id;

    if (bookmarks.includes(uniId)) {
        bookmarks = bookmarks.filter(id => id !== uniId);
    } else {
        bookmarks.push(uniId);
    }

    localStorage.setItem('uni_bookmarks', JSON.stringify(bookmarks));
    checkBookmarkState(uniId);
}

window.toggleBookmark = toggleBookmark;

// Initialize
document.addEventListener('DOMContentLoaded', loadUniversityDetails);
