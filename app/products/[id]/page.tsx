'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductById, Product } from '@/lib/products';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

const CATEGORY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  'Kayu & Palet': { bg: '#EAF3EE', text: '#2D5A3D', label: 'WD' },
  Agrikultur:     { bg: '#FEF3C7', text: '#92400E', label: 'AG' },
  Mineral:        { bg: '#EEF2FF', text: '#3730A3', label: 'MN' },
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  const { lang } = useLang();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'applications' | 'docs'>('specs');

  useEffect(() => {
    const found = getProductById(id);
    setProduct(found ?? null);
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-base)' }}>
          <div className="text-center">
            <p className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              {lang === 'id' ? 'Produk tidak ditemukan.' : 'Product not found.'}
            </p>
            <Link href="/#products" className="text-sm underline" style={{ color: 'var(--accent-green)' }}>
              {lang === 'id' ? '← Kembali ke semua produk' : '← Back to all products'}
            </Link>
          </div>
        </main>
      </>
    );
  }

  const name = lang === 'id' ? product.name.id : product.name.en;
  const shortDesc = lang === 'id' ? product.shortDescription.id : product.shortDescription.en;
  const description = lang === 'id' ? product.description.id : product.description.en;
  const swatch = CATEGORY_COLORS[product.category];
  const trueQty = product.pricing.moqAmount * qty;
  const lineTotal = product.pricing.indicativeUSD * trueQty;
  const priceNote = lang === 'id' ? product.pricing.note.id : product.pricing.note.en;

  const copy = {
    id: {
      back: '← Semua Produk',
      indicativePrice: 'Harga Indikatif',
      per: 'per',
      moq: 'Min. Order',
      qty: 'Jumlah (satuan MOQ)',
      addToCart: 'Tambah ke Keranjang',
      added: 'Ditambahkan!',
      requestQuote: 'Minta Penawaran Manual',
      tabSpecs: 'Spesifikasi Teknis',
      tabApp: 'Aplikasi Industri',
      tabDocs: 'Dokumen & Kemasan',
      availableDocs: 'Dokumen Tersedia',
      packagingOptions: 'Opsi Kemasan',
      leadTime: 'Lead Time',
      businessDays: 'hari kerja',
      estimatedTotal: 'Estimasi Subtotal',
      priceDisclaimer: 'Harga indikatif',
    },
    en: {
      back: '← All Products',
      indicativePrice: 'Indicative Price',
      per: 'per',
      moq: 'Min. Order',
      qty: 'Quantity (MOQ units)',
      addToCart: 'Add to Cart',
      added: 'Added!',
      requestQuote: 'Request Manual Quote',
      tabSpecs: 'Technical Specifications',
      tabApp: 'Industry Applications',
      tabDocs: 'Documents & Packaging',
      availableDocs: 'Available Documents',
      packagingOptions: 'Packaging Options',
      leadTime: 'Lead Time',
      businessDays: 'business days',
      estimatedTotal: 'Estimated Subtotal',
      priceDisclaimer: 'Indicative price',
    },
  }[lang];

  const handleAddToCart = () => {
    addItem(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li><Link href="/" className="hover:text-[#2D5A3D] transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/#products" className="hover:text-[#2D5A3D] transition-colors">{lang === 'id' ? 'Produk' : 'Products'}</Link></li>
              <li aria-hidden="true">/</li>
              <li style={{ color: 'var(--text-primary)' }} aria-current="page">{name}</li>
            </ol>
          </nav>
        </div>

        {/* Hero: image + info */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: Image placeholder */}
            <div className="sticky top-24">
              <div
                className="w-full aspect-square rounded border flex flex-col items-center justify-center gap-4 relative overflow-hidden"
                style={{ backgroundColor: swatch.bg, borderColor: 'var(--border)' }}
                aria-hidden="true"
              >
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.05) 39px, rgba(0,0,0,0.05) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.05) 39px, rgba(0,0,0,0.05) 40px)' }}
                />
                <span className="text-8xl font-bold" style={{ color: swatch.text, fontFamily: 'var(--font-mono)', opacity: 0.15 }}>
                  {swatch.label}
                </span>
                <p className="text-base font-bold text-center px-8 z-10" style={{ color: swatch.text, fontFamily: 'var(--font-heading)' }}>
                  {name}
                </p>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full z-10"
                  style={{ backgroundColor: swatch.text, color: 'white', fontFamily: 'var(--font-mono)' }}
                >
                  {product.grade}
                </span>
                <p className="absolute bottom-4 right-4 text-xs tracking-widest" style={{ color: swatch.text, opacity: 0.4, fontFamily: 'var(--font-mono)' }}>
                  {product.category.toUpperCase()}
                </p>
              </div>

              {/* Available docs below image on desktop */}
              <div className="mt-4 hidden lg:flex flex-wrap gap-2">
                {product.availableDocs.map((doc) => (
                  <span key={doc} className="text-xs px-2.5 py-1 rounded border font-medium" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', fontFamily: 'var(--font-mono)' }}>
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: product info */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-heading)' }}>
                  {product.category}
                </p>
                <h1
                  className="text-3xl md:text-4xl font-bold leading-tight mb-3"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                >
                  {name}
                </h1>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {shortDesc}
                </p>
              </div>

              {/* Pricing box */}
              <div className="rounded border p-5" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                  {copy.indicativePrice}
                </p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                    ${product.pricing.indicativeUSD.toLocaleString()}
                  </span>
                  <span className="text-base" style={{ color: 'var(--text-muted)' }}>
                    / {product.pricing.unit}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  <span><span className="font-semibold">{copy.moq}:</span> {product.pricing.moqAmount} {product.pricing.moqUnit}</span>
                  <span>·</span>
                  <span><span className="font-semibold">{copy.leadTime}:</span> {product.leadTimeDays.min}–{product.leadTimeDays.max} {copy.businessDays}</span>
                </div>
                <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>{priceNote}</p>

                {/* Qty selector */}
                <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {copy.qty}
                </label>
                <div className="flex items-center gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded border text-lg font-bold flex items-center justify-center transition-colors hover:bg-[#F2EDE4]"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                    aria-label="Kurangi jumlah"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold w-8 text-center" style={{ color: 'var(--text-primary)' }}>{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-10 rounded border text-lg font-bold flex items-center justify-center transition-colors hover:bg-[#F2EDE4]"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                    aria-label="Tambah jumlah"
                  >
                    +
                  </button>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    = {trueQty} {product.pricing.moqUnit}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-5 py-3 border-t border-b" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{copy.estimatedTotal}</span>
                  <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                    ${lineTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 text-sm font-semibold text-white rounded transition-all"
                  style={{ backgroundColor: added ? '#16A34A' : 'var(--accent-green)' }}
                  aria-label={`${copy.addToCart}: ${name}`}
                >
                  {added ? `✓ ${copy.added}` : copy.addToCart}
                </button>
              </div>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); window.history.pushState({}, '', '/#contact'); }}
                className="text-center text-sm underline transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {copy.requestQuote}
              </a>
            </div>
          </div>
        </section>

        {/* Tabs: Specs / Applications / Docs */}
        <section className="border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-section)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Tab buttons */}
            <div className="flex gap-0 border-b" style={{ borderColor: 'var(--border)' }} role="tablist">
              {([
                { key: 'specs' as const, label: copy.tabSpecs },
                { key: 'applications' as const, label: copy.tabApp },
                { key: 'docs' as const, label: copy.tabDocs },
              ]).map(({ key, label }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={activeTab === key}
                  onClick={() => setActiveTab(key)}
                  className="px-5 py-4 text-sm font-semibold border-b-2 transition-colors -mb-px"
                  style={{
                    borderColor: activeTab === key ? 'var(--accent-green)' : 'transparent',
                    color: activeTab === key ? 'var(--accent-green)' : 'var(--text-muted)',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="py-10">
              {activeTab === 'specs' && (
                <div role="tabpanel" className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl">
                  {product.specs.map((spec) => (
                    <div key={spec.key} className="flex justify-between gap-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{spec.key}</span>
                      <span className="text-sm font-semibold text-right" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'applications' && (
                <ul role="tabpanel" className="flex flex-col gap-3 max-w-2xl">
                  {product.applications.map((app, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent-amber)' }} aria-hidden="true" />
                      <span className="text-base" style={{ color: 'var(--text-secondary)' }}>
                        {lang === 'id' ? app.id : app.en}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'docs' && (
                <div role="tabpanel" className="flex flex-col gap-8 max-w-2xl">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>{copy.availableDocs}</p>
                    <div className="flex flex-wrap gap-3">
                      {product.availableDocs.map((doc) => (
                        <span key={doc} className="px-4 py-2 rounded border text-sm font-medium" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)', fontFamily: 'var(--font-mono)' }}>
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>{copy.packagingOptions}</p>
                    <ul className="flex flex-col gap-2">
                      {product.packagingOptions.map((opt, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--border-strong)' }} aria-hidden="true" />
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{copy.leadTime}</p>
                    <p className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {product.leadTimeDays.min}–{product.leadTimeDays.max} {copy.businessDays}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-12 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-base)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{description}</p>
          </div>
        </section>
      </main>
    </>
  );
}
