'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductById, getProductByIdAsync, Product } from '@/lib/products';
import { getUSDToIDRRate } from '@/lib/exchangeRate';
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
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState<number>(17885);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'applications' | 'docs'>('specs');

  // Fetch live exchange rate
  useEffect(() => {
    getUSDToIDRRate().then((rate) => {
      if (rate && rate > 0) setExchangeRate(rate);
    });
  }, []);

  useEffect(() => {
    let active = true;
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // 1. Check synchronous cache / mock first for instant feedback
    const cached = getProductById(id);
    if (cached) {
      setProduct(cached);
      setLoading(false);
    }

    // 2. Fetch latest from API (handles database UUIDs as well)
    getProductByIdAsync(id)
      .then((found) => {
        if (active) {
          if (found) {
            setProduct(found);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Failed to load product by id:', err);
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (product?.thumbnail?.url) {
      setSelectedImage(product.thumbnail.url);
    } else if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    } else {
      setSelectedImage(null);
    }
  }, [product]);

  if (loading && !product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-base)' }}>
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              {lang === 'id' ? 'Memuat detail produk...' : 'Loading product details...'}
            </p>
          </div>
        </main>
      </>
    );
  }

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

  const name = typeof product.name === 'string' ? product.name : (lang === 'id' ? product.name.id : product.name.en);
  const shortDesc = typeof product.shortDescription === 'string' ? product.shortDescription : (lang === 'id' ? product.shortDescription?.id : product.shortDescription?.en) || '';
  const description = typeof product.description === 'string' ? product.description : (lang === 'id' ? product.description?.id : product.description?.en) || '';
  const swatch = CATEGORY_COLORS[product.category] || CATEGORY_COLORS['Kayu & Palet'];

  // Currency calculation: Rupiah from API converted to USD via live rate
  const rawIDR = product.pricing?.sellPriceIDR;
  const indicativePrice =
    rawIDR && rawIDR > 0
      ? Number((rawIDR / exchangeRate).toFixed(2))
      : product.pricing?.indicativeUSD ?? 0;

  const moqAmount = product.pricing?.moqAmount ?? 1;
  const moqUnit = product.pricing?.moqUnit ?? 'unit';
  const priceUnit = product.pricing?.unit ?? 'unit';
  const trueQty = moqAmount * qty;
  const lineTotal = Number((indicativePrice * trueQty).toFixed(2));
  const priceNote = product.pricing?.note
    ? (typeof product.pricing.note === 'string' ? product.pricing.note : (lang === 'id' ? product.pricing.note.id : product.pricing.note.en))
    : '';
  const specs = product.specs ?? [];
  const applications = product.applications ?? [];
  const packagingOptions = product.packagingOptions ?? [];
  const availableDocs = product.availableDocs ?? [];
  const leadTimeDays = product.leadTimeDays ?? { min: 7, max: 14 };

  const copy = {
    id: {
      back: '← Semua Produk',
      indicativePrice: 'Harga Indikatif (USD)',
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
      estimatedTotal: 'Estimasi Nilai Order',
      liveRateNotice: `Kurs real-time: 1 USD ≈ Rp ${Math.round(exchangeRate).toLocaleString('id-ID')}`,
      disclaimer: 'Harga dikonversi secara real-time dari mata uang IDR ke USD berdasarkan kurs pasar terkini. Penawaran final diterbitkan oleh tim sales.',
    },
    en: {
      back: '← All Products',
      indicativePrice: 'Indicative Price (USD)',
      per: 'per',
      moq: 'Min. Order',
      qty: 'Quantity (MOQ units)',
      addToCart: 'Add to Cart',
      added: 'Added!',
      requestQuote: 'Request Manual Quote',
      tabSpecs: 'Technical Specifications',
      tabApp: 'Industrial Applications',
      tabDocs: 'Documents & Packaging',
      availableDocs: 'Available Documents',
      packagingOptions: 'Packaging Options',
      leadTime: 'Lead Time',
      businessDays: 'business days',
      estimatedTotal: 'Estimated Order Value',
      liveRateNotice: `Real-time Rate: 1 USD ≈ Rp ${Math.round(exchangeRate).toLocaleString('id-ID')}`,
      disclaimer: 'Prices converted in real-time from IDR to USD using current market exchange rates. Final quotes issued by sales team.',
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

            {/* Left: Image / Gallery */}
            <div className="sticky top-24">
              {selectedImage ? (
                <div className="flex flex-col gap-3">
                  <div
                    className="w-full aspect-square rounded border flex items-center justify-center relative overflow-hidden bg-white shadow-sm"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <img
                      src={selectedImage}
                      alt={name}
                      className="w-full h-full object-contain p-4"
                    />
                    <span
                      className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded shadow-sm text-white"
                      style={{ backgroundColor: swatch.text, fontFamily: 'var(--font-mono)' }}
                    >
                      {product.grade}
                    </span>
                  </div>

                  {/* Multiple images thumbnail selector */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {product.images.map((img) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => setSelectedImage(img.url)}
                          className={`w-16 h-16 rounded border overflow-hidden flex-shrink-0 transition-all ${
                            selectedImage === img.url
                              ? 'ring-2 ring-emerald-600 border-emerald-600 scale-105'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          style={{ borderColor: 'var(--border)', backgroundColor: '#f9fbf9' }}
                        >
                          <img src={img.url} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Available docs below image on desktop */}
                  <div className="mt-2 hidden lg:flex flex-wrap gap-2">
                    {availableDocs.map((doc) => (
                      <span
                        key={doc}
                        className="text-xs px-2.5 py-1 rounded border font-medium"
                        style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', fontFamily: 'var(--font-mono)' }}
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <>
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
                    {availableDocs.map((doc) => (
                      <span key={doc} className="text-xs px-2.5 py-1 rounded border font-medium" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', fontFamily: 'var(--font-mono)' }}>
                        {doc}
                      </span>
                    ))}
                  </div>
                </>
              )}
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
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                    {copy.indicativePrice}
                  </p>
                  {rawIDR && rawIDR > 0 && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-base)', color: 'var(--text-secondary)' }}>
                      Rp {rawIDR.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                    ${indicativePrice < 1 && indicativePrice > 0 ? indicativePrice.toFixed(2) : indicativePrice.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-base" style={{ color: 'var(--text-muted)' }}>
                    / {priceUnit}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                  <span><span className="font-semibold">{copy.moq}:</span> {moqAmount} {moqUnit}</span>
                  <span>·</span>
                  <span><span className="font-semibold">{copy.leadTime}:</span> {leadTimeDays.min}–{leadTimeDays.max} {copy.businessDays}</span>
                </div>

                {/* Exchange rate badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs" style={{ backgroundColor: '#EAF3EE', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)' }}>
                  <span>💱</span>
                  <span>{copy.liveRateNotice}</span>
                </div>

                {priceNote && <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{priceNote}</p>}

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
                    = {trueQty} {moqUnit}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-5 py-3 border-t border-b" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{copy.estimatedTotal}</span>
                  <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                    ${lineTotal < 1 && lineTotal > 0 ? lineTotal.toFixed(2) : lineTotal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
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

        {/* Detail tabs */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <div className="border-b mb-8" style={{ borderColor: 'var(--border)' }}>
            <div className="flex gap-8" role="tablist">
              {(['specs', 'applications', 'docs'] as const).map((tab) => {
                const label = {
                  specs: copy.tabSpecs,
                  applications: copy.tabApp,
                  docs: copy.tabDocs,
                }[tab];
                return (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className="pb-4 text-sm font-semibold transition-colors relative"
                    style={{
                      color: activeTab === tab ? 'var(--accent-green)' : 'var(--text-muted)',
                      borderBottom: activeTab === tab ? '2px solid var(--accent-green)' : '2px solid transparent',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab: Specs */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, i) => (
                <div key={i} className="p-4 rounded border flex justify-between items-center" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{spec.key}</span>
                  <span className="text-sm font-bold text-right" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>{spec.value}</span>
                </div>
              ))}
              {specs.length === 0 && (
                <p className="text-sm text-gray-500">{lang === 'id' ? 'Belum ada spesifikasi teknis.' : 'No technical specifications available.'}</p>
              )}
            </div>
          )}

          {/* Tab: Applications */}
          {activeTab === 'applications' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {applications.map((app, i) => {
                const text = typeof app === 'string' ? app : (lang === 'id' ? app.id : app.en);
                return (
                  <div key={i} className="p-4 rounded border flex items-center gap-3" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-green)' }} />
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{text}</span>
                  </div>
                );
              })}
              {applications.length === 0 && (
                <p className="text-sm text-gray-500">{lang === 'id' ? 'Belum ada aplikasi industri.' : 'No industrial applications listed.'}</p>
              )}
            </div>
          )}

          {/* Tab: Docs & Packaging */}
          {activeTab === 'docs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {copy.availableDocs}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableDocs.map((doc) => (
                    <span key={doc} className="px-3 py-1.5 rounded border text-sm font-medium" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                      📄 {doc}
                    </span>
                  ))}
                  {availableDocs.length === 0 && (
                    <p className="text-sm text-gray-500">{lang === 'id' ? 'Tidak ada dokumen yang dicantumkan.' : 'No documents listed.'}</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {copy.packagingOptions}
                </h3>
                <div className="flex flex-col gap-2">
                  {packagingOptions.map((opt, i) => (
                    <div key={i} className="p-3 rounded border text-sm" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                      📦 {opt}
                    </div>
                  ))}
                  {packagingOptions.length === 0 && (
                    <p className="text-sm text-gray-500">{lang === 'id' ? 'Tidak ada opsi kemasan yang dicantumkan.' : 'No packaging options listed.'}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

      </main>
    </>
  );
}
