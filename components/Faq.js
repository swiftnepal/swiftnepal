'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'What items are prohibited from shipping?',
    a: 'Flammable liquids, explosives, firearms, narcotics and counterfeit goods are strictly prohibited. Certain perishables and lithium batteries ship under restricted rules. Review our full prohibited-items list before booking.'
  },
  {
    q: 'How do I claim insurance for a damaged parcel?',
    a: "File a claim within 7 days of delivery via your Swift Nepal dashboard. You'll need your tracking number, a description of the damage and photographs. Approved claims are paid within 5–10 business days."
  },
  {
    q: 'How accurate is the delivery estimate?',
    a: "Our estimates are within 98.7% accuracy, refreshed live from the courier network. Weather, customs and remote addresses can shift the window by up to 24 hours — you'll be notified of any change."
  },
  {
    q: 'Can I change the delivery address after shipping?',
    a: "Yes — free of charge before the parcel is dispatched, and for a small reroute fee while in transit. Contact support or update it from the tracking page as long as the parcel hasn't reached the final delivery depot."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section faq" id="faq">
      <div className="container faq-container">
        <header className="section-head">
          <p className="eyebrow">Help Center</p>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about shipping with Swift Nepal.</p>
        </header>

        <div className="accordion">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={index} className={`accordion-item${isOpen ? ' is-open' : ''}`}>
                <h3 className="accordion-heading">
                  <button
                    className="accordion-btn"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index + 1}`}
                    id={`faq-btn-${index + 1}`}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.q}</span>
                    <svg
                      className="accordion-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                </h3>
                <div
                  className="accordion-panel"
                  id={`faq-panel-${index + 1}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index + 1}`}
                  style={isOpen ? { maxHeight: '300px' } : undefined}
                >
                  <p>{item.a}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
