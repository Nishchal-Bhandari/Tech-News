Proxy to fix CORS for the subscription endpoint

This repository contains a tiny Express proxy that forwards JSON POSTs to your Google Apps Script endpoint and sets CORS headers so the browser can call it from GitHub Pages or any other origin.

Files added
- `server.js` - Express proxy
- `package.json` - dependencies and scripts

Quick start (local)
1. Install dependencies:

```bash
npm install
```

2. Run the proxy (optionally set TARGET_URL to your Apps Script URL):

```bash
TARGET_URL="https://script.google.com/macros/s/AKfycby9qSgTCY.../exec" npm start
```

The proxy will listen on `http://localhost:3000` by default and expose `/subscribe`.

Frontend usage
Point your landing page to the proxy endpoint. For example, set `window.SUBSCRIBE_ENDPOINT` to `https://your-proxy.example.com/subscribe` or set the `data-endpoint` attribute on the form.

Example (in browser):

```js
fetch('https://your-proxy.example.com/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
```

Deploying
- Deploy to Heroku, Render, Fly, or any Node host. Ensure you set `TARGET_URL` to your Apps Script endpoint in the environment variables on the host.

Security note
- This proxy forwards whatever you send to the Apps Script. Add rate limiting, authentication, or spam protection if you expect public traffic.
