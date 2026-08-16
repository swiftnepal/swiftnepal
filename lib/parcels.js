/* ==========================================================================
   SWIFT NEPAL — PARCELSAPP v4 CLIENT
   --------------------------------------------------------------------------
   A thin wrapper around the ParcelsApp v4 API used by the /api/track route
   handler. The secret API key lives on the server only.
   ========================================================================== */

const API_BASE = 'https://parcelsapp.com/api/v4';

// Secret API key — loaded from the environment first. For local development
// it falls back to the key below, but you SHOULD set the PARCELS_API_KEY
// environment variable (or the .env file) before deploying anywhere public.
const API_KEY =
  process.env.PARCELS_API_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwZDE2MWQzMC05M2RiLTExZjEtODA0NS1kZjMwMmVhNmIzYWIiLCJzdWJJZCI6IjZhNzg1MmVkZGNlYjZhMmM2N2E4MjZiYyIsImlhdCI6MTc4NjI3MDQ0NX0.w1aDDjw-68RhI6mAXRSj6hB0KFRZyLiMGENudfqhR4E';

// How long to poll a "processing" request before giving up (ms total)
const POLL_MAX_TRIES = 10;
const POLL_INTERVAL_MS = 1500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// POST /trackings — create a tracking request for one shipment
async function createTracking(trackingNumber) {
  const response = await fetch(`${API_BASE}/trackings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      language: 'en',
      shipments: [{ tracking_number: trackingNumber }]
    })
  });

  const body = await response.json().catch(() => null);
  return { status: response.status, body };
}

// GET /trackings/{request_id} — read current state of a tracking request
async function readTracking(requestId) {
  const response = await fetch(`${API_BASE}/trackings/${encodeURIComponent(requestId)}`, {
    headers: { Authorization: `Bearer ${API_KEY}`, Accept: 'application/json' }
  });

  const body = await response.json().catch(() => null);
  return { status: response.status, body };
}

// Poll a processing request until it completes (or we run out of attempts)
async function pollUntilDone(requestId, tries = POLL_MAX_TRIES) {
  let result = null;

  for (let i = 0; i < tries; i += 1) {
    await sleep(POLL_INTERVAL_MS);
    result = await readTracking(requestId);
    if (result.status === 200 && result.body && result.body.done) return result;
  }

  // Return whatever the final read gave us (may still be processing)
  return result || { status: 0, body: null };
}

// Main entry point used by the /api/track route
export async function track(trackingNumber) {
  // Step 1 — create the tracking request
  const created = await createTracking(trackingNumber);

  // Non-200: pass the provider's error back to the client
  if (created.status !== 200) {
    return { ok: false, status: created.status, error: created.body && created.body.error };
  }

  // Everything rejected (e.g. DESTINATION_COUNTRY_REQUIRED)?
  const rejected = created.body && created.body.rejected;
  if (Array.isArray(rejected) && rejected.length > 0) {
    return {
      ok: false,
      status: 200,
      error: { code: rejected[0].code, message: rejected[0].message }
    };
  }

  // Step 2 — already complete from cache? If not, poll until done
  let final = created.body;
  if (!created.body.done) {
    const polled = await pollUntilDone(created.body.request_id);
    if (polled.status === 200 && polled.body) final = polled.body;
  }

  return { ok: true, tracking: final };
}
