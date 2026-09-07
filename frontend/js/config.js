// UniAdvisor - API Base URL Configuration
//
// When the frontend is served by the same Express server as the API
// (e.g. the Render deploy, or running locally), relative "/api/..." paths
// work as-is. When the frontend is instead served from a separate static
// host (e.g. Cloudflare Pages), API calls need the full backend URL.
//
// Update RENDER_API_URL below if your backend's Render URL changes.
window.API_BASE_URL = (() => {
    const RENDER_API_URL = 'https://uniadvisor-qvie.onrender.com';
    const host = window.location.hostname;

    const isSameOriginAsBackend =
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host.endsWith('.onrender.com');

    return isSameOriginAsBackend ? '' : RENDER_API_URL;
})();

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
