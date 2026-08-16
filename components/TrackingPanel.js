'use client';

import { useRef, useState } from 'react';

export default function TrackingPanel() {
  const [code, setCode] = useState('');
  const [inputError, setInputError] = useState(false);
  const inputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const value = code.trim();
    if (!value) {
      setInputError(true);
      inputRef.current?.focus();
      return;
    }
    window.location.href = `https://parcelsapp.com/en/tracking/${encodeURIComponent(value)}`;
  };

  return (
    <div className="track-box" id="tracking">
      <form className="track-form" onSubmit={onSubmit} noValidate>
        <label className="field-label" htmlFor="track-input">
          <svg
            className="label-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.6" />
          </svg>
          Quick Track Package
        </label>
        <div className="track-field">
          <input
            ref={inputRef}
            type="text"
            id="track-input"
            name="tracking"
            placeholder="Enter tracking code"
            autoComplete="off"
            aria-describedby="track-hint"
            style={inputError ? { borderColor: '#DC2626' } : undefined}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setInputError(false);
            }}
          />
          <button className="btn btn-primary" type="submit">
            Track Now
          </button>
        </div>
        <p className="field-hint" id="track-hint">
          Live carrier tracking via ParcelsApp — enter your real tracking number.
        </p>
      </form>
    </div>
  );
}
