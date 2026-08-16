import ContactForm from './ContactForm';

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.13.9.36 1.8.7 2.6a2 2 0 0 1-.45 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.45c.8.34 1.7.57 2.6.7A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function ClockIcon() {
  return (
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
  );
}

function MapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Get in Touch</p>
          <h2>Contact Swift Nepal</h2>
          <p>
            Questions about a shipment, a quote or a claim? Our team replies within one working day.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-info">
            <a className="contact-card" href="tel:+9779841189110">
              <PhoneIcon />
              <div>
                <strong>Phone</strong>
                <span>9841189110 &nbsp;|&nbsp; 9866116999</span>
              </div>
            </a>

            <a className="contact-card" href="mailto:swiftnepal8@gmail.com">
              <MailIcon />
              <div>
                <strong>Email</strong>
                <span>swiftnepal8@gmail.com</span>
              </div>
            </a>

            <div className="contact-card">
              <PinIcon />
              <div>
                <strong>Office</strong>
                <span>Khairahani-06, Parsa, Chitwan, Bagamati Province, Nepal 44200</span>
              </div>
            </div>

            <div className="contact-card">
              <ClockIcon />
              <div>
                <strong>Working Hours</strong>
                <span>Sun – Fri: 9:00 AM – 6:00 PM &nbsp;·&nbsp; Saturday closed</span>
              </div>
            </div>

            <a
              className="contact-card contact-card-map"
              href="https://maps.app.goo.gl/7eSDkUjVp8L2VgZ66"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapIcon />
              <div>
                <strong>Get Directions</strong>
                <span>Open in Google Maps</span>
              </div>
            </a>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
