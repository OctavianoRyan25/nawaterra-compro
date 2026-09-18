'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LanguageContext';
import { getProductById } from '@/lib/products';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalUSD } = useCart();
  const { lang } = useLang();

  const copy = {
    id: {
      title: 'Keranjang',
      empty: 'Keranjang masih kosong.',
      emptySub: 'Tambahkan produk untuk mulai order.',
      continueShopping: 'Lanjut Belanja',
      checkout: 'Lanjut ke Checkout',
      remove: 'Hapus',
      total: 'Total Indikatif',
      perUnit: 'per',
      priceNote: 'Harga indikatif. Penawaran final dari tim kami setelah konfirmasi.',
      items: 'produk',
    },
    en: {
      title: 'Cart',
      empty: 'Your cart is empty.',
      emptySub: 'Add products to start an order.',
      continueShopping: 'Continue Shopping',
      checkout: 'Proceed to Checkout',
      remove: 'Remove',
      total: 'Indicative Total',
      perUnit: 'per',
      priceNote: 'Indicative pricing. Final offer from our team after confirmation.',
      items: 'items',
    },
  }[lang];

  // Close on Escape key
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); },
    [closeCart]
  );
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, handleKey]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(28,23,16,0.45)' }}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={copy.title}
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'var(--bg-card)', borderLeft: '1px solid var(--border)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
          >
            {copy.title}
            {items.length > 0 && (
              <span
                className="ml-2 text-sm font-normal"
                style={{ color: 'var(--text-muted)' }}
              >
                ({items.length} {copy.items})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 rounded transition-colors hover:bg-[#F2EDE4]"
            aria-label="Tutup keranjang"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border-strong)' }} aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{copy.empty}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{copy.emptySub}</p>
              <button
                type="button"
                onClick={closeCart}
                className="mt-4 px-5 py-2.5 text-sm font-semibold rounded border transition-colors"
                style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}
              >
                {copy.continueShopping}
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4" role="list">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const name = lang === 'id' ? product.name.id : product.name.en;
                const lineTotal = product.pricing.indicativeUSD * product.pricing.moqAmount * item.qty;
                const trueQty = product.pricing.moqAmount * item.qty;

                return (
                  <li
                    key={item.productId}
                    className="flex gap-4 py-4 border-b"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {/* Color swatch representing category */}
                    <div
                      className="w-14 h-14 rounded flex-shrink-0 flex items-center justify-center text-xs font-semibold"
                      style={{
                        backgroundColor: product.category === 'Kayu & Palet' ? '#EAF3EE' : product.category === 'Agrikultur' ? '#FEF3C7' : '#EEF2FF',
                        color: product.category === 'Kayu & Palet' ? '#2D5A3D' : product.category === 'Agrikultur' ? '#92400E' : '#3730A3',
                        fontFamily: 'var(--font-mono)',
                      }}
                      aria-hidden="true"
                    >
                      {product.category === 'Kayu & Palet' ? 'WD' : product.category === 'Agrikultur' ? 'AG' : 'MN'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${product.id}`}
                        className="text-sm font-semibold leading-tight hover:underline"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
                        onClick={closeCart}
                      >
                        {name}
                      </Link>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {product.grade}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                        ${product.pricing.indicativeUSD}/{product.pricing.unit} × {trueQty} {product.pricing.moqUnit}
                      </p>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQty(item.productId, item.qty - 1)}
                          className="w-7 h-7 rounded border flex items-center justify-center text-base font-bold transition-colors hover:bg-[#F2EDE4]"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                          aria-label="Kurangi jumlah"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold w-6 text-center" style={{ color: 'var(--text-primary)' }}>
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.productId, item.qty + 1)}
                          className="w-7 h-7 rounded border flex items-center justify-center text-base font-bold transition-colors hover:bg-[#F2EDE4]"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                          aria-label="Tambah jumlah"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="ml-auto text-xs transition-colors hover:text-red-600"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {copy.remove}
                        </button>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                        ${lineTotal.toLocaleString()}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="flex-shrink-0 border-t px-6 py-5"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {copy.total}
              </span>
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                ${totalUSD.toLocaleString()}
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {copy.priceNote}
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-3.5 text-sm font-semibold text-white text-center rounded transition-colors"
              style={{ backgroundColor: 'var(--accent-green)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent-green-hover)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--accent-green)'; }}
            >
              {copy.checkout}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
