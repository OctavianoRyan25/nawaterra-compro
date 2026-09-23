import type { Metadata } from 'next';
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nawaterraindoglobal.com'),
  title: 'PT Nawaterra Indo Global | Supplier Komoditas & Hilirisasi Hasil Alam',
  description:
    'Supplier komoditas Indonesia untuk kebutuhan B2B domestik dan ekspor. Palet kayu, agrikultur, dan mineral olahan dengan standar mutu yang siap dipakai pasar industri.',
  keywords: [
    'PT Nawaterra Indo Global',
    'supplier komoditas Indonesia',
    'komoditas ekspor Indonesia',
    'palet kayu ekspor',
    'agrikultur Indonesia',
    'mineral olahan',
    'supplier B2B komoditas',
    'hiliirisasi hasil alam Indonesia',
  ],
  applicationName: 'PT Nawaterra Indo Global',
  authors: [{ name: 'PT Nawaterra Indo Global' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      id: 'https://nawaterraindoglobal.com',
      en: 'https://nawaterraindoglobal.com',
    },
  },
  openGraph: {
    title: 'PT Nawaterra Indo Global | Supplier Komoditas Indonesia',
    description:
      'Komoditas hasil alam Indonesia untuk pasar B2B domestik dan internasional, termasuk palet kayu, produk agrikultur, dan mineral olahan.',
    url: 'https://nawaterraindoglobal.com',
    siteName: 'PT Nawaterra Indo Global',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Nawaterra Indo Global',
    description:
      'Supplier komoditas Indonesia untuk kebutuhan B2B domestik dan ekspor.',
  },
  other: {
    'theme-color': '#2D5A3D',
  },
  icons: {
    icon: '/icon.jpeg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <LanguageProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
