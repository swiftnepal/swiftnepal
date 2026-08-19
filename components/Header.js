'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { href: '#home', path: '/', id: 'home', label: 'Home' },
  { href: '#services', path: '/services', id: 'services', label: 'Services' },
  { href: '#calculator', path: '/calculator', id: 'calculator', label: 'Rate Calculator' },
  { href: '#tracking', path: '/tracking', id: 'tracking', label: 'Track Order' },
  { href: '#contact', path: '/contact', id: 'contact', label: 'Contact' }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Scroll to hash section on page load, accounting for sticky header
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    const section = document.getElementById(id);
    if (!section) return;

    requestAnimationFrame(() => {
      const headerH = document.getElementById('site-header')?.offsetHeight || 0;
      const top = section.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }, []);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onDocClick = (e) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
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

  const handleNavClick = (e, link) => {
    e.preventDefault();

    const section = document.getElementById(link.id);

    if (section) {
      const headerH = document.getElementById('site-header')?.offsetHeight || 0;
      const top = section.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });

      window.history.replaceState({}, '', link.path);
    }

    setOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled ? ' is-scrolled' : ''}`}
      id="site-header"
    >
      <div className="container nav-wrap">

        {/* Logo */}
        <Link
          className="brand"
          href="/"
          onClick={(e) =>
            handleNavClick(e, {
              href: '#home',
              path: '/',
              id: 'home',
              label: 'Home',
            })
          }
          aria-label="Swift Nepal Courier home"
        >
            <img src="/assets/stamp1.jpg" alt="Swift Nepal Courier logo" className="logo" />

          {/* <span className="brand-name">
            Swift Nepal<span> Courier</span>
          </span> */}
        </Link>

        {/* Navigation */}
        <nav
          className={`main-nav${open ? ' is-open' : ''}`}
          id="main-nav"
          aria-label="Primary navigation"
        >
          <ul className="nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  className="nav-link"
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Schedule Pickup */}
          <Link
            className="btn btn-primary btn-nav"
            href="#pickup"
            onClick={(e) =>
              handleNavClick(e, {
                href: '#pickup',
                path: '/pickup',
                id: 'pickup',
                label: 'Schedule Pickup',
              })
            }
          >
            Schedule Pickup
          </Link>
        </nav>

        {/* Mobile Menu Button */}
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