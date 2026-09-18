'use client';

import { useLang } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';

export default function SupplyChain() {
  const { t } = useLang();
  const s = t.supplyChain;

  const [leftRef, leftIn] = useInView({ threshold: 0.15 });
  const [rightRef, rightIn] = useInView({ threshold: 0.05 });

  return (
    <section
      id="supply-chain"
      className="py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-section)' }}
      aria-labelledby="supply-chain-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <div ref={leftRef} className={`reveal ${leftIn ? 'in-view' : ''}`}>
            <p
              className="section-rule text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-heading)' }}
            >
              {s.eyebrow}
            </p>
            <h2
              id="supply-chain-heading"
              className="text-4xl md:text-5xl font-bold leading-tight mb-8"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
            >
              {s.h2line1}
              <br />
              {s.h2line2}
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
              {s.body}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: 'var(--accent-green)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent-green-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent-green)'; }}
            >
              {s.cta}
            </a>
          </div>

          {/* Right: staggered cards */}
          <div ref={rightRef} className="flex flex-col gap-6">
            {s.points.map((point, idx) => (
              <div
                key={idx}
                className={`reveal ${rightIn ? 'in-view' : ''} flex gap-5 p-5 rounded border`}
                style={{
                  '--reveal-delay': `${idx * 80}ms`,
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                } as React.CSSProperties}
              >
                <div className="flex-shrink-0 mt-1">
                  <div
                    className="w-2 h-2 rounded-full mt-1"
                    style={{ backgroundColor: idx === 0 ? 'var(--accent-amber)' : 'var(--border-strong)' }}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3
                    className="text-base font-bold mb-1.5"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                  >
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
