'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


const navLinks = [
  { href: '/', label: 'მთავარი' },
  { href: '/movies', label: 'ფილმები' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(5, 5, 10, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212, 169, 48, 0.12)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ლოგო */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.6rem',
                fontWeight: 600,
                color: '#d4a930',
                letterSpacing: '0.02em',
                lineHeight: 1,
              }}
            >
              ✦ კინო
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? '#d4a930' : '#8a8598',
                    borderBottom: isActive ? '1px solid #d4a930' : '1px solid transparent',
                    paddingBottom: '2px',
                    transition: 'color 0.3s, border-color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = '#f0ece0';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLElement).style.color = '#8a8598';
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>


          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="მენიუ"
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#d4a930',
                transition: 'transform 0.3s',
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#d4a930',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: '#d4a930',
                transition: 'transform 0.3s',
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>


        {menuOpen && (
          <div
            style={{
              borderTop: '1px solid rgba(212,169,48,0.12)',
              paddingTop: '1rem',
              paddingBottom: '1rem',
            }}
            className="md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: pathname === link.href ? '#d4a930' : '#8a8598',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
