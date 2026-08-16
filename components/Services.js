const SERVICES = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L4.5 10.5h5.5L11 2z" />
        <path d="M13.5 22L22 13.5h-5.5L13.5 22z" />
        <path d="M2 16h6" />
        <path d="M16 2h6" />
        <path d="M16 8h6" />
        <path d="M2 8h6" />
      </svg>
    ),
    title: 'Express Parcel',
    body: 'Same-day and next-day door-to-door courier for urgent documents and parcels across Nepal and worldwide.',
    href: '#calculator',
    cta: 'Get a quote',
    aria: 'Get a quote for Express Parcel'
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 8h20v12H2V8z" />
        <path d="M6 8V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" />
        <path d="M2 12h20" />
        <path d="M7 15h4" />
      </svg>
    ),
    title: 'Freight &amp; Cargo',
    body: 'Air, sea and land freight with full customs clearance and consolidated container shipping.',
    href: '#calculator',
    cta: 'Get a quote',
    aria: 'Get a quote for Freight and Cargo'
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <path d="M12 12l4-4" />
      </svg>
    ),
    title: 'Scheduled Pickup',
    body: 'Book recurring or one-off doorstep pickups in under 60 seconds — we come to you.',
    href: '#pickup',
    cta: 'Book pickup',
    aria: 'Schedule a doorstep pickup'
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21V9l6-4 6 4v12" />
        <path d="M15 13h6v8h-6" />
        <path d="M3 21h18" />
        <path d="M7 8h2" />
        <path d="M11 8h2" />
        <path d="M7 12h2" />
        <path d="M11 12h2" />
      </svg>
    ),
    title: 'Global Warehousing',
    body: 'Secure storage, pick &amp; pack, and inventory management across 45 strategic hubs.',
    href: '#contact',
    cta: 'Learn more',
    aria: 'Learn about Global Warehousing'
  }
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">What We Do</p>
          <h2>Shipping Services Built Around You</h2>
          <p>
            National and international courier &amp; freight — one partner for every mile, from a single envelope to
            full container loads.
          </p>
        </header>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <a className="card-link" href={service.href} aria-label={service.aria}>
                {service.cta}
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
