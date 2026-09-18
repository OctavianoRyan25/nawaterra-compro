'use client';

import { useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';

type CategoryKey = 'Kayu & Palet' | 'Agrikultur' | 'Mineral';
type FilterKey = 'all' | CategoryKey;

interface Product {
  id: string;
  name: string;
  grade: string;
  spec: string;
  application: string;
  category: CategoryKey;
}

const PRODUCTS: Product[] = [
  { id: 'wood-pallet-ht', name: 'Wood Pallet Heat Treated', grade: 'ISPM-15 Compliant', spec: '1200×1000mm | MC ≤18% | Load 1.5T', application: 'Export logistics, warehousing, FMCG distribution', category: 'Kayu & Palet' },
  { id: 'timber-kiln-dried', name: 'Kayu Olahan Kiln-Dried', grade: 'Grade A / Grade B', spec: 'MC 8–12% | Sengon/Pinus | Custom dim.', application: 'Light construction, furniture, export crating', category: 'Kayu & Palet' },
  { id: 'cpo', name: 'Crude Palm Oil (CPO)', grade: 'Standard Grade', spec: 'FFA ≤5% | Moisture ≤0.25% | DOBI ≥2.5', application: 'Food industry, oleochemical, biodiesel', category: 'Agrikultur' },
  { id: 'robusta-coffee', name: 'Robusta Green Coffee', grade: 'Grade 1 / Grade 2', spec: 'Defect ≤11 | MC 12–13% | Screen 16+', application: 'Roastery, industrial blending, commodity export', category: 'Agrikultur' },
  { id: 'cassia', name: 'Cassia / Cinnamon', grade: 'ASTA / FAQ Grade', spec: 'Oil ≥1.5% | MC ≤13% | Broken ≤5%', application: 'Spice industry, pharma, functional beverage', category: 'Agrikultur' },
  { id: 'coconut-charcoal', name: 'Coconut Shell Charcoal', grade: 'Briquette / Activation Grade', spec: 'FC ≥78% | Ash ≤4% | VM ≤18% | MC ≤5%', application: 'BBQ briquette, activated carbon precursor', category: 'Agrikultur' },
  { id: 'zeolite', name: 'Zeolite Alam', grade: 'Feed / Industrial Grade', spec: 'Clinoptilolite ≥60% | Mesh 10–60 | MC ≤10%', application: 'Animal feed, water treatment, agriculture', category: 'Mineral' },
  { id: 'bentonite', name: 'Bentonite Clay', grade: 'Drilling / Foundry Grade', spec: 'Swelling ≥12ml/2g | MC 10–14% | 325 Mesh', application: 'Drilling, metal casting, beverage clarification', category: 'Mineral' },
];

const PRODUCT_OPTIONS_ID = ['Wood Pallet Heat Treated', 'Kayu Olahan Kiln-Dried', 'Crude Palm Oil (CPO)', 'Robusta Green Coffee', 'Cassia / Kayu Manis', 'Coconut Shell Charcoal', 'Zeolite Alam', 'Bentonite Clay', 'Produk lainnya / Belum ditentukan'];
const PRODUCT_OPTIONS_EN = ['Wood Pallet Heat Treated', 'Kiln-Dried Timber', 'Crude Palm Oil (CPO)', 'Robusta Green Coffee', 'Cassia / Cinnamon', 'Coconut Shell Charcoal', 'Natural Zeolite', 'Bentonite Clay', 'Other / Not yet determined'];

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface InquiryModalProps {
  product: Product;
  onClose: () => void;
}

function InquiryModal({ product, onClose }: InquiryModalProps) {
  const { lang, t } = useLang();
  const m = t.products.modal;
  const [form, setForm] = useState({ company: '', name: '', email: '', qty: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [state, setState] = useState<FormState>('idle');

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.company.trim()) e.company = m.required;
    if (!form.name.trim()) e.name = m.required;
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = m.emailInvalid;
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setState('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setState('success');
  };

  const PRODUCT_OPTIONS = lang === 'id' ? PRODUCT_OPTIONS_ID : PRODUCT_OPTIONS_EN;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-[#1C1710]/40" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md rounded border shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 id="modal-title" className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {m.title}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{product.name}</p>
          <button type="button" className="absolute top-4 right-4 p-1.5 rounded hover:bg-[#F2EDE4] transition-colors" onClick={onClose} aria-label={m.closeLabel}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {state === 'success' ? (
          <div className="px-6 py-10 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EAF3EE' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-semibold text-lg mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{m.successTitle}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{m.successBody}</p>
            <button type="button" className="mt-6 px-5 py-2.5 text-sm font-semibold text-white rounded transition-colors" style={{ backgroundColor: 'var(--accent-green)' }} onClick={onClose}>
              {m.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 py-5 flex flex-col gap-4">
            {state === 'error' && (
              <div className="px-4 py-3 rounded text-sm border" style={{ backgroundColor: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' }} role="alert">
                {m.errorMsg}
              </div>
            )}
            {([ { id: 'company' as const, label: m.company, ph: m.companyPH, type: 'text' }, { id: 'name' as const, label: m.name, ph: m.namePH, type: 'text' }, { id: 'email' as const, label: m.email, ph: m.emailPH, type: 'email' }, { id: 'qty' as const, label: m.qty, ph: m.qtyPH, type: 'text' } ]).map(({ id, label, ph, type }) => (
              <div key={id} className="flex flex-col gap-1">
                <label htmlFor={`inquiry-${id}`} className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{label}</label>
                <input
                  id={`inquiry-${id}`} type={type} placeholder={ph} value={form[id]}
                  onChange={(e) => { setForm((f) => ({ ...f, [id]: e.target.value })); setErrors((er) => ({ ...er, [id]: undefined })); }}
                  className="px-3 py-2.5 text-sm rounded border outline-none"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: errors[id] ? '#EF4444' : 'var(--border)', color: 'var(--text-primary)' }}
                  aria-describedby={errors[id] ? `modal-err-${id}` : undefined} aria-invalid={!!errors[id]}
                />
                {errors[id] && <span id={`modal-err-${id}`} className="text-xs" style={{ color: '#DC2626' }} role="alert">{errors[id]}</span>}
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label htmlFor="inquiry-message" className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{m.note}</label>
              <textarea id="inquiry-message" rows={3} placeholder={m.notePH} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="px-3 py-2.5 text-sm rounded border outline-none resize-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
            <button type="submit" disabled={state === 'loading'} className="mt-1 w-full py-3 text-sm font-semibold text-white rounded transition-colors disabled:opacity-60 disabled:cursor-not-allowed" style={{ backgroundColor: 'var(--accent-green)' }}>
              {state === 'loading' ? m.submitting : m.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Products() {
  const { t } = useLang();
  const p = t.products;

  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [headerRef, headerIn] = useInView();
  const [gridRef, gridIn] = useInView({ threshold: 0.05 });

  const filtered = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter((pr) => pr.category === activeFilter);

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: 'all', label: p.filterAll },
    { key: 'Kayu & Palet', label: p.categoryLabels['Kayu & Palet'] },
    { key: 'Agrikultur', label: p.categoryLabels['Agrikultur'] },
    { key: 'Mineral', label: p.categoryLabels['Mineral'] },
  ];

  return (
    <section id="products" className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg-base)' }} aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div ref={headerRef} className={`reveal ${headerIn ? 'in-view' : ''} flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12`}>
          <div className="max-w-lg">
            <h2 id="products-heading" className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {p.heading}
            </h2>
            <p className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{p.disclaimer}</p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori produk">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                role="tab"
                aria-selected={activeFilter === key}
                onClick={() => setActiveFilter(key)}
                className="px-4 py-1.5 text-sm font-medium rounded border transition-colors"
                style={{
                  backgroundColor: activeFilter === key ? 'var(--accent-green)' : 'transparent',
                  color: activeFilter === key ? '#ffffff' : 'var(--text-secondary)',
                  borderColor: activeFilter === key ? 'var(--accent-green)' : 'var(--border)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" role="tabpanel" aria-label={`Produk: ${activeFilter}`}>
          {filtered.map((product, idx) => (
            <article
              key={product.id}
              className={`reveal ${gridIn ? 'in-view' : ''} flex flex-col justify-between rounded border p-5 transition-shadow hover:shadow-md`}
              style={{ '--reveal-delay': `${idx * 60}ms`, backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' } as React.CSSProperties}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                    {product.name}
                  </h3>
                  <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded border" style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)', backgroundColor: '#EAF3EE', fontFamily: 'var(--font-mono)' }}>
                    {product.grade}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {product.spec}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{product.application}</p>
              </div>

              <button
                type="button"
                className="mt-5 w-full py-2.5 text-sm font-semibold rounded border transition-colors"
                style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EAF3EE'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
                onClick={() => setSelectedProduct(product)}
                aria-label={`${p.requestQuote}: ${product.name}`}
              >
                {p.requestQuote}
              </button>
            </article>
          ))}
        </div>
      </div>

      {selectedProduct && <InquiryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  );
}
