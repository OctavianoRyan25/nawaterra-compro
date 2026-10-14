// Service to fetch live exchange rate from https://api.exchangerate.fun/latest?base=USD

let cachedRate: number | null = null;
let lastFetched: number = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export async function getUSDToIDRRate(): Promise<number> {
  const now = Date.now();
  if (typeof cachedRate === 'number' && now - lastFetched < CACHE_TTL_MS) {
    return cachedRate;
  }

  try {
    const res = await fetch('https://api.exchangerate.fun/latest?base=USD', {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      const rate = data?.rates?.IDR;
      if (typeof rate === 'number' && rate > 0) {
        cachedRate = rate;
        lastFetched = now;
        return rate;
      }
    }
  } catch (err) {
    console.warn('[getUSDToIDRRate] Failed to fetch live rate, using fallback:', err);
  }

  return typeof cachedRate === 'number' ? cachedRate : 16000;
}
