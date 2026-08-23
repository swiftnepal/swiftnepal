'use client';

import { useRef, useState } from 'react';
import { RATE_GROUPS, calculate, currency, getGroup } from '@/lib/rates';

export default function Calculator() {
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [vat, setVat] = useState('');
  const [tax, setTax] = useState('');
  const [packingCharge, setPackingCharge] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [msg, setMsg] = useState(null); // { text, isError }
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const setCalcMsg = (text, isError) => setMsg(text ? { text, isError } : null);

  const onSubmit = (e) => {
    e.preventDefault();
    setCalcMsg(null, false);

    const data = {
      origin: 'Nepal',
      destination,
      weight: parseFloat(weight),
      serviceCharge: parseFloat(serviceCharge) || 0,
      vat: parseFloat(vat) || 0,
      tax: parseFloat(tax) || 0,
      packingCharge: parseFloat(packingCharge) || 0,
      deliveryCharge: parseFloat(deliveryCharge) || 0
    };

    const errors = {};
    if (!data.destination) errors.destination = true;
    if (!data.weight || data.weight <= 0) errors.weight = true;
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    const quote = calculate(data);
    if (quote.error) {
      setCalcMsg(quote.error, true);
      return;
    }
    setResult({ quote, data });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  };

  const destLabel = destination ? getGroup(destination)?.label || destination : '—';

  return (
    <section className="section calculator" id="calculator">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Instant Quote</p>
          <h2>Shipping Cost Calculator</h2>
          <p>Transparent rates from Nepal in Nepalese Rupees (NPR) — calculated instantly, no sign-up required.</p>
        </header>

        <div className="calc-layout">
          <form className="calc-form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="origin">Origin (Country)</label>
                <input type="text" id="origin" name="origin" value="Nepal" readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <select
                  id="destination"
                  name="destination"
                  required
                  className={fieldErrors.destination ? 'error' : ''}
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, destination: false }));
                  }}
                >
                  <option value="">Select destination…</option>
                  {RATE_GROUPS.map((group) => (
                    <option key={group.key} value={group.key}>
                      {group.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="weight">Package Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  min="0.1"
                  step="0.1"
                  placeholder="e.g. 5"
                  required
                  className={fieldErrors.weight ? 'error' : ''}
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, weight: false }));
                  }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="serviceCharge">Service Charge (NPR)</label>
                <input
                  type="number"
                  id="serviceCharge"
                  name="serviceCharge"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={serviceCharge}
                  onChange={(e) => setServiceCharge(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vat">VAT (NPR)</label>
                <input
                  type="number"
                  id="vat"
                  name="vat"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={vat}
                  onChange={(e) => setVat(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tax">Tax (NPR)</label>
                <input
                  type="number"
                  id="tax"
                  name="tax"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="packingCharge">Packing Charge (NPR)</label>
                <input
                  type="number"
                  id="packingCharge"
                  name="packingCharge"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={packingCharge}
                  onChange={(e) => setPackingCharge(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deliveryCharge">Delivery / Pickup Charge (NPR)</label>
                <input
                  type="number"
                  id="deliveryCharge"
                  name="deliveryCharge"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={deliveryCharge}
                  onChange={(e) => setDeliveryCharge(e.target.value)}
                />
              </div>
            </div>

            < button className="btn btn-primary btn-block" type="submit" style={{
    marginTop: "10px",
    width: "100%",
  }} >
              Calculate Price
            </button>
            <p className={`calc-msg${msg?.isError ? ' is-error' : ''}`} role="status" aria-live="polite">
              {msg ? msg.text : ''}
            </p>
          </form>

          {result && (
            <aside
              ref={resultRef}
              className="calc-result"
              role="region"
              aria-live="polite"
              aria-label="Cost estimate result"
            >
              <div className="result-summary">
                <p className="result-label">Estimated Cost (NPR)</p>
                <p className="result-price">{currency(result.quote.total)}</p>
                <p className="result-route">Nepal → {destLabel}</p>
              </div>
              <ul className="result-details">
                <li>
                  <span>Destination</span>
                  <strong>{destLabel}</strong>
                </li>
                <li>
                  <span>Weight</span>
                  <strong>{result.quote.weight} kg</strong>
                </li>
                <li>
                  <span>Rate basis</span>
                  <strong>{result.quote.basis}</strong>
                </li>
                {result.quote.perKg != null && (
                  <li>
                    <span>Per kg rate</span>
                    <strong>{currency(result.quote.perKg)} / kg</strong>
                  </li>
                )}
                <li>
                  <span>Shipping cost</span>
                  <strong>{currency(result.quote.shippingCost)}</strong>
                </li>
                {result.quote.serviceCharge > 0 && (
                  <li>
                    <span>Service charge</span>
                    <strong>{currency(result.quote.serviceCharge)}</strong>
                  </li>
                )}
                {result.quote.vat > 0 && (
                  <li>
                    <span>VAT</span>
                    <strong>{currency(result.quote.vat)}</strong>
                  </li>
                )}
                {result.quote.tax > 0 && (
                  <li>
                    <span>Tax</span>
                    <strong>{currency(result.quote.tax)}</strong>
                  </li>
                )}
                {result.quote.packingCharge > 0 && (
                  <li>
                    <span>Packing charge</span>
                    <strong>{currency(result.quote.packingCharge)}</strong>
                  </li>
                )}
                {result.quote.deliveryCharge > 0 && (
                  <li>
                    <span>Delivery / Pickup charge</span>
                    <strong>{currency(result.quote.deliveryCharge)}</strong>
                  </li>
                )}
                {result.quote.additionalTotal > 0 && (
                  <li className="result-divider">
                    <span>Total additional charges</span>
                    <strong>{currency(result.quote.additionalTotal)}</strong>
                  </li>
                )}
              </ul>
              <button
                className="btn btn-outline btn-block"
                type="button"
                onClick={() => document.getElementById('pickup')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book This Shipment
              </button>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
