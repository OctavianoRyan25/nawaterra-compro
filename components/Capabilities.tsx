'use client';

import { useLang } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';

export default function Capabilities() {
  const { t } = useLang();
  const c = t.capabilities;

  const [headerRef, headerIn] = useInView();
  const [stagesRef, stagesIn] = useInView({ threshold: 0.1 });

  return (
    <section
      id="capabilities"
      className="py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-section)' }}
      aria-labelledby="capabilities-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`reveal ${headerIn ? 'in-view' : ''} mb-16 max-w-xl`}
        >
          <p
            className="section-rule text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-heading)' }}
          >
            {c.eyebrow}
          </p>
          <h2
            id="capabilities-heading"
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            {c.h2line1}
            <br />
            {c.h2line2}
          </h2>
        </div>

        {/* 4-stage flow with staggered entry */}
        <div ref={stagesRef} className="relative">
          <div
            className="hidden lg:block absolute top-9 left-0 right-0 h-px"
            style={{ backgroundColor: 'var(--border)' }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {c.stages.map((stage, idx) => (
              <div
                key={idx}
                className={`reveal ${stagesIn ? 'in-view' : ''} relative flex flex-col gap-5`}
                style={{ '--reveal-delay': `${idx * 90}ms` } as React.CSSProperties}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: idx === 0 ? 'var(--accent-amber)' : 'var(--border-strong)',
                    }}
                    aria-hidden="true"
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: idx === 0 ? 'var(--accent-amber)' : 'var(--border-strong)' }}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3
                    className="text-lg font-bold mb-2 leading-snug"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {stage.desc}
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
