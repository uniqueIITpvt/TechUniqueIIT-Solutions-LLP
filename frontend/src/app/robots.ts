import type { MetadataRoute } from 'next';

const DEFAULT_SITE_URL = 'https://www.techuniqueiit.com';

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

const getSiteUrl = () => {
  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      DEFAULT_SITE_URL
  );
};

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/dashboard/', '/login', '/api', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
