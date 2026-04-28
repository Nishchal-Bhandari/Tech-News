const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace this with your Apps Script URL or set TARGET_URL env var
const TARGET_URL = process.env.TARGET_URL || 'https://script.google.com/macros/s/AKfycby9qSgTCYdqlvI8BPdGy6IZ3EE6XWxPTMTj1RNyJDX1ITB9PYkkJDAGU2yWvP4ki-LT/exec';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'proxy running' }));

app.post('/subscribe', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });

  try {
    const resp = await fetch(TARGET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    // Forward status and body
    const text = await resp.text();
    res.status(resp.ok ? 200 : 502).send(text);
  } catch (err) {
    console.error('proxy error', err);
    res.status(500).json({ error: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT} -> ${TARGET_URL}`);
});
