// UniAdvisor - Cloudflare Pages Function: /api/* proxy
//
// Proxies every request under /api/* to the Render backend, server-side,
// from Cloudflare's edge network.
//
// Why this exists: some ISPs (Myanmar's among them) block direct browser
// connections to a lot of foreign cloud-hosting IP ranges — including
// Render — while leaving Cloudflare's edge reachable, since Cloudflare
// fronts a large share of the internet. Before this proxy, the frontend
// (served from Cloudflare Pages) loaded fine, but every fetch('/api/...')
// call went straight from the visitor's browser to Render and got blocked,
// which is why a VPN was needed just to load data.
//
// With this in place, the browser only ever calls same-origin "/api/..."
// paths. Cloudflare's edge (not the visitor's connection) makes the actual
// call to Render, so the block no longer applies.

const BACKEND_ORIGIN = 'https://uniadvisor-qvie.onrender.com';

export async function onRequest(context) {
  const { request } = context;
  const incomingUrl = new URL(request.url);
  const targetUrl = BACKEND_ORIGIN + incomingUrl.pathname + incomingUrl.search;

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

  let backendResponse;
  try {
    backendResponse = await fetch(targetUrl, init);
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      status: 'error',
      message: 'Could not reach the backend service. It may be waking up from sleep (Render free tier) — please try again in a moment.'
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const responseHeaders = new Headers(backendResponse.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');

  return new Response(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders
  });
}
