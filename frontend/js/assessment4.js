// UniAdvisor - Assessment Step 4: Analysis Engine (2026)

async function runAnalysis() {
    const assessment = JSON.parse(localStorage.getItem('advisor_assessment') || '{}');
    const progressBar = document.getElementById('analysisProgressBar');
    const percentText = document.getElementById('analysisPercentText');
    const statusText = document.getElementById('analysisStatusText');

    if (progressBar) progressBar.style.width = '35%';
    if (percentText) percentText.innerText = '35%';

    const marksMap = assessment.marks || {};
    const payload = {
        gender: assessment.gender || 'male',
        total_marks: assessment.total_marks || 502,
        fields: Array.isArray(assessment.fields) && assessment.fields.length > 0 ? assessment.fields : ['Programming & Technology', 'Engineering'],
        location: assessment.preferred_location || assessment.location || 'Yangon',
        learning_style: assessment.learning_style || 'Practical / Hands-on',
        subjects: assessment.subjects || [],
        marks: {
            myanmar: assessment.myanmar ?? marksMap.myanmar ?? 75,
            english: assessment.english ?? marksMap.english ?? 80,
            mathematics: assessment.mathematics ?? marksMap.mathematics ?? 85,
            physics: assessment.physics ?? marksMap.physics ?? 80,
            chemistry: assessment.chemistry ?? marksMap.chemistry ?? 80,
            biology: assessment.biology ?? marksMap.biology ?? 80,
            history: assessment.history ?? marksMap.history ?? 0,
            geography: assessment.geography ?? marksMap.geography ?? 0,
            economics: assessment.economics ?? marksMap.economics ?? 0
        }
    };

    try {
        const res = await fetch('/api/assessments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            const recs = data.recommendations || data.data || [];
            localStorage.setItem('advisor_results', JSON.stringify(recs));
        }
    } catch (e) {
        console.error('API Error:', e);
    }

    setTimeout(() => {
        if (progressBar) progressBar.style.width = '70%';
        if (percentText) percentText.innerText = '70%';
        const s3 = document.getElementById('stage3');
        if (s3) {
            s3.innerHTML = `
                <div class="mt-0.5 flex items-center justify-center flex-shrink-0 text-emerald-600">✅</div>
                <div><p class="font-medium text-[#191C1D]">Matched interests & preferences</p></div>
            `;
        }
        const s4 = document.getElementById('stage4');
        if (s4) {
            s4.className = 'flex items-start gap-3';
            s4.innerHTML = `
                <div class="mt-0.5 flex flex-shrink-0"><span class="animate-spin text-amber-500">🔄</span></div>
                <div><p class="font-bold text-amber-600">Ranking compatible programs & admission probability for 2026 intake...</p></div>
            `;
        }
    }, 800);

    setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
        if (percentText) percentText.innerText = '100%';
        if (statusText) statusText.innerText = 'Analysis Complete!';
        const s4 = document.getElementById('stage4');
        if (s4) {
            s4.innerHTML = `
                <div class="mt-0.5 flex items-center justify-center flex-shrink-0 text-emerald-600">✅</div>
                <div><p class="font-medium text-[#191C1D]">Ranked compatible programs</p></div>
            `;
        }
        const s5 = document.getElementById('stage5');
        if (s5) {
            s5.className = 'flex items-start gap-3';
            s5.innerHTML = `
                <div class="mt-0.5 flex items-center justify-center flex-shrink-0 text-emerald-600">✅</div>
                <div><p class="font-medium text-[#191C1D]">Recommendations ready!</p></div>
            `;
        }
    }, 1800);

    setTimeout(() => {
        window.location.href = 'yourmatches.html';
    }, 2400);
}

document.addEventListener('DOMContentLoaded', runAnalysis);
