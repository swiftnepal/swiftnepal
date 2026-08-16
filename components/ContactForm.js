'use client';

import { useState } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUBJECTS = [
  { value: 'general', label: 'General inquiry' },
  { value: 'quote', label: 'Get a quote' },
  { value: 'pickup', label: 'Schedule a pickup' },
  { value: 'tracking', label: 'Tracking help' },
  { value: 'claim', label: 'File a claim' }
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });
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
    const email = form.email.trim();
    const message = form.message.trim();

    const errors = {};
    if (!name) errors.name = true;
    if (!EMAIL_PATTERN.test(email)) errors.email = true;
    if (!message) errors.message = true;
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormMsg('Please complete all required fields and use a valid email address.', true);
      return;
    }

    const subject = SUBJECTS.find((s) => s.value === form.subject)?.label || 'General inquiry';

    setSending(true);
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', name, email, subject, message })
      });
      const body = await response.json().catch(() => null);

      if (response.ok && body && body.ok) {
        setFormMsg('Message sent — thank you! We\u2019ll get back to you within one working day.', false);
        setForm({ name: '', email: '', subject: 'general', message: '' });
      } else {
        setFormMsg(
          (body && body.error) || 'Could not send your message. Please try again or email us at swiftnepal8@gmail.com.',
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
      <h3 className="form-title">Send us a message</h3>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-name">Name</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
            className={fieldErrors.name ? 'error' : ''}
            value={form.name}
            onChange={set('name')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className={fieldErrors.email ? 'error' : ''}
            value={form.email}
            onChange={set('email')}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject">Subject</label>
        <select id="contact-subject" name="subject" value={form.subject} onChange={set('subject')}>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          placeholder="How can we help?"
          required
          className={fieldErrors.message ? 'error' : ''}
          value={form.message}
          onChange={set('message')}
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send Message'}
      </button>
      <p className={`form-msg${msg?.isError ? ' is-error' : ''}`} role="status" aria-live="polite">
        {msg ? msg.text : ''}
      </p>
    </form>
  );
}
