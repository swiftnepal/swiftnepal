'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#calculator', label: 'Rate Calculator' },
  { href: '#tracking', label: 'Track Order' },
  { href: '#contact', label: 'Contact' }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    // Close when clicking outside the header
    const onDocClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setOpen(false);
    };

    // Close on Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    // Restore scroll state if the viewport grows past the mobile breakpoint
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled ? ' is-scrolled' : ''}`}
      id="site-header"
    >
      <div className="container nav-wrap">
        <a className="brand" href="#home" aria-label="Swift Nepal Courier home">
          <span className="brand-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7l9-4 9 4-9 4-9-4z" />
              <path d="M3 7v10l9 4 9-4V7" />
              <path d="M12 11v10" />
              <path d="M6 9v6" />
              <path d="M18 9v6" />
            </svg>
          </span>
          <span className="brand-name">
            Swift<span>Nepal</span>
          </span>
        </a>

        <nav
          className={`main-nav${open ? ' is-open' : ''}`}
          id="main-nav"
          aria-label="Primary navigation"
        >
          <ul className="nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a className="nav-link" href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary btn-nav" href="#pickup" onClick={() => setOpen(false)}>
            Schedule Pickup
          </a>
        </nav>

        <button
          className="nav-toggle"
          id="nav-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" aria-hidden="true"></span>
          <span className="nav-toggle-bar" aria-hidden="true"></span>
          <span className="nav-toggle-bar" aria-hidden="true"></span>
        </button>
      </div>
    </header>
  );
}
