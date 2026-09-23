import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout/', '/payment/', '/order-confirmation/'],
      },
    ],
    sitemap: 'https://nawaterraindoglobal.com/sitemap.xml',
  };
}
