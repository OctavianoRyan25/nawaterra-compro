'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/lib/products';
import Navbar from '@/components/Navbar';

const PAYMENT_TERMS = ['TT (Telegraphic Transfer)', 'L/C (Letter of Credit)', 'CAD (Cash Against Documents)'];

interface CheckoutForm {
  companyName: string;
  taxId: string;
  address: string;
  city: string;
  country: string;
  picName: string;
  picTitle: string;
  picEmail: string;
  picPhone: string;
  shippingAddress: string;
  paymentTerm: string;
  notes: string;
}

const EMPTY_FORM: CheckoutForm = {
  companyName: '', taxId: '', address: '', city: '', country: '',
  picName: '', picTitle: '', picEmail: '', picPhone: '',
  shippingAddress: '', paymentTerm: '', notes: '',
};

export default function CheckoutPage() {
  const { lang } = useLang();
  const { items, totalUSD, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [submitting, setSubmitting] = useState(false);

  // Redirect to home if cart is empty
  useEffect(() => {
    if (items.length === 0) router.replace('/');
  }, [items.length, router]);

  const copy = {
    id: {
      heading: 'Checkout B2B',
      sub: 'Lengkapi informasi perusahaan dan pengiriman. Tim kami akan menghubungi Anda untuk konfirmasi order.',
      sectionCompany: 'Informasi Perusahaan',
      sectionPIC: 'Contact Person (PIC)',
      sectionShipping: 'Pengiriman & Pembayaran',
      sectionOrder: 'Ringkasan Order',
      companyName: 'Nama Perusahaan', taxId: 'NPWP / Tax ID', address: 'Alamat Perusahaan',
      city: 'Kota', country: 'Negara',
      picName: 'Nama PIC', picTitle: 'Jabatan', picEmail: 'Email Bisnis', picPhone: 'No. Telepon',
      shippingAddress: 'Alamat Pengiriman', paymentTerm: 'Preferensi Syarat Pembayaran',
      notes: 'Catatan tambahan (opsional)',
      submit: 'Lanjut ke Pembayaran',
      submitting: 'Memproses...',
      required: 'Wajib diisi',
      emailInvalid: 'Format email tidak valid',
      backToProducts: '← Lanjut Belanja',
      qty: 'Qty',
      indicative: 'Total Indikatif',
      priceNote: 'Harga indikatif. Final setelah konfirmasi.',
      sameAsCompany: 'Sama dengan alamat perusahaan',
    },
    en: {
      heading: 'B2B Checkout',
      sub: 'Complete your company and shipping information. Our team will contact you to confirm the order.',
      sectionCompany: 'Company Information',
      sectionPIC: 'Contact Person (PIC)',
      sectionShipping: 'Shipping & Payment',
      sectionOrder: 'Order Summary',
      companyName: 'Company Name', taxId: 'Tax ID / NPWP', address: 'Company Address',
      city: 'City', country: 'Country',
      picName: 'PIC Name', picTitle: 'Job Title', picEmail: 'Business Email', picPhone: 'Phone Number',
      shippingAddress: 'Shipping Address', paymentTerm: 'Preferred Payment Terms',
      notes: 'Additional notes (optional)',
      submit: 'Proceed to Payment',
      submitting: 'Processing...',
      required: 'Required',
      emailInvalid: 'Invalid email format',
      backToProducts: '← Continue Shopping',
      qty: 'Qty',
      indicative: 'Indicative Total',
      priceNote: 'Indicative pricing. Final after confirmation.',
      sameAsCompany: 'Same as company address',
    },
  }[lang];

  const validate = (): Partial<CheckoutForm> => {
    const e: Partial<CheckoutForm> = {};
    if (!form.companyName.trim()) e.companyName = copy.required;
    if (!form.address.trim()) e.address = copy.required;
    if (!form.city.trim()) e.city = copy.required;
    if (!form.country.trim()) e.country = copy.required;
    if (!form.picName.trim()) e.picName = copy.required;
    if (!form.picEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.picEmail = copy.emailInvalid;
    if (!form.picPhone.trim()) e.picPhone = copy.required;
    if (!form.shippingAddress.trim()) e.shippingAddress = copy.required;
    if (!form.paymentTerm) e.paymentTerm = copy.required;
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    // TODO: POST to API /api/checkout
    await new Promise((r) => setTimeout(r, 900));
    // Store checkout data for payment page
    sessionStorage.setItem('nawaterra_checkout', JSON.stringify({ form, items, totalUSD }));
    router.push('/payment');
  };

  const set = (field: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const inputCls = 'px-3 py-2.5 text-sm rounded border outline-none w-full';
  const inputStyle = (field: keyof CheckoutForm) => ({
    backgroundColor: 'var(--bg-base)',
    borderColor: errors[field] ? '#EF4444' : 'var(--border)',
    color: 'var(--text-primary)',
  });
  const labelCls = 'text-xs font-semibold uppercase tracking-wide';
  const labelStyle = { color: 'var(--text-secondary)' };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

          {/* Header */}
          <div className="mb-8">
            <Link href="/#products" className="text-sm mb-4 inline-block transition-colors hover:text-[#2D5A3D]" style={{ color: 'var(--text-muted)' }}>
              {copy.backToProducts}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {copy.heading}
            </h1>
            <p className="mt-2 text-base max-w-xl" style={{ color: 'var(--text-secondary)' }}>{copy.sub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Form — 2/3 width */}
            <form onSubmit={handleSubmit} noValidate className="lg:col-span-2 flex flex-col gap-8">

              {/* Company Info */}
              <section className="rounded border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="text-lg font-bold mb-5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{copy.sectionCompany}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([
                    { id: 'companyName' as const, label: copy.companyName, required: true },
                    { id: 'taxId' as const, label: copy.taxId, required: false },
                    { id: 'address' as const, label: copy.address, required: true, full: true },
                    { id: 'city' as const, label: copy.city, required: true },
                    { id: 'country' as const, label: copy.country, required: true },
                  ]).map(({ id, label, required, full }) => (
                    <div key={id} className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
                      <label htmlFor={`co-${id}`} className={labelCls} style={labelStyle}>
                        {label} {required && <span style={{ color: '#DC2626' }} aria-hidden="true">*</span>}
                      </label>
                      <input id={`co-${id}`} type="text" value={form[id]} onChange={set(id)} className={inputCls} style={inputStyle(id)} aria-invalid={!!errors[id]} />
                      {errors[id] && <span className="text-xs" style={{ color: '#DC2626' }} role="alert">{errors[id]}</span>}
                    </div>
                  ))}
                </div>
              </section>

              {/* PIC Info */}
              <section className="rounded border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="text-lg font-bold mb-5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{copy.sectionPIC}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {([
                    { id: 'picName' as const, label: copy.picName, required: true, type: 'text' },
                    { id: 'picTitle' as const, label: copy.picTitle, required: false, type: 'text' },
                    { id: 'picEmail' as const, label: copy.picEmail, required: true, type: 'email' },
                    { id: 'picPhone' as const, label: copy.picPhone, required: true, type: 'tel' },
                  ]).map(({ id, label, required, type }) => (
                    <div key={id} className="flex flex-col gap-1.5">
                      <label htmlFor={`pic-${id}`} className={labelCls} style={labelStyle}>
                        {label} {required && <span style={{ color: '#DC2626' }} aria-hidden="true">*</span>}
                      </label>
                      <input id={`pic-${id}`} type={type} value={form[id]} onChange={set(id)} className={inputCls} style={inputStyle(id)} aria-invalid={!!errors[id]} />
                      {errors[id] && <span className="text-xs" style={{ color: '#DC2626' }} role="alert">{errors[id]}</span>}
                    </div>
                  ))}
                </div>
              </section>

              {/* Shipping & Payment */}
              <section className="rounded border p-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="text-lg font-bold mb-5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{copy.sectionShipping}</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="sh-address" className={labelCls} style={labelStyle}>
                      {copy.shippingAddress} <span style={{ color: '#DC2626' }} aria-hidden="true">*</span>
                    </label>
                    <textarea id="sh-address" rows={3} value={form.shippingAddress} onChange={set('shippingAddress')}
                      className={`${inputCls} resize-none`} style={inputStyle('shippingAddress')} aria-invalid={!!errors.shippingAddress} />
                    {errors.shippingAddress && <span className="text-xs" style={{ color: '#DC2626' }} role="alert">{errors.shippingAddress}</span>}
                    <button type="button" onClick={() => setForm((f) => ({ ...f, shippingAddress: `${f.address}, ${f.city}, ${f.country}`.trim().replace(/^, /, '') }))}
                      className="self-start text-xs underline transition-colors hover:text-[#2D5A3D]" style={{ color: 'var(--text-muted)' }}>
                      {copy.sameAsCompany}
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="sh-payment" className={labelCls} style={labelStyle}>
                      {copy.paymentTerm} <span style={{ color: '#DC2626' }} aria-hidden="true">*</span>
                    </label>
                    <select id="sh-payment" value={form.paymentTerm} onChange={set('paymentTerm')}
                      className={inputCls} style={inputStyle('paymentTerm')} aria-invalid={!!errors.paymentTerm}>
                      <option value="">—</option>
                      {PAYMENT_TERMS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.paymentTerm && <span className="text-xs" style={{ color: '#DC2626' }} role="alert">{errors.paymentTerm}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="sh-notes" className={labelCls} style={labelStyle}>{copy.notes}</label>
                    <textarea id="sh-notes" rows={3} value={form.notes} onChange={set('notes')}
                      className={`${inputCls} resize-none`} style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
              </section>

              <button type="submit" disabled={submitting}
                className="w-full py-4 text-base font-semibold text-white rounded transition-colors disabled:opacity-60"
                style={{ backgroundColor: 'var(--accent-green)' }}>
                {submitting ? copy.submitting : copy.submit}
              </button>
            </form>

            {/* Order Summary — 1/3 width, sticky */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{copy.sectionOrder}</h2>
                <ul className="flex flex-col gap-4">
                  {items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    const name = lang === 'id' ? product.name.id : product.name.en;
                    const trueQty = product.pricing.moqAmount * item.qty;
                    return (
                      <li key={item.productId} className="flex gap-3 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                        <div className="w-10 h-10 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold"
                          style={{ backgroundColor: CATEGORY_COLORS[product.category], color: CATEGORY_TEXT[product.category], fontFamily: 'var(--font-mono)' }} aria-hidden="true">
                          {CATEGORY_LABEL[product.category]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{name}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{trueQty} {product.pricing.moqUnit}</p>
                        </div>
                        <p className="text-sm font-bold flex-shrink-0" style={{ color: 'var(--text-primary)' }}>
                          ${(product.pricing.indicativeUSD * trueQty).toLocaleString()}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex justify-between items-baseline mt-4 pt-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{copy.indicative}</span>
                  <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>${totalUSD.toLocaleString()}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{copy.priceNote}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Local helper maps for order summary colors
const CATEGORY_COLORS: Record<string, string> = { 'Kayu & Palet': '#EAF3EE', Agrikultur: '#FEF3C7', Mineral: '#EEF2FF' };
const CATEGORY_TEXT: Record<string, string>   = { 'Kayu & Palet': '#2D5A3D', Agrikultur: '#92400E', Mineral: '#3730A3' };
const CATEGORY_LABEL: Record<string, string>  = { 'Kayu & Palet': 'WD', Agrikultur: 'AG', Mineral: 'MN' };
