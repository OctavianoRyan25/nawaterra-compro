export type DocumentType = 'CoA' | 'MSDS' | 'Phytosanitary' | 'ISPM-15' | 'Packing List';
export type CategoryKey = 'Kayu & Palet' | 'Agrikultur' | 'Mineral';

export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: { id: string; en: string };
  category: CategoryKey;
  grade: string;
  shortDescription: { id: string; en: string };
  description: { id: string; en: string };
  pricing: {
    indicativeUSD: number;
    unit: string;
    moqAmount: number;
    moqUnit: string;
    note: { id: string; en: string };
  };
  specs: ProductSpec[];
  applications: { id: string; en: string }[];
  packagingOptions: string[];
  leadTimeDays: { min: number; max: number };
  availableDocs: DocumentType[];
  tags: string[];
}

/* ─── MOCK DATA ─────────────────────────────────────────────────────────────
   All prices are INDICATIVE only — for display and UX testing purposes.
   Final pricing is negotiated per order with the sales team.
   TODO: replace with real API data from backend.
   ──────────────────────────────────────────────────────────────────────── */

const priceNote = {
  id: 'Harga indikatif. Penawaran final berdasarkan volume, grade spesifik, dan kondisi pasar saat order.',
  en: 'Indicative price. Final offer based on volume, specific grade, and market conditions at time of order.',
};

