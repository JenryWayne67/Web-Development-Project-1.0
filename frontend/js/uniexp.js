// UniAdvisor - University Explorer JS (2026)

let allUnis = [];
let activeCategory = 'all';
let searchQuery = '';

const fallbackImages = {
    'UIT': 'uit.jpg',
    'YTU': 'ytu.jpg',
    'WYTU': 'wytu.jpg',
    'TTU': 'ttu.jpg',
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
    'YUOE': 'yuoe.jpg',
    'MMU': 'mmu.jpg',
    'MMMC': 'mmmc.jpg',
    'NMDC': 'nmdc.jpg',
    'NUAC': 'nuac.jpg',
    'YU': 'yangonuniversity.jpg',
    'WYU': 'westuni.jpg',
    'EYU': 'eastuni.jpg',
    'UVS': 'veterinary.jpg',
    'UTM': 'utm.jpg'
};

async function loadExplorer() {
    try {
        const res = await fetch('/api/universities');
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
            allUnis = data.data;
            renderUniList();
        }
    } catch (e) {
        console.error('Failed to load universities:', e);
    }
}

function getCategoryInfo(uni) {
    const catGroup = uni.category_group || '';
    const cat = uni.category || '';
    const fieldIds = uni.field_ids || [];

    if (catGroup === 'Medical' || cat.includes('Medical') || cat.includes('Health') || fieldIds.includes(3)) {
        return { label: 'Medical & Health', icon: '⚕️', color: 'bg-rose-50 text-rose-800 border-rose-200' };
    }
    if (catGroup === 'IT & Computing' || cat.includes('IT') || cat.includes('Computing') || fieldIds.includes(1)) {
        return { label: 'IT & Tech', icon: '💻', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
    }
    if (catGroup === 'Engineering' || cat.includes('Engineering') || fieldIds.includes(2)) {
        return { label: 'Engineering', icon: '🔧', color: 'bg-blue-50 text-blue-800 border-blue-200' };
    }
    if (catGroup === 'Business' || cat.includes('Business') || cat.includes('Economics') || cat.includes('Management') || fieldIds.includes(4)) {
        return { label: 'Business & Eco', icon: '📊', color: 'bg-amber-50 text-amber-800 border-amber-200' };
    }
    if (catGroup === 'Marine' || cat.includes('Marine') || fieldIds.includes(11)) {
        return { label: 'Marine', icon: '⚓', color: 'bg-cyan-50 text-cyan-800 border-cyan-200' };
    }
    if (catGroup === 'Languages' || cat.includes('Languages') || fieldIds.includes(10)) {
        return { label: 'Languages', icon: '🗣️', color: 'bg-teal-50 text-teal-800 border-teal-200' };
    }
    if (catGroup === 'Education' || cat.includes('Education') || fieldIds.includes(7)) {
        return { label: 'Education', icon: '🎓', color: 'bg-purple-50 text-purple-800 border-purple-200' };
    }
    return { label: 'Arts & Sciences', icon: '🏛️', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
}

function renderUniList() {
    const container = document.getElementById('universityGridContainer');
    const countEl = document.getElementById('uniListCount');
    if (!container) return;

    let filtered = [...allUnis];

    if (activeCategory !== 'all') {
        filtered = filtered.filter(u => {
            const catGroup = u.category_group || '';
            const cat = u.category || '';
            const fieldIds = u.field_ids || [];
            const progFieldIds = (u.programs || []).map(p => p.field_id);

            if (activeCategory === 'IT & Computing') {
                return catGroup === 'IT & Computing' || cat.includes('IT') || cat.includes('Computing') || fieldIds.includes(1) || progFieldIds.includes(1);
            }
            if (activeCategory === 'Engineering') {
                return catGroup === 'Engineering' || cat.includes('Engineering') || fieldIds.includes(2) || progFieldIds.includes(2);
            }
            if (activeCategory === 'Medical') {
                return catGroup === 'Medical' || cat.includes('Medical') || cat.includes('Health') || cat.includes('Pharmacy') || cat.includes('Dental') || cat.includes('Nursing') || cat.includes('Veterinary') || fieldIds.includes(3) || progFieldIds.includes(3);
            }
            if (activeCategory === 'Business') {
                return catGroup === 'Business' || (cat.includes('Business') || cat.includes('Economics') || cat.includes('Management') || cat.includes('Commerce')) && !cat.includes('Health') && !cat.includes('Nursing') || fieldIds.includes(4) || progFieldIds.includes(4);
            }
            if (activeCategory === 'Comprehensive / Arts') {
                return catGroup === 'Comprehensive / Arts' || catGroup === 'Languages' || catGroup === 'Education' || cat.includes('Arts') || cat.includes('Culture') || cat.includes('Languages') || cat.includes('Education') || cat.includes('Comprehensive') || fieldIds.some(f => [5, 6, 7, 8, 9, 10].includes(f)) || progFieldIds.some(f => [5, 6, 7, 8, 9, 10].includes(f));
            }
            if (activeCategory === 'Marine') {
                return catGroup === 'Marine' || cat.includes('Marine') || cat.includes('Maritime') || fieldIds.includes(11) || progFieldIds.includes(11);
            }
            return true;
        });
    }

    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(u => {
            const name = (u.university_name || u.name || '').toLowerCase();
            const code = (u.code || u.short_name || '').toLowerCase();
            const loc = (u.location || '').toLowerCase();
            const desc = (u.description || '').toLowerCase();
            const progs = (u.programs || []).some(p => (p.program_name || p.name || '').toLowerCase().includes(q));
            return name.includes(q) || code.includes(q) || loc.includes(q) || desc.includes(q) || progs;
        });
    }

    if (countEl) countEl.innerText = `Universities in Yangon (${filtered.length})`;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full bg-white rounded-2xl p-12 text-center border border-gray-200">
                <p class="text-gray-500 mb-4 font-medium">No universities match your search criteria.</p>
                <button onclick="resetUniFilters()" class="bg-gold text-primary font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-yellow-400 transition-all">Clear Filters</button>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map((u) => {
        const uniId = u.university_id || u.id;
        const detailUrl = `university-detail.html?id=${uniId}`;
        const uniCode = u.code || u.short_name || 'UNI';
        const uniName = u.university_name || u.name || 'University';
        const uniImg = u.image_url || fallbackImages[uniCode] || (uniCode === 'YU' ? 'yangonuniversity.jpg' : 'uit.jpg');
        const location = u.location || 'Yangon, Myanmar';
        const cutoff = u.historical_cutoff || (u.programs && u.programs[0] ? (u.programs[0].min_score || u.programs[0].min_total_marks) : null) || 450;
        const uniType = u.type || 'Public';
        const desc = u.description || 'Premier higher education institution in Myanmar.';
        const progs = u.programs || [];
        const catInfo = getCategoryInfo(u);

        return `
        <article class="bg-white rounded-[20px] border border-gray-200 p-4 sm:p-5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col min-h-[440px] relative shadow-sm hover:shadow-xl">
            <div class="h-[160px] sm:h-[170px] w-full bg-gray-100 rounded-t-[16px] -mt-4 sm:-mt-5 -mx-4 sm:-mx-5 mb-4 sm:mb-5 flex items-center justify-center relative overflow-hidden">
                <img alt="${uniName}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src="${uniImg}" onerror="this.onerror=null; this.src='uit.jpg';">
                <span class="absolute bottom-2 left-2 bg-[#002147]/90 text-white text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-sm shadow">
                    ${uniCode}
                </span>
                <span class="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm">
                    ⭐ ${u.rating || '4.8'}
                </span>
            </div>
            <div class="flex flex-col flex-grow">
                <h2 class="font-bold text-[18px] text-[#002147] mb-1 leading-snug">${uniName}</h2>
                <p class="text-[13px] text-gray-500 flex items-center gap-1 mb-3">📍 ${location}</p>
                
                <div class="mb-3 flex flex-wrap gap-1.5">
                    <span class="px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${catInfo.color}">
                        ${catInfo.icon} ${catInfo.label}
                    </span>
                    <span class="px-2.5 py-0.5 bg-[#FFB800]/15 text-[#B37400] rounded-full font-bold text-[11px] border border-[#FFB800]/30">Cutoff ~${cutoff}/600</span>
                    <span class="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-semibold rounded-full border border-gray-200">${uniType}</span>
                </div>

                <p class="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">${desc}</p>

                <div class="flex flex-wrap gap-1.5 mb-4 mt-auto">
                    ${progs.slice(0, 3).map(p => `
                        <span class="px-2.5 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-700 border border-gray-200/80">${p.program_name || p.name}</span>
                    `).join('')}
                </div>

                <div class="pt-4 border-t border-gray-100 flex justify-between items-center mt-2">
                    <span class="text-xs text-gray-500 font-medium flex items-center gap-1">
                        <span class="material-symbols-outlined text-[15px] text-green-600">verified</span> Verified (2026)
                    </span>
                    <a class="text-[#002147] font-bold text-[14px] hover:text-[#B37400] flex items-center gap-1 transition-colors" href="${detailUrl}">View Details <span class="text-base">→</span></a>
                </div>
            </div>
        </article>
        `;
    }).join('');
}

function resetUniFilters() {
    activeCategory = 'all';
    searchQuery = '';
    const searchInput = document.getElementById('uniSearchInput');
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.cat-filter-btn').forEach(b => {
        if (b.getAttribute('data-cat') === 'all') {
            b.className = 'cat-filter-btn px-5 py-2.5 rounded-full font-bold text-sm bg-primary text-white shadow-sm transition-all';
        } else {
            b.className = 'cat-filter-btn px-5 py-2.5 rounded-full font-bold text-sm bg-surface-container text-primary hover:bg-[#002147] hover:text-white transition-all';
        }
    });
    renderUniList();
}

