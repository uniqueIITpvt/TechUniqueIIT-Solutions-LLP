import type { MetadataRoute } from 'next';
import { servicePages } from '@/data/servicePages';

const DEFAULT_SITE_URL = 'https://www.techuniqueiit.com';

const staticRoutes = [
  '/',
  '/services',
  '/products',
  '/blogs',
  '/careers',
  '/company',
  '/company/faq',
  '/company/privacy',
  '/contact',
] as const;

const serviceRoutes = servicePages.map((service) => `/services/${service.slug}`);

type BlogSitemapItem = {
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};

type BlogsApiResponse = {
  success?: boolean;
  data?: BlogSitemapItem[];
};

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

const getSiteUrl = () => {
  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      DEFAULT_SITE_URL
  );
};

const getApiBaseUrl = () => {
  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_URL || process.env.SITE_URL || getSiteUrl()
  );
};

const getDate = (value?: string) => {
  if (!value) {
    return new Date();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
};

const fetchPublishedBlogs = async (): Promise<BlogSitemapItem[]> => {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/api/blogs?limit=100&status=published&select=slug,updatedAt,createdAt`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as BlogsApiResponse;
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const blogs = await fetchPublishedBlogs();

  const staticEntries: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...serviceRoutes,
  ].map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter((blog) => blog.slug)
    .map((blog) => ({
      url: new URL(`/blogs/${blog.slug}`, siteUrl).toString(),
      lastModified: getDate(blog.updatedAt || blog.createdAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  return [...staticEntries, ...blogEntries];
}