export const PRODUCTS: Product[] = [
  {
    id: 'wood-pallet-ht',
    name: { id: 'Wood Pallet Heat Treated', en: 'Heat Treated Wood Pallet' },
    category: 'Kayu & Palet',
    grade: 'ISPM-15 Compliant',
    shortDescription: {
      id: 'Palet kayu sengon/pinus terstandar ISPM-15, siap ekspor ke semua negara tujuan.',
      en: 'Sengon/pine wood pallets certified to ISPM-15, cleared for export to all destination countries.',
    },
    description: {
      id: 'Palet kayu kami diproduksi dari kayu sengon atau pinus pilihan, diproses melalui heat treatment (HT) yang terverifikasi untuk memenuhi standar ISPM-15. Setiap palet dilengkapi marking resmi IPPC. Tersedia dalam dimensi standar ekspor maupun custom sesuai kebutuhan klien.',
      en: 'Our wood pallets are manufactured from selected sengon or pine timber, processed through verified heat treatment (HT) compliant with ISPM-15. Each pallet carries the official IPPC marking. Available in standard export dimensions and custom sizes per client requirements.',
    },
    pricing: {
      indicativeUSD: 8,
      unit: 'unit',
      moqAmount: 500,
      moqUnit: 'units',
      note: priceNote,
    },
    specs: [
      { key: 'Dimensions (standard)', value: '1200 × 1000 mm' },
      { key: 'Timber species', value: 'Sengon (Albizia) / Pine' },
      { key: 'Treatment', value: 'Heat Treatment (HT) ≥56°C / 30 min' },
      { key: 'Standard', value: 'ISPM-15 / IPPC Marking' },
      { key: 'Moisture Content', value: '≤18%' },
      { key: 'Static Load Capacity', value: '1,500 kg' },
      { key: 'Dynamic Load Capacity', value: '1,000 kg' },
      { key: 'Type', value: '4-way entry, stringer / block' },
    ],
    applications: [
      { id: 'Logistik dan pergudangan ekspor', en: 'Export logistics and warehousing' },
      { id: 'Distribusi FMCG dan manufaktur', en: 'FMCG and manufacturing distribution' },
      { id: 'Peti kemasan produk berat', en: 'Heavy product packaging crates' },
      { id: 'Industri otomotif dan suku cadang', en: 'Automotive and spare parts industry' },
    ],
    packagingOptions: ['Loose / bulk', 'Strapped bundle (25 units)', 'Custom bundle per request'],
    leadTimeDays: { min: 14, max: 21 },
    availableDocs: ['ISPM-15', 'Packing List'],
    tags: ['kayu', 'palet', 'ekspor', 'ISPM-15', 'wood', 'pallet'],
  },
  {
    id: 'timber-kiln-dried',
    name: { id: 'Kayu Olahan Kiln-Dried', en: 'Kiln-Dried Processed Timber' },
    category: 'Kayu & Palet',
    grade: 'Grade A / Grade B',
    shortDescription: {
      id: 'Kayu sengon/pinus olahan dengan proses pengeringan kiln, moisture content terkontrol 8–12%.',
      en: 'Processed sengon/pine timber via kiln drying, moisture content controlled at 8–12%.',
    },
    description: {
      id: 'Kayu olahan kiln-dried kami dihasilkan dari kayu sengon atau pinus yang dikeringkan secara mekanis menggunakan kiln dryer bersuhu terkontrol. Proses ini menghasilkan kadar air yang konsisten antar batch dan mencegah deformasi pasca pengiriman. Tersedia dalam berbagai dimensi custom sesuai kebutuhan konstruksi atau manufaktur klien.',
      en: 'Our kiln-dried timber is produced from sengon or pine dried mechanically using temperature-controlled kiln dryers. This process delivers consistent moisture content across batches and prevents post-shipment deformation. Available in custom dimensions to suit construction or manufacturing requirements.',
    },
    pricing: {
      indicativeUSD: 320,
      unit: 'MT',
      moqAmount: 5,
      moqUnit: 'MT',
      note: priceNote,
    },
    specs: [
      { key: 'Species', value: 'Sengon (Albizia) / Pinus merkusii' },
      { key: 'Moisture Content', value: '8–12% (kiln-dried)' },
      { key: 'Grade A', value: 'Clear, minimal defect ≤5%' },
      { key: 'Grade B', value: 'Small knots allowed, defect ≤15%' },
      { key: 'Dimensions', value: 'Custom (thickness × width × length per order)' },
      { key: 'Surface', value: 'Rough sawn / S4S (surfaced 4 sides)' },
      { key: 'Certification', value: 'SVLK (Timber Legality Verification)' },
    ],
    applications: [
      { id: 'Konstruksi bangunan ringan', en: 'Light construction' },
      { id: 'Manufaktur furnitur dan kabinetri', en: 'Furniture and cabinetry manufacturing' },
      { id: 'Peti kayu ekspor dan kemasan industri', en: 'Export wooden crates and industrial packaging' },
      { id: 'Interior finishing', en: 'Interior finishing' },
    ],
    packagingOptions: ['Strapped bundle', 'Kiln-dried wrapped bundle', 'Container-ready pack'],
    leadTimeDays: { min: 10, max: 18 },
    availableDocs: ['CoA', 'Packing List'],
    tags: ['kayu', 'timber', 'sengon', 'pinus', 'kiln-dried'],
  },
  {
    id: 'cpo',
    name: { id: 'Crude Palm Oil (CPO)', en: 'Crude Palm Oil (CPO)' },
    category: 'Agrikultur',
    grade: 'Standard Grade',
    shortDescription: {
      id: 'CPO berkualitas standar untuk industri pangan, oleokimia, dan biodiesel.',
      en: 'Standard quality CPO for food, oleochemical, and biodiesel industries.',
    },
    description: {
      id: 'Crude Palm Oil (CPO) kami bersumber dari perkebunan kelapa sawit di Sumatera dan Kalimantan dengan rantai pasok terdokumentasi. Setiap batch disertai Certificate of Analysis (CoA) yang mencakup parameter FFA, DOBI, moisture, dan impurities. Pengiriman tersedia dalam drum, flexibag, atau isotank sesuai instruksi pembeli.',
      en: 'Our CPO is sourced from palm plantations in Sumatra and Kalimantan with documented supply chains. Each batch is accompanied by a Certificate of Analysis (CoA) covering FFA, DOBI, moisture, and impurity parameters. Delivery available in drums, flexibags, or isotanks per buyer instructions.',
    },
    pricing: {
      indicativeUSD: 870,
      unit: 'MT',
      moqAmount: 20,
      moqUnit: 'MT',
      note: priceNote,
    },
    specs: [
      { key: 'Free Fatty Acid (FFA)', value: '≤5.0%' },
      { key: 'Moisture & Impurities', value: '≤0.25%' },
      { key: 'DOBI', value: '≥2.5' },
      { key: 'Iodine Value', value: '50–55 g I₂/100g' },
      { key: 'Color (Lovibond 5.25")', value: '≤3.5 Red' },
      { key: 'Melting Point', value: '33–39°C' },
    ],
    applications: [
      { id: 'Industri minyak goreng dan margarin', en: 'Cooking oil and margarine manufacturing' },
      { id: 'Oleokimia: asam lemak, gliserol', en: 'Oleochemicals: fatty acids, glycerol' },
      { id: 'Biodiesel (FAME / HVO)', en: 'Biodiesel (FAME / HVO)' },
      { id: 'Industri sabun dan deterjen', en: 'Soap and detergent manufacturing' },
    ],
    packagingOptions: ['Flexi-tank (20 MT)', 'Isotank', '200L drum', 'Bulk vessel (per negotiation)'],
    leadTimeDays: { min: 7, max: 14 },
    availableDocs: ['CoA', 'MSDS', 'Packing List'],
    tags: ['CPO', 'palm oil', 'oleokimia', 'biodiesel', 'agrikultur'],
  },
  {
    id: 'robusta-coffee',
    name: { id: 'Robusta Green Coffee', en: 'Robusta Green Coffee Beans' },
    category: 'Agrikultur',
    grade: 'Grade 1 / Grade 2',
    shortDescription: {
      id: 'Biji kopi hijau Robusta dari Sumatera, siap ekspor dengan dokumen phytosanitary.',
      en: 'Robusta green coffee beans from Sumatra, export-ready with phytosanitary documentation.',
    },
    description: {
      id: 'Robusta green coffee kami bersumber dari wilayah produksi utama Lampung dan Sumatera Selatan. Proses sorting dan grading dilakukan secara mekanis dan manual untuk memastikan keseragaman ukuran biji dan nilai defect yang terstandar. Tersedia dalam grade 1 (specialty) dan grade 2 (commercial).',
      en: 'Our Robusta green coffee is sourced from primary growing regions in Lampung and South Sumatra. Sorting and grading is performed mechanically and manually to ensure consistent bean size and standardized defect values. Available in Grade 1 (specialty) and Grade 2 (commercial).',
    },
    pricing: {
      indicativeUSD: 2800,
      unit: 'MT',
      moqAmount: 1,
      moqUnit: 'MT',
      note: priceNote,
    },
    specs: [
      { key: 'Grade 1 — Defect Value', value: '≤11' },
      { key: 'Grade 2 — Defect Value', value: '12–25' },
      { key: 'Moisture Content', value: '12–13%' },
      { key: 'Screen Size', value: '≥16 (Grade 1), ≥15 (Grade 2)' },
      { key: 'Triage', value: '≤1% (Grade 1)' },
      { key: 'Origin', value: 'Lampung / South Sumatra, Indonesia' },
      { key: 'Crop', value: 'Current crop (season specified per CoA)' },
    ],
    applications: [
      { id: 'Roastery dan blending kopi spesialti', en: 'Specialty coffee roastery and blending' },
      { id: 'Ekspor komoditas ke importir Eropa dan Asia', en: 'Commodity export to European and Asian importers' },
      { id: 'Industri kopi instan dan ekstraks', en: 'Instant coffee and extract manufacturing' },
    ],
    packagingOptions: ['60 kg burlap sack (GrainPro liner available)', 'Bulk container (FCL 20")', 'Custom packaging per request'],
    leadTimeDays: { min: 7, max: 14 },
    availableDocs: ['CoA', 'Phytosanitary', 'Packing List'],
    tags: ['kopi', 'coffee', 'robusta', 'green coffee', 'agrikultur'],
  },
  {
    id: 'cassia',
    name: { id: 'Cassia / Kayu Manis', en: 'Cassia / Cinnamon' },
    category: 'Agrikultur',
    grade: 'ASTA / FAQ Grade',
    shortDescription: {
      id: 'Kayu manis Cassia vera dari Sumatera Barat, tersedia dalam bentuk stik, broken, dan bubuk.',
      en: 'Cassia vera cinnamon from West Sumatra, available as sticks, broken, and powder.',
    },
    description: {
      id: 'Cassia kami bersumber dari perkebunan Cinnamomum burmannii di Sumatera Barat (Kerinci, Solok). Tersedia dalam beberapa form: stik utuh grade A, broken grade ASTA, dan bubuk 60-100 mesh. Kadar minyak atsiri yang tinggi menjadikan produk ini diminati oleh industri bumbu, farmasi, dan minuman fungsional global.',
      en: 'Our cassia is sourced from Cinnamomum burmannii plantations in West Sumatra (Kerinci, Solok). Available in several forms: grade A whole sticks, ASTA broken, and 60–100 mesh powder. High essential oil content makes this product sought-after by global spice, pharma, and functional beverage industries.',
    },
    pricing: {
      indicativeUSD: 1200,
      unit: 'MT',
      moqAmount: 1,
      moqUnit: 'MT',
      note: priceNote,
    },
    specs: [
      { key: 'Species', value: 'Cinnamomum burmannii (Cassia vera)' },
      { key: 'Essential Oil Content', value: '≥1.5%' },
      { key: 'Moisture Content', value: '≤13%' },
      { key: 'Broken & Foreign Matter', value: '≤5% (ASTA grade)' },
      { key: 'Stick Length (grade A)', value: '8–40 cm' },
      { key: 'Ash Content', value: '≤5%' },
      { key: 'Powder Mesh (powder form)', value: '60–100 mesh' },
    ],
    applications: [
      { id: 'Industri bumbu dan rempah', en: 'Spice and seasoning industry' },
      { id: 'Farmasi dan suplemen herbal', en: 'Pharmaceutical and herbal supplement' },
      { id: 'Minuman fungsional dan teh herbal', en: 'Functional beverage and herbal tea' },
      { id: 'Bakeri dan konfeksionari', en: 'Bakery and confectionery' },
    ],
    packagingOptions: ['25 kg carton box', '50 kg bag', 'Bulk bag (500 kg)'],
    leadTimeDays: { min: 10, max: 18 },
    availableDocs: ['CoA', 'MSDS', 'Phytosanitary', 'Packing List'],
    tags: ['cassia', 'kayu manis', 'cinnamon', 'rempah', 'spice'],
  },
  {
    id: 'coconut-charcoal',
    name: { id: 'Coconut Shell Charcoal', en: 'Coconut Shell Charcoal' },
    category: 'Agrikultur',
    grade: 'Briquette / Activation Grade',
    shortDescription: {
      id: 'Arang tempurung kelapa grade tinggi untuk BBQ briquette dan precursor activated carbon.',
      en: 'High-grade coconut shell charcoal for BBQ briquettes and activated carbon precursor.',
    },
    description: {
      id: 'Arang tempurung kelapa kami diproduksi dari tempurung kelapa tua terpilih melalui proses karbonisasi terkontrol. Kadar fixed carbon yang tinggi dan kandungan abu rendah menjadikannya bahan baku pilihan untuk briquette BBQ premium dan activated carbon grade industri. Tersedia dalam bentuk lumps, granular, dan powder.',
      en: 'Our coconut shell charcoal is produced from selected mature coconut shells through controlled carbonization. High fixed carbon content and low ash make it the preferred raw material for premium BBQ briquettes and industrial-grade activated carbon. Available in lump, granular, and powder forms.',
    },
    pricing: {
      indicativeUSD: 450,
      unit: 'MT',
      moqAmount: 5,
      moqUnit: 'MT',
      note: priceNote,
    },
    specs: [
      { key: 'Fixed Carbon (FC)', value: '≥78%' },
      { key: 'Ash Content', value: '≤4%' },
      { key: 'Volatile Matter (VM)', value: '≤18%' },
      { key: 'Moisture Content', value: '≤5%' },
      { key: 'Calorific Value', value: '≥7,000 kcal/kg' },
      { key: 'Form', value: 'Lumps / Granular / Powder' },
      { key: 'Granule Size (granular)', value: '2–8 mm' },
    ],
    applications: [
      { id: 'BBQ briquette premium', en: 'Premium BBQ briquette' },
      { id: 'Precursor activated carbon industri kimia', en: 'Activated carbon precursor for chemical industry' },
      { id: 'Penyaringan air dan gas', en: 'Water and gas filtration' },
      { id: 'Metalurgi dan reduksi logam', en: 'Metallurgy and metal reduction' },
    ],
    packagingOptions: ['25 kg woven PP bag', '500 kg bulk bag', 'Custom per buyer'],
    leadTimeDays: { min: 14, max: 21 },
    availableDocs: ['CoA', 'MSDS', 'Packing List'],
    tags: ['arang', 'charcoal', 'coconut', 'activated carbon', 'BBQ'],
  },
  {
    id: 'zeolite',
    name: { id: 'Zeolite Alam', en: 'Natural Zeolite' },
    category: 'Mineral',
    grade: 'Feed / Industrial Grade',
    shortDescription: {
      id: 'Zeolite alam klinoptilolit dari tambang Indonesia, tersedia dalam berbagai mesh size.',
      en: 'Natural clinoptilolite zeolite from Indonesian mines, available in multiple mesh sizes.',
    },
    description: {
      id: 'Zeolite alam kami bersumber dari deposit klinoptilolit berkualitas tinggi di Jawa Barat. Dengan kapasitas tukar kation (CEC) yang tinggi, zeolite ini banyak digunakan sebagai suplemen pakan ternak, media pengolahan air, dan bahan pendukung pupuk. Tersedia dalam grade feed, industrial, dan water treatment.',
      en: 'Our natural zeolite is sourced from high-quality clinoptilolite deposits in West Java. With high cation exchange capacity (CEC), this zeolite is widely used as animal feed supplement, water treatment media, and fertilizer support material. Available in feed, industrial, and water treatment grades.',
    },
    pricing: {
      indicativeUSD: 180,
      unit: 'MT',
      moqAmount: 10,
      moqUnit: 'MT',
      note: priceNote,
    },
    specs: [
      { key: 'Clinoptilolite Content', value: '≥60%' },
      { key: 'CEC (Cation Exchange Capacity)', value: '≥120 meq/100g' },
      { key: 'Moisture Content', value: '≤10%' },
      { key: 'Mesh Size', value: '10–60 mesh (adjustable)' },
      { key: 'SiO₂ Content', value: '≥65%' },
      { key: 'Al₂O₃ Content', value: '10–15%' },
      { key: 'pH', value: '6.5–8.0' },
    ],
    applications: [
      { id: 'Suplemen dan pengikat racun pakan ternak', en: 'Animal feed supplement and mycotoxin binder' },
      { id: 'Media pengolahan dan filtrasi air', en: 'Water treatment and filtration media' },
      { id: 'Pendukung pupuk slow-release', en: 'Slow-release fertilizer carrier' },
      { id: 'Adsorben industri kimia', en: 'Industrial chemical adsorbent' },
    ],
    packagingOptions: ['50 kg woven bag', '1,000 kg bulk bag (jumbo)', 'Bulk container'],
    leadTimeDays: { min: 10, max: 18 },
    availableDocs: ['CoA', 'MSDS', 'Packing List'],
    tags: ['zeolite', 'zeolit', 'mineral', 'klinoptilolit', 'pakan ternak'],
  },
  {
    id: 'bentonite',
    name: { id: 'Bentonite Clay', en: 'Bentonite Clay' },
    category: 'Mineral',
    grade: 'Drilling / Foundry Grade',
    shortDescription: {
      id: 'Bentonit Ca dan Na dari tambang Jawa untuk pengeboran, pengecoran, dan klarifikasi.',
      en: 'Ca and Na bentonite from Javanese mines for drilling, casting, and clarification.',
    },
    description: {
      id: 'Bentonite kami bersumber dari deposit smektit berkualitas di Jawa Tengah dan Jawa Timur. Tersedia dalam grade drilling (API 13A), foundry, dan food/beverage clarification. Kemampuan swelling dan viskositas yang tinggi menjadikannya bahan penting dalam pengeboran minyak dan pengecoran logam presisi.',
      en: 'Our bentonite is sourced from quality smectite deposits in Central and East Java. Available in drilling (API 13A), foundry, and food/beverage clarification grades. High swelling capacity and viscosity make it essential for oil drilling and precision metal casting.',
    },
    pricing: {
      indicativeUSD: 220,
      unit: 'MT',
      moqAmount: 10,
      moqUnit: 'MT',
      note: priceNote,
    },
    specs: [
      { key: 'Type', value: 'Calcium (Ca) / Sodium (Na) Bentonite' },
      { key: 'Swelling Index', value: '≥12 ml/2g (Na) / ≥5 ml/2g (Ca)' },
      { key: 'Moisture Content', value: '10–14%' },
      { key: 'Fineness', value: '200–325 mesh' },
      { key: 'Plastic Viscosity (API)', value: '≥15 cP (Drilling grade)' },
      { key: 'Yield Point', value: '≥10 lb/100ft² (Drilling grade)' },
      { key: 'Montmorillonite Content', value: '≥70%' },
    ],
    applications: [
      { id: 'Lumpur pengeboran minyak dan gas', en: 'Oil and gas drilling mud' },
      { id: 'Pengecoran logam (foundry sand binder)', en: 'Metal casting (foundry sand binder)' },
      { id: 'Klarifikasi wine, bir, dan jus', en: 'Wine, beer, and juice clarification' },
      { id: 'Geosynthetic clay liners (GCL)', en: 'Geosynthetic clay liners (GCL)' },
    ],
    packagingOptions: ['50 kg paper bag', '1,000 kg bulk bag', 'Bulk tanker (per negotiation)'],
    leadTimeDays: { min: 10, max: 18 },
    availableDocs: ['CoA', 'MSDS', 'Packing List'],
    tags: ['bentonite', 'bentonit', 'mineral', 'drilling', 'foundry'],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: CategoryKey): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}
