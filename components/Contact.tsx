'use client';

import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface ContactForm {
  name: string;
  company: string;
  email: string;
  product: string;
  message: string;
}

const PRODUCT_OPTIONS_ID = ['Wood Pallet Heat Treated', 'Kayu Olahan Kiln-Dried', 'Crude Palm Oil (CPO)', 'Robusta Green Coffee', 'Cassia / Kayu Manis', 'Coconut Shell Charcoal', 'Zeolite Alam', 'Bentonite Clay', 'Produk lainnya / Belum ditentukan'];
const PRODUCT_OPTIONS_EN = ['Wood Pallet Heat Treated', 'Kiln-Dried Timber', 'Crude Palm Oil (CPO)', 'Robusta Green Coffee', 'Cassia / Cinnamon', 'Coconut Shell Charcoal', 'Natural Zeolite', 'Bentonite Clay', 'Other / Not yet determined'];

export default function Contact() {
  const { lang, t } = useLang();
  const c = t.contact;
  const f = t.footer;

  const [form, setForm] = useState<ContactForm>({ name: '', company: '', email: '', product: '', message: '' });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [state, setState] = useState<FormState>('idle');

  const [leftRef, leftIn] = useInView({ threshold: 0.1 });
  const [formRef, formIn] = useInView({ threshold: 0.1 });

  const PRODUCT_OPTIONS = lang === 'id' ? PRODUCT_OPTIONS_ID : PRODUCT_OPTIONS_EN;

  const validate = (): Partial<ContactForm> => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = c.required;
    if (!form.company.trim()) e.company = c.required;
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = c.emailInvalid;
    if (!form.message.trim()) e.message = c.required;
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setState('loading');
    try {
      const subject = encodeURIComponent(`B2B Inquiry: ${form.product || 'General'} — ${form.company}`);
      const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nProduct: ${form.product}\n\n${form.message}`);
      window.location.href = `mailto:info@nawaterraindoglobal.com?subject=${subject}&body=${body}`;
      await new Promise((r) => setTimeout(r, 800));
      setState('success');
    } catch {
      setState('error');
    }
  };

  const inputStyle = (field: keyof ContactForm) => ({
    backgroundColor: 'var(--bg-base)',
    borderColor: errors[field] ? '#EF4444' : 'var(--border)',
    color: 'var(--text-primary)',
  });

  const formFields = [
    { id: 'name' as const, label: c.name, ph: c.namePH, type: 'text', required: true },
    { id: 'company' as const, label: c.company, ph: c.companyPH, type: 'text', required: true },
    { id: 'email' as const, label: c.email, ph: c.emailPH, type: 'email', required: true },
  ];

  return (
    <>
      <section
        id="contact"
        className="py-24 md:py-32"
        style={{ backgroundColor: 'var(--bg-base)' }}
        aria-labelledby="contact-heading"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div ref={leftRef} className={`reveal ${leftIn ? 'in-view' : ''}`}>
              <h2
                id="contact-heading"
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
              >
                {c.heading}
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                {c.body}
              </p>

              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                    label: 'Email',
                    value: 'info@nawaterraindoglobal.com',
                    href: 'mailto:info@nawaterraindoglobal.com',
                  },
                  {
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ),
                    label: 'Website',
                    value: 'nawaterraindoglobal.com',
                    href: 'https://nawaterraindoglobal.com',
                  },
                ].map(({ icon, label, value, href }) => (
                  <a key={label} href={href} className="inline-flex items-center gap-3 group" style={{ color: 'var(--text-secondary)' }}>
                    <span className="flex-shrink-0 p-2 rounded border transition-colors group-hover:border-[#2D5A3D]" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                      {icon}
                    </span>
                    <span className="text-sm group-hover:text-[#2D5A3D] transition-colors">{value}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div
              ref={formRef}
              className={`reveal ${formIn ? 'in-view' : ''} rounded border p-8`}
              style={{ '--reveal-delay': '120ms', backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' } as React.CSSProperties}
            >
              {state === 'success' ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#EAF3EE' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{c.successTitle}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.successBody}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {state === 'error' && (
                    <div className="px-4 py-3 rounded text-sm border" style={{ backgroundColor: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' }} role="alert">
                      {c.errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {formFields.slice(0, 2).map(({ id, label, ph, type, required }) => (
                      <div key={id} className="flex flex-col gap-1.5">
                        <label htmlFor={`contact-${id}`} className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                          {label} {required && <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>}
                        </label>
                        <input
                          id={`contact-${id}`} type={type} placeholder={ph} value={form[id]}
                          onChange={(e) => { setForm((f) => ({ ...f, [id]: e.target.value })); setErrors((er) => ({ ...er, [id]: undefined })); }}
                          className="px-3 py-2.5 text-sm rounded border outline-none"
                          style={inputStyle(id)} aria-describedby={errors[id] ? `err-${id}` : undefined} aria-invalid={!!errors[id]} aria-required={required}
                        />
                        {errors[id] && <span id={`err-${id}`} className="text-xs" style={{ color: '#DC2626' }} role="alert">{errors[id]}</span>}
                      </div>
                    ))}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                      {c.email} <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      id="contact-email" type="email" placeholder={c.emailPH} value={form.email}
                      onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: undefined })); }}
                      className="px-3 py-2.5 text-sm rounded border outline-none"
                      style={inputStyle('email')} aria-describedby={errors.email ? 'err-email' : undefined} aria-invalid={!!errors.email} aria-required="true"
                    />
                    {errors.email && <span id="err-email" className="text-xs" style={{ color: '#DC2626' }} role="alert">{errors.email}</span>}
                  </div>

                  {/* Product select */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-product" className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                      {c.product}
                    </label>
                    <select
                      id="contact-product" value={form.product}
                      onChange={(e) => setForm((f) => ({ ...f, product: e.target.value }))}
                      className="px-3 py-2.5 text-sm rounded border outline-none"
                      style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: form.product ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      <option value="">{c.productPH}</option>
                      {PRODUCT_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                      {c.message} <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message" rows={4} placeholder={c.messagePH} value={form.message}
                      onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: undefined })); }}
                      className="px-3 py-2.5 text-sm rounded border outline-none resize-none"
                      style={inputStyle('message')} aria-describedby={errors.message ? 'err-message' : undefined} aria-invalid={!!errors.message} aria-required="true"
                    />
                    {errors.message && <span id="err-message" className="text-xs" style={{ color: '#DC2626' }} role="alert">{errors.message}</span>}
                  </div>

                  <button
                    type="submit" id="contact-submit" disabled={state === 'loading'}
                    className="w-full py-3.5 text-sm font-semibold text-white rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: 'var(--accent-green)' }}
                  >
                    {state === 'loading' ? c.submitting : c.submit}
                  </button>

                  <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>{c.responseTime}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10" style={{ backgroundColor: 'var(--bg-section)', borderColor: 'var(--border)' }} role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-lg font-bold tracking-widest mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                NAWATERRA
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>PT Nawaterra Indo Global</p>
            </div>
            <a href="https://nawaterraindoglobal.com" className="text-sm hover:text-[#2D5A3D] transition-colors" style={{ color: 'var(--text-secondary)' }}>
              nawaterraindoglobal.com
            </a>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              &copy; {new Date().getFullYear()} PT Nawaterra Indo Global. {f.rights}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
