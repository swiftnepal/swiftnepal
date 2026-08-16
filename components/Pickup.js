'use client';

import { useState } from 'react';
import { RATE_GROUPS, getGroup } from '@/lib/rates';

const PHONE_PATTERN = /^[0-9+\-\s]{7,15}$/;

export default function Pickup() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    weight: '',
    destination: '',
    notes: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [msg, setMsg] = useState(null); // { text, isError }
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [key]: false }));
  };

  const setFormMsg = (text, isError) => setMsg(text ? { text, isError } : null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormMsg(null, false);

    const name = form.name.trim();
    const phone = form.phone.trim();
    const address = form.address.trim();

    const errors = {};
    if (!name) errors.name = true;
    if (!PHONE_PATTERN.test(phone)) errors.phone = true;
    if (!address) errors.address = true;
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormMsg('Please fill in your name, a valid phone number and the pickup address.', true);
      return;
    }

    const destKey = form.destination;
    const destLabel = destKey ? getGroup(destKey)?.label || destKey : 'Not specified';

    setSending(true);
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pickup',
          name,
          phone,
          address,
          date: form.date,
          weight: form.weight,
          destination: destLabel,
          notes: form.notes.trim()
        })
      });
      const body = await response.json().catch(() => null);

      if (response.ok && body && body.ok) {
        setFormMsg('Pickup request sent! We\u2019ll call you within 15 minutes during working hours.', false);
        setForm({ name: '', phone: '', address: '', date: '', weight: '', destination: '', notes: '' });
      } else {
        setFormMsg(
          (body && body.error) || 'Could not send your request. Please try again or email us at swiftnepal8@gmail.com.',
          true
        );
      }
    } catch {
      setFormMsg('Could not reach the server. Please try again or email us at swiftnepal8@gmail.com.', true);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <h3 className="form-title">Book your pickup</h3>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pickup-name">Full Name</label>
          <input
            type="text"
            id="pickup-name"
            name="name"
            placeholder="e.g. Sita Sharma"
            autoComplete="name"
            required
            className={fieldErrors.name ? 'error' : ''}
            value={form.name}
            onChange={set('name')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickup-phone">Phone Number</label>
          <input
            type="tel"
            id="pickup-phone"
            name="phone"
            placeholder="e.g. 9841XXXXXX"
            autoComplete="tel"
            required
            className={fieldErrors.phone ? 'error' : ''}
            value={form.phone}
            onChange={set('phone')}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pickup-address">Pickup Address</label>
          <input
            type="text"
            id="pickup-address"
            name="address"
            placeholder="Street, ward, city"
            required
            className={fieldErrors.address ? 'error' : ''}
            value={form.address}
            onChange={set('address')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickup-date">Preferred Date</label>
          <input type="date" id="pickup-date" name="date" value={form.date} onChange={set('date')} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="pickup-weight">Approx. Weight (kg)</label>
          <input
            type="number"
            id="pickup-weight"
            name="weight"
            min="0.1"
            step="0.1"
            placeholder="e.g. 2.5"
            value={form.weight}
            onChange={set('weight')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickup-destination">Destination</label>
          <select id="pickup-destination" name="destination" value={form.destination} onChange={set('destination')}>
            <option value="">Select destination…</option>
            {RATE_GROUPS.map((group) => (
              <option key={group.key} value={group.key}>
                {group.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="pickup-notes">Notes (optional)</label>
        <textarea
          id="pickup-notes"
          name="notes"
          rows="3"
          placeholder="Fragile items, instructions for the rider…"
          value={form.notes}
          onChange={set('notes')}
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Request Pickup'}
      </button>
      <p className={`form-msg${msg?.isError ? ' is-error' : ''}`} role="status" aria-live="polite">
        {msg ? msg.text : ''}
      </p>
    </form>
  );
}
