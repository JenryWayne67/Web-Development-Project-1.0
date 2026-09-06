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
