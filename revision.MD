# Analisis Website — PT Nawaterra Indo Global
**URL:** https://www.nawaterraindoglobal.com/
**Tanggal analisis:** 23 September 2026

## Ringkasan
Website ini adalah company profile B2B untuk perusahaan pengolahan & distribusi komoditas ekspor (palet kayu, agrikultur, mineral). Strukturnya sudah cukup baik (hero → alur operasional → produk → rantai pasok → kontak), tapi ada sejumlah kekurangan yang cukup krusial untuk website B2B yang menyasar buyer korporat/ekspor.

---

## 1. Kredibilitas & Legalitas Perusahaan
- **Tidak ada halaman "Tentang Kami"** — tidak dijelaskan sejak kapan berdiri, sejarah perusahaan, visi-misi, atau skala operasi (jumlah karyawan, luas fasilitas, kapasitas produksi).
- **Tidak ada informasi legal**: NIB, akta pendirian, sertifikat SNI/ISO, izin ekspor, NPWP perusahaan — padahal untuk buyer B2B/ekspor, dokumen legalitas ini sering jadi syarat due diligence awal.
- **Tidak ada alamat kantor/pabrik fisik** dan tidak ada peta lokasi (Google Maps embed). Buyer luar negeri biasanya ingin tahu lokasi fasilitas untuk estimasi logistik.
- **Tidak ada nomor telepon/WhatsApp** — hanya email dan form. Untuk komunikasi B2B lintas zona waktu, kontak langsung (WA Business/telepon) penting.
- **Tidak ada bukti sertifikasi** (ISPM-15, HACCP, ISO 9001/22000, dll.) walau disebut di teks produk (mis. "ISPM-15 Compliant") — tidak ada file/badge sertifikat yang bisa diverifikasi.

## 2. Bukti Sosial (Social Proof)
- **Tidak ada daftar klien/buyer**, testimoni, logo partner, atau studi kasus pengiriman.
- **Tidak ada angka pencapaian** (volume ekspor per tahun, jumlah negara tujuan, jumlah batch terkirim, dsb.) yang biasa dipakai untuk membangun kepercayaan cepat.
- **Tidak ada foto fasilitas/pabrik/gudang asli** — gambar yang dipakai (hero-visual.jpg, banner.jpeg) tampak generik/stok, bukan foto operasional nyata. Ini bisa menurunkan kepercayaan buyer serius.

## 3. Konten Produk
- Spesifikasi produk (MC, grade, dsb.) sudah detail, tapi **tidak ada foto produk aktual per item** — hanya teks spesifikasi.
- **Tidak ada info harga/range harga atau MOQ (minimum order quantity)** — wajar untuk B2B, tapi tidak ada juga simulasi/price list indikatif yang bisa mempercepat filtering buyer.
- **Tidak ada dokumen sample** (contoh CoA, packing list) yang bisa diunduh untuk meyakinkan buyer soal standar dokumentasi.
- Tombol "Lihat Detail" mengarah ke halaman produk terpisah — perlu dicek apakah halaman detail benar-benar lengkap (tidak dianalisis di sini).

## 4. Elemen UX yang Janggal
- **Model dual-channel (lokal via cart langsung, luar negeri via penawaran/RFQ) tidak dijelaskan di halaman.** Saat ini fitur "Keranjang" hanya muncul di footer tanpa konteks — pengunjung (terutama buyer luar negeri) tidak langsung paham bahwa jalur pembelian berbeda untuk lokal vs ekspor. Perlu ditambahkan penjelasan eksplisit di halaman, misalnya section singkat "Cara Membeli": *"Buyer domestik dapat order langsung melalui katalog & keranjang. Buyer internasional/ekspor menghubungi tim B2B untuk penawaran & dokumen ekspor."*
- Tidak jelas apakah **toggle "Lokal / Ekspor" atau semacamnya** ada untuk mengarahkan pengunjung ke jalur yang tepat sejak awal (misalnya berdasarkan pilihan negara) — saat ini navigasi produk sama untuk semua pengunjung.
- **Toggle bahasa "ID / EN"** ada di navbar, tapi tidak jelas apakah versi Inggris benar-benar lengkap/diterjemahkan dengan baik — penting karena target pasarnya B2B global, dan idealnya versi EN mengarahkan otomatis ke jalur penawaran/RFQ (bukan cart) karena audiensnya kemungkinan besar buyer luar negeri.
- Tidak ada **live chat / chatbot** untuk pertanyaan cepat, padahal buyer internasional sering di zona waktu berbeda.

