import { track } from '@/lib/parcels';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const parsed = await request.json().catch(() => ({}));
    const trackingNumber = String(parsed.trackingNumber || '').trim();

    if (!trackingNumber) {
      return Response.json(
        { ok: false, error: { code: 'EMPTY_TRACKING_NUMBER', message: 'Please enter a tracking number.' } },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const result = await track(trackingNumber);
    return Response.json(result, {
      status: result.ok ? 200 : 502,
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: { code: 'PROXY_ERROR', message: 'Tracking proxy failed: ' + err.message } },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
