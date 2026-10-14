'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { getProductsAsync, Product as BaseProduct, PRODUCTS as MOCK_PRODUCTS } from '@/lib/products';

type CategoryKey = 'Kayu & Palet' | 'Agrikultur' | 'Mineral';
type FilterKey = 'all' | CategoryKey;

const PRODUCT_OPTIONS_ID = [
  'Wood Pallet Heat Treated',
  'Kayu Olahan Kiln-Dried',
  'Crude Palm Oil (CPO)',
  'Robusta Green Coffee',
  'Cassia / Kayu Manis',
  'Coconut Shell Charcoal',
  'Zeolite Alam',
  'Bentonite Clay',
  'Produk lainnya / Belum ditentukan',
];

const PRODUCT_OPTIONS_EN = [
  'Wood Pallet Heat Treated',
  'Kiln-Dried Timber',
  'Crude Palm Oil (CPO)',
  'Robusta Green Coffee',
  'Cassia / Cinnamon',
  'Coconut Shell Charcoal',
  'Natural Zeolite',
  'Bentonite Clay',
  'Other / Not yet determined',
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface InquiryModalProps {
  product: BaseProduct;
  onClose: () => void;
}

function InquiryModal({ product, onClose }: InquiryModalProps) {
  const { lang, t } = useLang();
  const m = t.products.modal;
  const productName = typeof product.name === 'string' ? product.name : (lang === 'id' ? product.name.id : product.name.en);

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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setState('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setState('success');
  };

  const PRODUCT_OPTIONS = lang === 'id' ? PRODUCT_OPTIONS_ID : PRODUCT_OPTIONS_EN;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="absolute inset-0 bg-[#1C1710]/40" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md rounded border shadow-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h3 id="modal-title" className="text-base font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {m.title}
          </h3>
          <button onClick={onClose} className="text-lg leading-none p-1 transition-colors" style={{ color: 'var(--text-muted)' }} aria-label="Tutup modal">
            ✕
          </button>
        </div>

        {state === 'success' ? (
          <div className="p-6 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#EAF3EE', color: 'var(--accent-green)' }}>
              ✓
            </div>
            <p className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{m.successTitle}</p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>{m.successBody}</p>
            <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-white rounded transition-colors" style={{ backgroundColor: 'var(--accent-green)' }}>
              {m.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 flex flex-col gap-4 text-sm">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                {lang === 'id' ? 'Pilihan Produk' : 'Selected Product'}
              </label>
              <select defaultValue={productName} className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                {PRODUCT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="m-company" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                {m.company} *
              </label>
              <input id="m-company" type="text" value={form.company} onChange={(e) => { setForm({ ...form, company: e.target.value }); setErrors({ ...errors, company: undefined }); }} className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ backgroundColor: 'var(--bg-base)', borderColor: errors.company ? '#EF4444' : 'var(--border)', color: 'var(--text-primary)' }} />
              {errors.company && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.company}</p>}
            </div>
            <div>
              <label htmlFor="m-name" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                {m.name} *
              </label>
              <input id="m-name" type="text" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: undefined }); }} className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ backgroundColor: 'var(--bg-base)', borderColor: errors.name ? '#EF4444' : 'var(--border)', color: 'var(--text-primary)' }} />
              {errors.name && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="m-email" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                {m.email} *
              </label>
              <input id="m-email" type="email" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: undefined }); }} className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ backgroundColor: 'var(--bg-base)', borderColor: errors.email ? '#EF4444' : 'var(--border)', color: 'var(--text-primary)' }} />
              {errors.email && <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="m-qty" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                {m.qty}
              </label>
              <input id="m-qty" type="text" placeholder="Contoh: 1 x 20ft FCL / 500 unit" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} className="w-full px-3 py-2 text-sm rounded border outline-none" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label htmlFor="m-msg" className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                {m.note}
              </label>
              <textarea id="m-msg" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 text-sm rounded border outline-none resize-none" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
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
  const { lang, t } = useLang();
  const p = t.products;

  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedProduct, setSelectedProduct] = useState<BaseProduct | null>(null);
  const [productsList, setProductsList] = useState<BaseProduct[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);

  const [headerRef, headerIn] = useInView();
  const [gridRef, gridIn] = useInView({ threshold: 0.05 });

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProductsAsync({ category: activeFilter === 'all' ? undefined : activeFilter })
      .then((data) => {
        if (active && data && data.length > 0) {
          setProductsList(data);
        }
      })
      .catch((err) => {
        console.warn('Failed loading dynamic products:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [activeFilter]);

  const filtered = activeFilter === 'all' 
    ? productsList 
    : productsList.filter((pr) => pr.category === activeFilter);

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
          {filtered.map((product, idx) => {
            const name = typeof product.name === 'string' 
              ? product.name 
              : (lang === 'id' ? product.name.id : product.name.en);
            
            const specText = (product as any).spec || (
              product.specs && product.specs.length > 0 
                ? product.specs.slice(0, 3).map((s: any) => `${s.key}: ${s.value}`).join(' | ') 
                : ''
            );

            const appText = (product as any).application || (
              product.applications && product.applications.length > 0
                ? product.applications.slice(0, 2).map((a: any) => typeof a === 'string' ? a : (lang === 'id' ? a.id : a.en)).join(', ')
                : ''
            );

            const imageUrl = product.thumbnail?.url || (product.images && product.images.length > 0 ? product.images[0].url : undefined);

            return (
              <article
                key={product.id}
                className={`reveal ${gridIn ? 'in-view' : ''} flex flex-col justify-between rounded border p-5 transition-shadow hover:shadow-md`}
                style={{ '--reveal-delay': `${idx * 60}ms`, backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' } as React.CSSProperties}
              >
                <div>
                  {imageUrl ? (
                    <div className="relative w-full aspect-[4/3] rounded overflow-hidden mb-4 bg-[#f2f5f3] border" style={{ borderColor: 'var(--border)' }}>
                      <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 right-2.5 text-xs font-medium px-2 py-0.5 rounded border shadow-sm backdrop-blur-sm"
                        style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)', backgroundColor: 'rgba(234, 243, 238, 0.95)', fontFamily: 'var(--font-mono)' }}>
                        {product.grade}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-base font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                      {name}
                    </h3>
                    {!imageUrl && (
                      <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded border" style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)', backgroundColor: '#EAF3EE', fontFamily: 'var(--font-mono)' }}>
                        {product.grade}
                      </span>
                    )}
                  </div>
                  {specText ? (
                    <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {specText}
                    </p>
                  ) : null}
                  {appText ? (
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{appText}</p>
                  ) : null}
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="block w-full py-2.5 text-sm font-semibold text-center rounded text-white transition-colors"
                    style={{ backgroundColor: 'var(--accent-green)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent-green-hover)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent-green)'; }}
                  >
                    {lang === 'id' ? 'Lihat Detail' : 'View Details'}
                  </Link>
                  <button
                    type="button"
                    className="w-full py-2 text-sm font-medium rounded border transition-colors"
                    style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)', backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#EAF3EE'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
                    onClick={() => setSelectedProduct(product)}
                    aria-label={`${p.requestQuote}: ${name}`}
                  >
                    {p.requestQuote}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedProduct && <InquiryModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  );
}
