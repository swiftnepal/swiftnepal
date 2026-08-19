/* ==========================================================================
   SWIFT NEPAL — SHIPPING COST CALCULATOR ENGINE (NPR)
   --------------------------------------------------------------------------
   Nepal outbound rate card. Prices are in Nepalese Rupees (NPR):
   - 0.5–4.5 kg  → flat rate for the rounded-up 0.5 kg bracket
   - 5–10 kg     → per-kg rate from the "5+10" row
   - 10–19 kg    → per-kg rate from the "10+19" row
   - 20+ kg      → per-kg rate from the "20+" row
   ========================================================================== */

export const FLAT_WEIGHTS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5];

// Per-kg bands (weight in kg → rate applied to the full weight)
export const BANDS = [
  { label: '5–10 kg', max: 10 },
  { label: '10–19 kg', max: 19 },
  { label: '20+ kg', max: Infinity }
];

// Destination rate groups. `flat` follows FLAT_WEIGHTS (null = not available),
// `bands` follows BANDS.
export const RATE_GROUPS = [
  { key: 'germany', label: 'Germany',
    flat: [2550, 3600, 3850, 4300, 5500, 6100, 6500, 7050, 7350],
    bands: [1500, 1300, 1100] },
  { key: 'italy-group', label: 'Italy, Sweden, Poland, Slovakia, Spain, Hungary, Portugal, Monaco, Slovenia, Ireland',
    flat: [4200, 4650, 4950, 5550, 6100, 6550, 7100, 7550, 8275],
    bands: [1500, 1200, 1150] },
  { key: 'romania-group', label: 'Romania, Bulgaria, Croatia, Estonia, Greece, Lithuania, Finland, Latvia',
    flat: [4800, 5350, 5850, 6100, 7050, 7550, 7850, 8350, 8850],
    bands: [1800, 1250, 1100] },
  { key: 'australia', label: 'Australia',
    flat: [3650, 4050, 4650, 5250, 5850, 6350, 6850, 7550, 8050],
    bands: [1550, 1300, 1000] },
  { key: 'uk', label: 'United Kingdom',
    flat: [4000, 3800, 4450, 4650, 4950, 5350, 5750, 6050, 6650],
    bands: [1350, 900, 800] },
  { key: 'usa', label: 'USA',
    flat: [4450, 5450, 6050, 6750, 7050, 7650, 8050, 9050, 9850],
    bands: [2000, 1650, 1550] },
  { key: 'japan', label: 'Japan',
    flat: [null, 3350, null, 4250, null, 4850, null, 5550, null],
    bands: [1250, 900, 800] },
  { key: 'denmark-group', label: 'Denmark, Belgium, France, Austria, Netherlands, Luxemburg, Czech Republic',
    flat: [4075, 4500, 4950, 5350, 5750, 6350, 6750, 7250, 7650],
    bands: [1400, 1200, 1100] },
  { key: 'canada', label: 'Canada',
    flat: [null, null, null, null, null, null, null, null, null],
    bands: [null, 1600, 1500] },
  { key: 'south-korea', label: 'South Korea',
    flat: [2850, 3250, 3550, 4050, 4250, 4550, 5050, 5250, 5550],
    bands: [1350, 950, 800] }
];

export function getGroup(key) {
  return RATE_GROUPS.find((g) => g.key === key);
}

export function calculate({ destination, weight, serviceCharge = 0, vat = 0, tax = 0, packingCharge = 0, deliveryCharge = 0 }) {
  const group = getGroup(destination);
  const w = Number(weight);

  if (!group) return { error: 'Please choose a destination.' };
  if (!(w > 0)) return { error: 'Please enter a valid weight greater than 0.' };

  let shippingCost;

  if (w <= 4.5) {
    const idx = FLAT_WEIGHTS.findIndex((fw) => w <= fw);
    const rate = group.flat[idx];
    if (rate == null) {
      return { error: `No flat rate is published for ${group.label} at this weight — please contact us for a quote.` };
    }
    shippingCost = rate;
  } else {
    const idx = BANDS.findIndex((b) => w <= b.max);
    const rate = group.bands[idx];
    if (rate == null) {
      return { error: `No rate is published for ${group.label} at ${w} kg — please contact us for a quote.` };
    }
    shippingCost = Math.round(w * rate);
  }

  const sc = Number(serviceCharge) || 0;
  const v = Number(vat) || 0;
  const t = Number(tax) || 0;
  const pc = Number(packingCharge) || 0;
  const dc = Number(deliveryCharge) || 0;
  const additionalTotal = sc + v + t + pc + dc;
  const total = shippingCost + additionalTotal;

  return {
    total,
    shippingCost,
    serviceCharge: sc,
    vat: v,
    tax: t,
    packingCharge: pc,
    deliveryCharge: dc,
    additionalTotal,
    weight: w <= 4.5 ? FLAT_WEIGHTS[FLAT_WEIGHTS.findIndex((fw) => w <= fw)] : w,
    basis: w <= 4.5 ? `Flat rate (${FLAT_WEIGHTS[FLAT_WEIGHTS.findIndex((fw) => w <= fw)]} kg)` : `Per kg (${BANDS[BANDS.findIndex((b) => w <= b.max)].label})`,
    perKg: w <= 4.5 ? null : group.bands[BANDS.findIndex((b) => w <= b.max)]
  };
}

export function currency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'NPR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
