// UniAdvisor - API Base URL Configuration
//
// Always use relative "/api/..." paths — never call the Render backend
// directly from the browser. On Render (and locally) that's same-origin
// already; on Cloudflare Pages, functions/api/[[path]].js proxies "/api/*"
// to Render server-side.
//
// This matters beyond convenience: some ISPs (Myanmar's among them) block
// direct browser connections to a lot of foreign cloud-hosting ranges,
// including Render, while leaving Cloudflare's edge reachable. Routing
// through the same-origin proxy means visitors never make that direct,
// blockable connection — Cloudflare's edge makes it for them.
window.API_BASE_URL = '';

// Shared fetch helper: adds a timeout (Render's free tier can take 30-60s to
// wake up from a cold start) and always throws a clear, human-readable error
// instead of letting a page silently show nothing when the API is slow or
// unreachable (e.g. flaky/high-latency connections).
window.apiFetch = async function apiFetch(path, options = {}, timeoutMs = 45000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(`${window.API_BASE_URL || ''}${path}`, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
            throw new Error('The server is taking too long to respond. It may still be waking up (this can take up to a minute on first load) — please try again in a moment.');
        }
        throw new Error('Could not reach the server. Please check your internet connection and try again.');
    }
};