window.resetUniFilters = resetUniFilters;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');

    if (searchParam) {
        searchQuery = searchParam;
        const searchInput = document.getElementById('uniSearchInput');
        if (searchInput) searchInput.value = searchParam;
    }

    if (categoryParam) {
        activeCategory = categoryParam;
    }

    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        const cat = btn.getAttribute('data-cat');
        if (cat === activeCategory) {
            btn.className = 'cat-filter-btn px-5 py-2.5 rounded-full font-bold text-sm bg-primary text-white shadow-sm transition-all';
        } else {
            btn.className = 'cat-filter-btn px-5 py-2.5 rounded-full font-bold text-sm bg-surface-container text-primary hover:bg-[#002147] hover:text-white transition-all';
        }

        btn.addEventListener('click', () => {
            activeCategory = btn.getAttribute('data-cat');
            document.querySelectorAll('.cat-filter-btn').forEach(b => {
                b.className = 'cat-filter-btn px-5 py-2.5 rounded-full font-bold text-sm bg-surface-container text-primary hover:bg-[#002147] hover:text-white transition-all';
            });
            btn.className = 'cat-filter-btn px-5 py-2.5 rounded-full font-bold text-sm bg-primary text-white shadow-sm transition-all';
            renderUniList();
        });
    });

    document.getElementById('uniSearchInput')?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderUniList();
    });

    loadExplorer();
});
