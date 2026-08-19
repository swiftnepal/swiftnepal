import Newsletter from './Newsletter';

function BrandIcon() {
  return (
    <img src="/assets/stamp1.png" alt="Swift Nepal Courier logo" className="logo" />
  );
}

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

const QUICK_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#calculator', label: 'Rate Calculator' },
  { href: '#pickup', label: 'Schedule Pickup' },
  { href: '#tracking', label: 'Track Order' },
  { href: '#contact', label: 'Contact' }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand brand-footer" href="#home" aria-label="Swift Nepal home">
            <span className="brand-icon" aria-hidden="true">
              <BrandIcon />
            </span>
            <span className="brand-name">
              Swift Nepal<span> Courier</span>
            </span>
          </a>
          <p>
            Nepal's trusted courier partner — fast, insured and tracked domestic &amp; international deliveries,
            serving customers since 2009.
          </p>
        </div>

        <nav className="footer-col" aria-label="Quick links">
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h4>Customer Support</h4>
          <ul className="contact-list">
            <li>
              <PhoneIcon />
              <div>
                <a href="tel:+9779841189110">9841189110</a>
                <span aria-hidden="true">&nbsp;|&nbsp;</span>
                <a href="tel:+9779866116999">9866116999</a>
              </div>
            </li>
            <li>
              <MailIcon />
              <a href="mailto:swiftnepal8@gmail.com">swiftnepal8@gmail.com</a>
            </li>
            <li>
              <PinIcon />
              <a href="https://maps.app.goo.gl/7eSDkUjVp8L2VgZ66" target="_blank" rel="noopener noreferrer">
                Khairahani-06, Parsa, Chitwan, Bagamati Province, Nepal 44200
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Working Hours</h4>
          <ul className="hours-list">
            <li>
              <span>Sun – Fri</span>
              <strong>9:00 AM – 6:00 PM</strong>
            </li>
            <li>
              <span>Saturday</span>
              <strong>Closed</strong>
            </li>
          </ul>

          <h4 className="newsletter-title">Newsletter</h4>
          <Newsletter />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Swift Nepal. All rights reserved.</p>
          <ul className="footer-legal">
            <li>
              <a href="#home">Privacy Policy</a>
            </li>
            <li>
              <a href="#home">Terms of Service</a>
            </li>
            <li>
              <a href="#home">Cookie Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
