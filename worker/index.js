// UniAdvisor - Cloudflare Worker entry point
//
// Serves the static frontend (via the ASSETS binding, see wrangler.jsonc)
// and proxies /api/* to the Render backend server-side, from Cloudflare's
// edge network.
//
// Why the proxy exists: some ISPs (Myanmar's among them) block direct
// browser connections to a lot of foreign cloud-hosting IP ranges,
// including Render, while leaving Cloudflare's edge reachable -- Cloudflare
// fronts too large a share of the internet to block wholesale. Routing
// "/api/*" through this same-origin Worker means visitors never make that
// direct, blockable connection to Render themselves; Cloudflare's edge
// makes it for them.

const BACKEND_ORIGIN = 'https://uniadvisor-qvie.onrender.com';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return proxyToBackend(request, url);
    }

    // There's no frontend/index.html -- home.html is the site root, same
    // as the "/" and "/index.html" routes in backend/server.js.
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const homeUrl = new URL(request.url);
      homeUrl.pathname = '/home.html';
      return env.ASSETS.fetch(new Request(homeUrl, request));
    }

    // Everything else: static files (html/css/js/images) from frontend/.
    return env.ASSETS.fetch(request);
  }
};

async function proxyToBackend(request, url) {
  const targetUrl = BACKEND_ORIGIN + url.pathname + url.search;

  const headers = new Headers(request.headers);
  headers.delete('host');

  const init = {
    method: request.method,
    headers,
    redirect: 'follow'
  };

  if (!['GET', 'HEAD'].includes(request.method)) {
    init.body = await request.clone().arrayBuffer();
  }

  try {
    const backendResponse = await fetch(targetUrl, init);
    const responseHeaders = new Headers(backendResponse.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    return new Response(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders
    });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      status: 'error',
      message: 'Could not reach the backend service. It may be waking up from sleep (Render free tier) -- please try again in a moment.'
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
