// Vercel serverless function: receives lead-form submissions, forwards them to
// GoHighLevel and emails them via Resend.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY      required for email (https://resend.com/api-keys)
//   LEAD_NOTIFY_EMAIL   inbox that receives every lead (kept out of this public repo)
//   LEAD_FROM_EMAIL     optional sender; defaults to Resend's test sender, which can only
//                       deliver to the inbox the Resend account was created with
//   GHL_WEBHOOK_URL     optional override for the GoHighLevel inbound webhook

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL
  || 'https://services.leadconnectorhq.com/hooks/5mx08gT5SXJptjzoBMQ9/webhook-trigger/36aa89fe-2406-45f1-8418-c7fa4c1203c5';
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'Scalr Leads <onboarding@resend.dev>';

const FIELDS = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['company', 'Brand / store'],
  ['website', 'Website'],
  ['ad_spend', 'Monthly ad spend'],
  ['language', 'Page language'],
];
const REQUIRED = ['name', 'email', 'phone', 'company', 'ad_spend'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function forwardToGhl(lead) {
  const response = await fetch(GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`GoHighLevel responded ${response.status}`);
}

async function sendEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) throw new Error('RESEND_API_KEY or LEAD_NOTIFY_EMAIL is not set');

  const rows = FIELDS
    .filter(([key]) => lead[key])
    .map(([key, label]) => `<tr><td style="padding:6px 16px 6px 0;color:#6e6e73;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#1d1d1f"><strong>${escapeHtml(lead[key])}</strong></td></tr>`)
    .join('');
  const text = FIELDS.filter(([key]) => lead[key]).map(([key, label]) => `${label}: ${lead[key]}`).join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: to.split(',').map((address) => address.trim()),
      reply_to: lead.email,
      subject: `New lead: ${lead.name}${lead.company ? ` — ${lead.company}` : ''}`,
      html: `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;font-size:15px"><h2 style="margin:0 0 16px">New strategy-call request</h2><table style="border-collapse:collapse">${rows}</table><p style="margin-top:20px;color:#86868b;font-size:13px">Reply to this email to answer ${escapeHtml(lead.name)} directly.</p></div>`,
      text: `New strategy-call request\n\n${text}`,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Invalid request' });

  // Honeypot: the hidden "company_url" field is invisible to people, so only bots fill it in
  if (body.company_url) return res.status(200).json({ ok: true });

  const lead = Object.fromEntries(FIELDS.map(([key]) => [key, String(body[key] ?? '').trim().slice(0, 300)]));
  if (REQUIRED.some((key) => !lead[key]) || !EMAIL_PATTERN.test(lead.email)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  const [ghl, email] = await Promise.allSettled([forwardToGhl(lead), sendEmail(lead)]);
  if (ghl.status === 'rejected') console.error('Lead not forwarded to GoHighLevel:', ghl.reason);
  if (email.status === 'rejected') console.error('Lead email not sent:', email.reason);

  // The lead counts as received if it reached at least one destination
  if (ghl.status === 'rejected' && email.status === 'rejected') {
    return res.status(502).json({ error: 'Could not deliver lead' });
  }
  return res.status(200).json({ ok: true });
}
