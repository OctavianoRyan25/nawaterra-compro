import type { Metadata } from 'next';
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
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
  title: 'PT Nawaterra Indo Global | Hilirisasi Komoditas Hasil Alam',
  description:
    'Pengolahan dan distribusi komoditas hasil alam bernilai tambah tinggi untuk pasar B2B global dan domestik. Standar mutu ekspor, rantai pasok terdokumentasi.',
  metadataBase: new URL('https://nawaterraindoglobal.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PT Nawaterra Indo Global',
    description:
      'Pengolahan komoditas hasil alam untuk pasar B2B global. Wood pallet, agrikultur, dan mineral olahan berstandar ekspor.',
    url: 'https://nawaterraindoglobal.com',
    siteName: 'PT Nawaterra Indo Global',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
