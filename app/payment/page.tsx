'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/lib/products';
import Navbar from '@/components/Navbar';

const BANK_DETAILS = {
  bankName: 'Bank Central Asia (BCA)',
  accountName: 'PT Nawaterra Indo Global',
  accountNumber: '1234 5678 90',
  swiftCode: 'CENAIDJA',
  branch: 'Jakarta Pusat',
};

interface StoredOrder {
  form: Record<string, string>;
  items: { productId: string; qty: number }[];
  totalUSD: number;
}

export default function PaymentPage() {
  const { lang } = useLang();
  const { clearCart } = useCart();
  const router = useRouter();

  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('nawaterra_checkout');
      if (!raw) { router.replace('/'); return; }
      setOrder(JSON.parse(raw));
    } catch {
      router.replace('/');
    }
  }, [router]);

  const copy = {
    id: {
      heading: 'Metode Pembayaran',
      sub: 'Pilih metode pembayaran yang sesuai dengan kebutuhan B2B perusahaan Anda.',
      orderSummary: 'Ringkasan Order',
      totalIndicative: 'Total Indikatif',
      priceNote: 'Harga indikatif. Final setelah konfirmasi tim kami.',
      selectMethod: 'Pilih Metode',
      ttLabel: 'TT — Telegraphic Transfer',
      ttDesc: 'Transfer bank langsung ke rekening PT Nawaterra Indo Global. Proforma Invoice akan dikirim terlebih dahulu.',
      lcLabel: 'L/C — Letter of Credit',
      lcDesc: 'Letter of Credit melalui bank koresponden. Syarat dan dokumen L/C dibahas bersama tim kami.',
      cadLabel: 'CAD — Cash Against Documents',
      cadDesc: 'Pembayaran dilakukan saat dokumen ekspor diserahkan melalui bank. Cocok untuk pembeli internasional.',
      bankDetails: 'Detail Rekening (untuk TT)',
      confirm: 'Konfirmasi Order',
      confirming: 'Memproses...',
      backToCheckout: '← Kembali ke Checkout',
      selectMethodError: 'Pilih metode pembayaran terlebih dahulu.',
      loading: 'Memuat...',
    },
    en: {
      heading: 'Payment Method',
      sub: 'Select the payment method that suits your B2B requirements.',
      orderSummary: 'Order Summary',
      totalIndicative: 'Indicative Total',
      priceNote: 'Indicative pricing. Final after our team confirms.',
      selectMethod: 'Select Method',
      ttLabel: 'TT — Telegraphic Transfer',
      ttDesc: 'Direct bank transfer to PT Nawaterra Indo Global. A Proforma Invoice will be sent first.',
      lcLabel: 'L/C — Letter of Credit',
      lcDesc: 'Letter of Credit via correspondent bank. L/C terms and documents discussed with our team.',
      cadLabel: 'CAD — Cash Against Documents',
      cadDesc: 'Payment upon surrender of export documents through bank. Suitable for international buyers.',
      bankDetails: 'Bank Details (for TT)',
      confirm: 'Confirm Order',
      confirming: 'Processing...',
      backToCheckout: '← Back to Checkout',
      selectMethodError: 'Please select a payment method.',
      loading: 'Loading...',
    },
  }[lang];

  const [methodError, setMethodError] = useState('');

  const METHODS = [
    { id: 'TT', label: copy.ttLabel, desc: copy.ttDesc },
    { id: 'LC', label: copy.lcLabel, desc: copy.lcDesc },
    { id: 'CAD', label: copy.cadLabel, desc: copy.cadDesc },
  ];

  const handleConfirm = async () => {
    if (!paymentMethod) { setMethodError(copy.selectMethodError); return; }
    setConfirming(true);
    // TODO: POST to /api/orders
    await new Promise((r) => setTimeout(r, 1100));

    // Generate reference number
    const date = new Date();
    const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    const ref = `NWG-${dateStr}-${rand}`;

    sessionStorage.setItem('nawaterra_order_ref', JSON.stringify({ ref, paymentMethod, order }));
    clearCart();
    router.push('/order-confirmation');
  };

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-base)' }}>
          <p style={{ color: 'var(--text-muted)' }}>{copy.loading}</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">

          <div className="mb-8">
            <Link href="/checkout" className="text-sm mb-4 inline-block transition-colors hover:text-[#2D5A3D]" style={{ color: 'var(--text-muted)' }}>
              {copy.backToCheckout}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {copy.heading}
            </h1>
            <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>{copy.sub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* Payment method selection */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {copy.selectMethod}
                </legend>
                <div className="flex flex-col gap-3">
                  {METHODS.map(({ id, label, desc }) => (
                    <label
                      key={id}
                      htmlFor={`pm-${id}`}
                      className="flex items-start gap-4 p-5 rounded border cursor-pointer transition-all"
                      style={{
                        borderColor: paymentMethod === id ? 'var(--accent-green)' : 'var(--border)',
                        backgroundColor: paymentMethod === id ? '#EAF3EE' : 'var(--bg-card)',
                      }}
                    >
                      <input
                        id={`pm-${id}`}
                        type="radio"
                        name="paymentMethod"
                        value={id}
                        checked={paymentMethod === id}
                        onChange={() => { setPaymentMethod(id); setMethodError(''); }}
                        className="mt-1 flex-shrink-0"
                        style={{ accentColor: 'var(--accent-green)' }}
                      />
                      <div>
                        <p className="font-semibold text-base" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{label}</p>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {methodError && <p className="text-xs mt-2" style={{ color: '#DC2626' }} role="alert">{methodError}</p>}
              </fieldset>

              {/* Bank details (only shown when TT selected) */}
              {paymentMethod === 'TT' && (
                <div className="rounded border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
                    {copy.bankDetails}
                  </p>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { dt: 'Bank', dd: BANK_DETAILS.bankName },
                      { dt: 'Account Name', dd: BANK_DETAILS.accountName },
                      { dt: 'Account Number', dd: BANK_DETAILS.accountNumber },
                      { dt: 'SWIFT / BIC', dd: BANK_DETAILS.swiftCode },
                      { dt: 'Branch', dd: BANK_DETAILS.branch },
                    ].map(({ dt, dd }) => (
                      <div key={dt} className="flex flex-col gap-0.5">
                        <dt className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{dt}</dt>
                        <dd className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{dd}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="text-xs mt-4 p-3 rounded" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-section)' }}>
                    {lang === 'id'
                      ? 'Proforma Invoice akan dikirim sebelum pembayaran dilakukan. Nomor rekening di atas adalah contoh untuk keperluan demonstrasi.'
                      : 'Proforma Invoice will be sent before payment. The account details above are sample data for demonstration purposes.'}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleConfirm}
                disabled={confirming}
                className="w-full py-4 text-base font-semibold text-white rounded transition-colors disabled:opacity-60"
                style={{ backgroundColor: 'var(--accent-green)' }}
              >
                {confirming ? copy.confirming : copy.confirm}
              </button>
            </div>

            {/* Order summary */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{copy.orderSummary}</h2>
                <ul className="flex flex-col gap-4">
                  {order.items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    const name = lang === 'id' ? product.name.id : product.name.en;
                    const trueQty = product.pricing.moqAmount * item.qty;
                    return (
                      <li key={item.productId} className="flex justify-between gap-3 border-b pb-4 text-sm" style={{ borderColor: 'var(--border)' }}>
                        <div className="min-w-0">
                          <p className="font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{name}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{trueQty} {product.pricing.moqUnit}</p>
                        </div>
                        <p className="font-bold flex-shrink-0" style={{ color: 'var(--text-primary)' }}>
                          ${(product.pricing.indicativeUSD * trueQty).toLocaleString()}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex justify-between items-baseline mt-4 pt-2">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{copy.totalIndicative}</span>
                  <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>${order.totalUSD.toLocaleString()}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{copy.priceNote}</p>

                {order.form.companyName && (
                  <div className="mt-4 pt-4 border-t text-sm" style={{ borderColor: 'var(--border)' }}>
                    <p className="font-semibold" style={{ color: 'var(--text-secondary)' }}>{order.form.companyName}</p>
                    <p style={{ color: 'var(--text-muted)' }}>{order.form.picName}</p>
                    <p style={{ color: 'var(--text-muted)' }}>{order.form.picEmail}</p>
                    {order.form.paymentTerm && (
                      <p className="mt-2 text-xs font-semibold" style={{ color: 'var(--accent-green)' }}>{order.form.paymentTerm}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
