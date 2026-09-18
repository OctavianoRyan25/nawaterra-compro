'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import { getProductById } from '@/lib/products';
import Navbar from '@/components/Navbar';

interface OrderRef {
  ref: string;
  paymentMethod: string;
  order: {
    form: Record<string, string>;
    items: { productId: string; qty: number }[];
    totalUSD: number;
  };
}

export default function OrderConfirmationPage() {
  const { lang } = useLang();
  const [data, setData] = useState<OrderRef | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('nawaterra_order_ref');
      if (raw) setData(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const copy = {
    id: {
      heading: 'Order Terkonfirmasi',
      sub: 'Terima kasih. Order Anda sudah kami terima.',
      refLabel: 'Nomor Referensi Order',
      nextSteps: 'Langkah Selanjutnya',
      step1: 'Tim kami akan menghubungi Anda dalam 1 hari kerja untuk konfirmasi detail order.',
      step2: 'Proforma Invoice akan dikirimkan ke email bisnis yang Anda daftarkan.',
      step3: 'Setelah pembayaran dikonfirmasi, proses produksi / pengambilan stok dimulai.',
      step4: 'Dokumen ekspor (CoA, Packing List, dll.) akan disiapkan sebelum pengiriman.',
      orderSummary: 'Ringkasan Order',
      paymentMethod: 'Metode Pembayaran',
      backToProducts: 'Kembali ke Halaman Produk',
      totalIndicative: 'Total Indikatif',
      priceNote: 'Harga indikatif. Final setelah konfirmasi.',
      noOrder: 'Tidak ada data order.',
    },
    en: {
      heading: 'Order Confirmed',
      sub: 'Thank you. Your order has been received.',
      refLabel: 'Order Reference Number',
      nextSteps: 'Next Steps',
      step1: 'Our team will contact you within 1 business day to confirm order details.',
      step2: 'A Proforma Invoice will be sent to your registered business email.',
      step3: 'Once payment is confirmed, production or stock allocation begins.',
      step4: 'Export documents (CoA, Packing List, etc.) will be prepared before shipment.',
      orderSummary: 'Order Summary',
      paymentMethod: 'Payment Method',
      backToProducts: 'Back to Products',
      totalIndicative: 'Indicative Total',
      priceNote: 'Indicative pricing. Final after confirmation.',
      noOrder: 'No order data found.',
    },
  }[lang];

  if (!data) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: 'var(--bg-base)' }}>
          <p style={{ color: 'var(--text-muted)' }}>{copy.noOrder}</p>
          <Link href="/#products" className="text-sm underline" style={{ color: 'var(--accent-green)' }}>
            {copy.backToProducts}
          </Link>
        </main>
      </>
    );
  }

  const { ref, paymentMethod, order } = data;
  const steps = [copy.step1, copy.step2, copy.step3, copy.step4];

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
        <div className="max-w-3xl mx-auto px-6 py-16">

          {/* Success icon + heading */}
          <div className="text-center mb-12">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#EAF3EE' }}
              aria-hidden="true"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {copy.heading}
            </h1>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>{copy.sub}</p>
          </div>

          {/* Reference number */}
          <div
            className="rounded border p-6 text-center mb-8"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              {copy.refLabel}
            </p>
            <p
              className="text-3xl font-bold tracking-widest"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', letterSpacing: '0.12em' }}
            >
              {ref}
            </p>
            <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
              {paymentMethod}
            </p>
          </div>

          {/* Next steps */}
          <div className="rounded border p-6 mb-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h2 className="text-base font-bold mb-5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {copy.nextSteps}
            </h2>
            <ol className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm pt-0.5" style={{ color: 'var(--text-secondary)' }}>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Order summary */}
          <div className="rounded border p-6 mb-10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {copy.orderSummary}
            </h2>
            <ul className="flex flex-col gap-3">
              {order.items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const name = lang === 'id' ? product.name.id : product.name.en;
                const trueQty = product.pricing.moqAmount * item.qty;
                return (
                  <li key={item.productId} className="flex justify-between text-sm border-b pb-3" style={{ borderColor: 'var(--border)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{name} × {trueQty} {product.pricing.moqUnit}</span>
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      ${(product.pricing.indicativeUSD * trueQty).toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-between items-baseline mt-4">
              <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{copy.totalIndicative}</span>
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                ${order.totalUSD.toLocaleString()}
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{copy.priceNote}</p>
          </div>

          <div className="text-center">
            <Link
              href="/#products"
              className="inline-block px-8 py-3.5 text-sm font-semibold text-white rounded transition-colors"
              style={{ backgroundColor: 'var(--accent-green)' }}
            >
              {copy.backToProducts}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
