'use client';

import { useLang } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  const [eyebrowRef, eyebrowIn] = useInView({ threshold: 0.2 });
  const [headlineRef, headlineIn] = useInView({ threshold: 0.15 });
  const [bodyRef, bodyIn] = useInView({ threshold: 0.15 });
  const [ctaRef, ctaIn] = useInView({ threshold: 0.2 });

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
      aria-labelledby="hero-heading"
    >
      {/* Background structural lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(196,184,168,0.12) 79px, rgba(196,184,168,0.12) 80px)`,
        }}
      />

      {/* Identity motif instance 1/3: amber left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: 'var(--accent-amber)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className={`reveal ${eyebrowIn ? 'in-view' : ''}`}
            style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
          >
            <p
              className="section-rule text-xs font-semibold tracking-widest uppercase mb-8"
              style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-heading)' }}
            >
              {h.eyebrow}
            </p>
          </div>

          {/* Headline */}
          <div
            ref={headlineRef}
            className={`reveal ${headlineIn ? 'in-view' : ''}`}
            style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
          >
            <h1
              id="hero-heading"
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              {h.h1line1}
              <br />
              <span style={{ color: 'var(--accent-green)' }}>{h.h1line2}</span>
              <br />
              {h.h1line3}
            </h1>
          </div>

          {/* Body copy */}
          <div
            ref={bodyRef}
            className={`reveal ${bodyIn ? 'in-view' : ''}`}
            style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
          >
            <p
              className="text-base md:text-lg leading-relaxed max-w-xl mb-10"
              style={{ color: 'var(--text-secondary)' }}
            >
              {h.body}
            </p>
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className={`reveal ${ctaIn ? 'in-view' : ''} flex flex-col sm:flex-row gap-3`}
            style={{ '--reveal-delay': '240ms' } as React.CSSProperties}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: 'var(--accent-green)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent-green-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent-green)'; }}
            >
              {h.primaryCta}
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold rounded border transition-colors"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-strong)', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--bg-section)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; }}
            >
              {h.secondaryCta}
            </a>
          </div>
        </div>

        {/* Right panel: CSS-only structural graphic */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
          aria-hidden="true"
          style={{ width: '360px', height: '480px' }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute border rounded"
              style={{
                width: `${240 - i * 32}px`,
                height: `${360 - i * 40}px`,
                top: `${i * 20}px`,
                right: `${i * 20}px`,
                borderColor: i === 0 ? 'var(--accent-amber)' : i === 1 ? 'var(--accent-green)' : 'var(--border)',
                opacity: i === 0 ? 0.6 : i === 1 ? 0.4 : 0.18,
              }}
            />
          ))}
          <p
            className="absolute bottom-4 right-4 text-xs tracking-widest uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            {h.specLabel}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5" aria-hidden="true">
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
          {h.scroll}
        </span>
        <div className="w-px h-10 animate-pulse" style={{ backgroundColor: 'var(--accent-amber)' }} />
      </div>
    </section>
  );
}
