export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Why choose Swift Nepal">
      <div className="container trust-list">
        <div className="trust-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          <div>
            <strong>24/7 Live Tracking</strong>
            <span>Real-time visibility everywhere</span>
          </div>
        </div>
        <div className="trust-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          <div>
            <strong>Insured Shipments</strong>
            <span>Up to $25,000 protection</span>
          </div>
        </div>
        <div className="trust-item">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 8l-9 5-9-5 9-5 9 5z" />
            <path d="M3 8v8l9 5 9-5V8" />
            <path d="M12 13v8" />
          </svg>
          <div>
            <strong>Eco-Conscious</strong>
            <span>Carbon-neutral delivery fleet</span>
          </div>
        </div>
      </div>
    </section>
  );
}
