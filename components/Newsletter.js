'use client';

import { useState } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null); // { text, isError }

  const onSubmit = (e) => {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setMsg({ text: 'Please enter a valid email address.', isError: true });
      return;
    }

    setMsg({ text: 'Thanks for subscribing — welcome aboard!', isError: false });
    setEmail('');
  };

  return (
    <form className="newsletter-form" onSubmit={onSubmit} noValidate>
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <div className="newsletter-field">
        <input
          type="email"
          id="newsletter-email"
          name="email"
          placeholder="Your email address"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMsg(null);
          }}
        />
        <button className="btn btn-primary" type="submit" aria-label="Subscribe to newsletter">
          Subscribe
        </button>
      </div>
      <p className={`newsletter-msg${msg?.isError ? ' is-error' : ''}`} role="status" aria-live="polite">
        {msg ? msg.text : ''}
      </p>
    </form>
  );
}
