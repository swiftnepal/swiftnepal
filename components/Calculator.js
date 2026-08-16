'use client';

import { useRef, useState } from 'react';
import { RATE_GROUPS, calculate, currency, getGroup } from '@/lib/rates';

export default function Calculator() {
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
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
      weight: parseFloat(weight)
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

            <button className="btn btn-primary btn-block" type="submit">
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
                <li>
                  <span>Per kg rate</span>
                  <strong>{result.quote.perKg ? currency(result.quote.perKg) : '—'}</strong>
                </li>
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
