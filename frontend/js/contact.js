// UniAdvisor - Contact Page JS (2026)

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const alertEl = document.getElementById('contactStatusAlert');
        const submitBtn = document.getElementById('contactSubmitBtn');
        const name = document.getElementById('fullName')?.value;
        const email = document.getElementById('email')?.value;
        const subject = document.getElementById('subject')?.value;
        const message = document.getElementById('message')?.value;
        const phone = document.getElementById('phone')?.value || '';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span> <span class="animate-spin text-sm">⏳</span>';
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message, phone })
            });
            const data = await res.json();
            if (data.success || data.status === 'success') {
                if (alertEl) {
                    alertEl.className = 'p-4 rounded-xl text-sm mb-4 bg-green-50 text-green-800 border border-green-200 flex items-center gap-2';
                    alertEl.innerHTML = '<span>✅</span> Thank you! Your message has been sent to our admissions advisory team.';
                }
                document.getElementById('contactForm').reset();
            } else {
                throw new Error(data.message || data.error || 'Failed to submit');
            }
        } catch (err) {
            if (alertEl) {
                alertEl.className = 'p-4 rounded-xl text-sm mb-4 bg-red-50 text-red-800 border border-red-200 flex items-center gap-2';
                alertEl.innerHTML = '<span>❌</span> Failed to send message. Please try again.';
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Message</span> <span class="material-symbols-outlined text-[18px]">send</span>';
            }
        }
    });
});
