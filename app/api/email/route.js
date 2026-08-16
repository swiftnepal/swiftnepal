import { isEmailConfigured, validateMail, sendFormMail } from '@/lib/mail';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const raw = await request.text();

    // Reject oversized payloads early
    if (raw.length > 64 * 1024) {
      return Response.json({ ok: false, error: 'Payload too large.' }, { status: 413 });
    }

    const parsed = JSON.parse(raw || '{}');

    if (!isEmailConfigured()) {
      return Response.json(
        { ok: false, error: 'Email is not configured yet. Please add SMTP_USER and SMTP_PASS to a .env file.' },
        { status: 503 }
      );
    }

    const validationError = validateMail(parsed);
    if (validationError) {
      return Response.json({ ok: false, error: validationError }, { status: 400 });
    }

    await sendFormMail(parsed);
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: 'Failed to send email: ' + err.message }, { status: 502 });
  }
}
