'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLang } from '@/context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const nav = t.nav;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const NAV_LINKS = [
    { label: nav.capabilities, href: '#capabilities' },
    { label: nav.products,     href: '#products' },
    { label: nav.supplyChain,  href: '#supply-chain' },
    { label: nav.contact,      href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#DDD5C8] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navigasi utama"
      >
        <a
          href="#"
          className="font-heading text-xl font-bold tracking-widest text-[#1C1710] hover:text-[#2D5A3D] transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
          aria-label="PT Nawaterra Indo Global, kembali ke atas"
        >
          NAWATERRA
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#6B5E4E] hover:text-[#1C1710] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language toggle */}
          <div className="flex items-center gap-1 text-xs font-semibold tracking-widest" aria-label="Pilih bahasa">
            <button
              type="button"
              onClick={() => setLang('id')}
              className={`lang-toggle px-1.5 py-0.5 rounded ${lang === 'id' ? 'text-[#2D5A3D]' : 'text-[#9A8E80] hover:text-[#6B5E4E]'}`}
              aria-pressed={lang === 'id'}
              aria-label="Bahasa Indonesia"
            >
              ID
            </button>
            <span className="text-[#DDD5C8]" aria-hidden="true">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`lang-toggle px-1.5 py-0.5 rounded ${lang === 'en' ? 'text-[#2D5A3D]' : 'text-[#9A8E80] hover:text-[#6B5E4E]'}`}
              aria-pressed={lang === 'en'}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-[#2D5A3D] hover:bg-[#234A31] transition-colors rounded"
          >
            {nav.cta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          className="md:hidden p-2 rounded text-[#1C1710] hover:bg-[#F2EDE4] transition-colors"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#FAF7F2] border-t border-[#DDD5C8] px-6 pb-5 pt-3"
          role="navigation"
          aria-label="Menu navigasi mobile"
        >
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2.5 text-base font-medium text-[#1C1710] hover:text-[#2D5A3D] transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 pb-1 flex items-center gap-3">
              <span className="text-xs text-[#9A8E80] font-semibold tracking-widest">LANG:</span>
              <button
                type="button"
                onClick={() => setLang('id')}
                className={`lang-toggle text-sm font-semibold px-2 py-0.5 rounded ${lang === 'id' ? 'text-[#2D5A3D]' : 'text-[#9A8E80]'}`}
                aria-pressed={lang === 'id'}
              >
                ID
              </button>
              <span className="text-[#DDD5C8] text-xs" aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`lang-toggle text-sm font-semibold px-2 py-0.5 rounded ${lang === 'en' ? 'text-[#2D5A3D]' : 'text-[#9A8E80]'}`}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
            </li>
            <li className="pt-2">
              <a
                href="#contact"
                className="block w-full text-center py-2.5 text-sm font-semibold text-white bg-[#2D5A3D] hover:bg-[#234A31] transition-colors rounded"
                onClick={closeMenu}
              >
                {nav.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
