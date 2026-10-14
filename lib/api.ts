import { Product, ProductImage, DocumentType, CategoryKey } from './products';
import { getUSDToIDRRate } from './exchangeRate';

const API_BASE_URL =
  process.env.API_URL?.replace(/\/$/, '') || 'http://crm.nawaterraindoglobal.com';

export interface BackendProductResponse {
  id: string;
  sku: string;
  name: { id: string; en: string };
  category: string;
  grade: string;
  short_description: { id: string; en: string };
  description: { id: string; en: string };
  pricing: {
    sell_price_idr?: number;
    indicative_usd?: number;
    unit: string;
    moq_amount: number;
    moq_unit: string;
    note: { id: string; en: string };
  };
  specs: Array<{ key: string; value: string }>;
  applications: Array<{ id: string; en: string }>;
  packaging_options: string[];
  lead_time_days: { min: number; max: number };
  available_docs: string[];
  tags: string[];
  thumbnail?: {
    id: string;
    product_id: string;
    url: string;
    public_id: string;
    is_thumbnail: boolean;
    sort_order: number;
    created_at?: string;
  } | null;
  images?: Array<{
    id: string;
    product_id: string;
    url: string;
    public_id: string;
    is_thumbnail: boolean;
    sort_order: number;
    created_at?: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

/**
 * Normalizes backend response format to the frontend Product interface,
 * converting sell_price_idr to USD using the live exchange rate.
 */
export function mapBackendToProduct(p: BackendProductResponse, usdRate: number = 16000): Product {
  const rawIDR = p.pricing?.sell_price_idr;
  let indicativeUSD = p.pricing?.indicative_usd ?? 0;
  if (rawIDR && rawIDR > 0) {
    indicativeUSD = Number((rawIDR / usdRate).toFixed(2));
  }

  const images: ProductImage[] = (p.images || []).map((img) => ({
    id: img.id,
    productId: img.product_id,
    url: img.url,
    isThumbnail: img.is_thumbnail,
    sortOrder: img.sort_order,
  }));

  const thumbnail: ProductImage | undefined = p.thumbnail
    ? {
        id: p.thumbnail.id,
        productId: p.thumbnail.product_id,
        url: p.thumbnail.url,
        isThumbnail: p.thumbnail.is_thumbnail,
        sortOrder: p.thumbnail.sort_order,
      }
    : images.find((i) => i.isThumbnail) || images[0];

  return {
    id: p.id,
    sku: p.sku,
    name: p.name || { id: '', en: '' },
    category: (p.category as CategoryKey) || 'Kayu & Palet',
    grade: p.grade || '',
    shortDescription: p.short_description || { id: '', en: '' },
    description: p.description || { id: '', en: '' },
    pricing: {
      indicativeUSD,
      sellPriceIDR: p.pricing?.sell_price_idr,
      unit: p.pricing?.unit || 'unit',
      moqAmount: p.pricing?.moq_amount || 1,
      moqUnit: p.pricing?.moq_unit || 'unit',
      note: p.pricing?.note || { id: '', en: '' },
    },
    specs: p.specs || [],
    applications: p.applications || [],
    packagingOptions: p.packaging_options || [],
    leadTimeDays: p.lead_time_days || { min: 7, max: 14 },
    availableDocs: (p.available_docs as DocumentType[]) || [],
    tags: p.tags || [],
    thumbnail: thumbnail ?? null,
    images,
  };
}

/**
 * Fetch public catalog products with live exchange rate calculation
 */
export async function fetchPublicProducts(options?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; total: number }> {
  try {
    const [rate, res] = await Promise.all([
      getUSDToIDRRate(),
      (async () => {
        const params = new URLSearchParams();
        if (options?.category && options.category !== 'all') {
          params.set('category', options.category);
        }
        if (options?.search) params.set('search', options.search);
        if (options?.page) params.set('page', String(options.page));
        if (options?.limit) params.set('limit', String(options.limit));

        const qs = params.toString();
        const url = `${API_BASE_URL}/public/v1/products${qs ? `?${qs}` : ''}`;
        return fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
      })(),
    ]);

    if (!res.ok) {
      console.warn(`[fetchPublicProducts] Backend responded with status ${res.status}`);
      return { products: [], total: 0 };
    }

    const json: ApiResponse<BackendProductResponse[]> = await res.json();
    if (!json.success || !Array.isArray(json.data)) {
      return { products: [], total: 0 };
    }

    return {
      products: json.data.map((p) => mapBackendToProduct(p, rate)),
      total: json.meta?.total ?? json.data.length,
    };
  } catch (err) {
    console.warn('[fetchPublicProducts] Failed to fetch products from backend:', err);
    return { products: [], total: 0 };
  }
}

/**
 * Fetch a single product by ID with live exchange rate calculation
 */
export async function fetchPublicProductById(id: string): Promise<Product | null> {
  try {
    const [rate, res] = await Promise.all([
      getUSDToIDRRate(),
      (async () => {
        const url = `${API_BASE_URL}/public/v1/products/${encodeURIComponent(id)}`;
        return fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
      })(),
    ]);

    if (!res.ok) {
      return null;
    }

    const json: ApiResponse<BackendProductResponse> = await res.json();
    if (!json.success || !json.data) {
      return null;
    }

    return mapBackendToProduct(json.data, rate);
  } catch (err) {
    console.warn(`[fetchPublicProductById] Failed to fetch product ${id}:`, err);
    return null;
  }
}

/**
 * Fetch active categories
 */
export async function fetchPublicCategories(): Promise<CategoryKey[]> {
  try {
    const url = `${API_BASE_URL}/public/v1/products/categories`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return ['Kayu & Palet', 'Agrikultur', 'Mineral'];
    }

    const json: ApiResponse<CategoryKey[]> = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
  } catch {
    // fallback
  }
  return ['Kayu & Palet', 'Agrikultur', 'Mineral'];
}
