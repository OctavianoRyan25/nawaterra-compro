'use client';

import { useLang } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';

export default function AboutUs() {
  const { t } = useLang();
  const a = t.about;
  const b = t.buying;

  const [contentRef, contentIn] = useInView({ threshold: 0.15 });
  const [listRef, listIn] = useInView({ threshold: 0.1 });

  return (
    <section
      id="about"
      className="py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={contentRef} className={`reveal ${contentIn ? 'in-view' : ''}`}>
          <p
            className="section-rule text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-heading)' }}
          >
            {a.eyebrow}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-10 lg:gap-16 items-start">
            <div>
              <h2
                id="about-heading"
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
              >
                {a.heading}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                {a.body}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {a.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded border p-4"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  >
                    <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                      {stat.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded border p-6"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {a.trustTitle}
              </h3>
              <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {a.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 inline-block w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--accent-amber)' }}
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div ref={listRef} className={`reveal ${listIn ? 'in-view' : ''} mt-16`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded border p-6 md:p-8" style={{ backgroundColor: 'var(--bg-section)', borderColor: 'var(--border)' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {b.title}
              </h3>
              <div className="space-y-4">
                {b.paths.map((path) => (
                  <div key={path.title} className="rounded border bg-white p-4" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="text-base font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                        {path.title}
                      </h4>
                      <span
                        className="text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded border"
                        style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)', backgroundColor: '#EAF3EE' }}
                      >
                        {path.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {path.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded border p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                {a.qualityTitle}
              </h3>
              <div className="space-y-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {a.quality.map((item) => (
                  <div key={item.title} className="border-b pb-4 last:border-b-0 last:pb-0" style={{ borderColor: 'var(--border)' }}>
                    <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</div>
                    <div>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