## 5. SEO & Metadata
- Meta description dan title sudah ada dan cukup deskriptif, nilai plus.
- Namun **tidak terlihat structured data (schema.org)** untuk Organization/Product yang bisa membantu tampil lebih baik di hasil pencarian Google (rich snippet).
- **Tidak ada blog/news/insight section** — untuk SEO jangka panjang dan menunjukkan aktivitas/expertise perusahaan, ini biasanya penting (artikel tentang tren komoditas, update ekspor, dsb.).
- Tidak terlihat ada sitemap.xml/robots.txt yang direferensikan secara eksplisit di halaman (perlu dicek terpisah).

## 6. Media Sosial & Multi-channel
- **Tidak ada tautan ke media sosial** (LinkedIn, Instagram, dll.) — LinkedIn khususnya penting untuk kredibilitas B2B dan networking dengan buyer korporat.
- Tidak ada link ke marketplace B2B (Alibaba, Indonesian Trade, dsb.) yang biasa dipakai exporter untuk memperluas jangkauan.

## 7. Form Kontak / Lead Generation
- Form inquiry sudah cukup baik (nama PIC, perusahaan, email bisnis, produk, pesan) — poin positif.
- Tapi **tidak ada nomor telepon/WA di form**, hanya email bisnis — mengurangi opsi follow-up cepat.
- **Tidak ada notifikasi/CTA alternatif** seperti "Download Katalog PDF" secara instan (link "Minta Katalog" di navbar mengarah ke form, bukan unduhan langsung) — banyak buyer B2B lebih suka langsung unduh katalog PDF tanpa harus mengisi form dulu.

## 8. Aksesibilitas & Performa (perlu verifikasi teknis lebih lanjut)
- Gambar-gambar besar (hero-visual.jpg dengan width 3840px) berpotensi memperlambat loading di koneksi lambat — perlu dicek optimasi image lebih lanjut (lazy loading, compressive format seperti WebP/AVIF sudah terlihat dipakai via Next.js image optimizer, jadi ini kemungkinan sudah tertangani sebagian).
- Perlu audit lebih lanjut untuk skor Core Web Vitals, kontras warna, dan alt text gambar (tidak bisa dipastikan dari hasil fetch ini).

---

## Rekomendasi Prioritas
1. Tambahkan halaman **"Tentang Kami"** lengkap dengan legalitas, sejarah, dan kapasitas produksi.
2. Sertakan **foto fasilitas/pabrik asli**, bukan gambar generik.
3. Tambahkan penjelasan eksplisit di halaman tentang **dua jalur pembelian** (lokal langsung via cart vs ekspor via penawaran/RFQ), misalnya lewat banner singkat atau section "Cara Membeli", agar pengunjung tidak bingung melihat fitur keranjang.
4. Tambahkan **nomor WhatsApp Business/telepon** yang mudah diakses.
5. Tambahkan **social proof**: daftar klien/negara tujuan ekspor, sertifikasi terverifikasi, testimoni.
6. Sediakan **katalog PDF unduh langsung** tanpa harus mengisi form dulu.
7. Tambahkan **link LinkedIn perusahaan** dan media sosial lain untuk kredibilitas B2B.
8. Pertimbangkan menambahkan **structured data (schema.org)** untuk SEO dan blog/insight section untuk konten jangka panjang.