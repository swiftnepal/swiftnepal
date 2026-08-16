/* ==========================================================================
   SWIFT NEPAL — SMTP EMAIL
   --------------------------------------------------------------------------
   Sends contact / pickup form emails via SMTP (Gmail by default) from the
   /api/email route handler.
   ========================================================================== */

import nodemailer from 'nodemailer';

const SMTP_USER = process.env.SMTP_USER || 'swiftnepal8@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';

const SMTP = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  user: SMTP_USER,
  pass: SMTP_PASS,
  from: `"Swift Nepal" <${SMTP_USER}>`,
  to: process.env.MAIL_TO || 'swiftnepal8@gmail.com'
};

// The .env file may set SMTP_FROM to a full "Name" <addr> string; only trust
// it when it contains a proper address, otherwise fall back to the default.
if (process.env.SMTP_FROM && process.env.SMTP_FROM.includes('<')) {
  SMTP.from = process.env.SMTP_FROM;
}

const escapeHtml = (value) =>
  String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

let transporter = null;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP.host,
      port: SMTP.port,
      secure: SMTP.secure,
      auth: { user: SMTP.user, pass: SMTP.pass }
    });
  }
  return transporter;
}

export function isEmailConfigured() {
  return Boolean(SMTP.pass);
}

async function sendMail({ subject, text, html, replyTo }) {
  const mailer = getTransporter();
  return mailer.sendMail({
    from: SMTP.from,
    to: SMTP.to,
    replyTo,
    subject,
    text,
    html
  });
}

// Build a plain-text + HTML message from a validated form payload.
export function buildMail(data) {
  const subtitle = data.type === 'pickup' ? 'Pickup Request' : 'Contact Message';
  const subject = `${subtitle} — ${data.name || 'New submission'}`.slice(0, 200);

  if (data.type === 'pickup') {
    const text = [
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Pickup address: ${data.address}`,
      `Preferred date: ${data.date || 'Not specified'}`,
      `Approx. weight: ${data.weight ? `${data.weight} kg` : 'Not specified'}`,
      `Destination: ${data.destination || 'Not specified'}`,
      `Notes: ${data.notes || '—'}`
    ].join('\n');

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#1E293B">
        <h2 style="color:#0F172A;margin:0 0 4px">Pickup Request</h2>
        <p style="margin:0 0 18px;color:#64748B">Sent from the Swift Nepal website</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          ${[
            ['Name', data.name],
            ['Phone', data.phone],
            ['Pickup address', data.address],
            ['Preferred date', data.date || 'Not specified'],
            ['Approx. weight', data.weight ? `${data.weight} kg` : 'Not specified'],
            ['Destination', data.destination || 'Not specified'],
            ['Notes', data.notes || '—']
          ].map(([label, value]) => `
            <tr>
              <td style="padding:8px 12px;border-bottom:1px solid #E2E8F0;color:#64748B;font-weight:700;width:150px">${escapeHtml(label)}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #E2E8F0">${escapeHtml(value)}</td>
            </tr>`).join('')}
        </table>
      </div>`;

    return { subject, text, html };
  }

  // Contact message
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject || 'General inquiry'}`,
    '',
    data.message
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#1E293B">
      <h2 style="color:#0F172A;margin:0 0 4px">Contact Message</h2>
      <p style="margin:0 0 18px;color:#64748B">Sent from the Swift Nepal website</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${[
          ['Name', data.name],
          ['Email', data.email],
          ['Subject', data.subject || 'General inquiry']
        ].map(([label, value]) => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #E2E8F0;color:#64748B;font-weight:700;width:150px">${escapeHtml(label)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #E2E8F0">${escapeHtml(value)}</td>
          </tr>`).join('')}
          <p style="white-space:pre-wrap;padding:14px 0;margin:0">Message: ${escapeHtml(data.message)}</p>
      </table>
    </div>`;

  return { subject, text, html };
}

// Validate a /api/email payload. Returns an error message or null.
export function validateMail(data) {
  if (data.type === 'pickup') {
    if (!data.name || !data.phone || !data.address) {
      return 'Missing required pickup fields (name, phone, address).';
    }
  } else if (data.type === 'contact') {
    if (!data.name || !data.email || !data.message) {
      return 'Missing required contact fields (name, email, message).';
    }
  } else {
    return 'Unknown mail type.';
  }
  return null;
}

export async function sendFormMail(data) {
  const mail = buildMail(data);
  const replyTo = data.type === 'contact' && data.email ? data.email : undefined;
  await sendMail({ ...mail, replyTo });
}
