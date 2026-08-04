import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { BlogHero } from '@/components/Blogs/BlogHero';
import FeaturedBlogs from '@/components/Blogs/FeaturedBlogs';
import BlogList from '@/components/Blogs/BlogList';
import type { Blog } from '@/types/blog';

const DEFAULT_SITE_URL = 'https://www.techuniqueiit.com';

export const revalidate = 300;

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

const getSiteUrl = () => {
  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      vercelUrl ||
      DEFAULT_SITE_URL
  );
};

const getApiBaseUrl = () => {
  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_URL || process.env.SITE_URL || getSiteUrl()
  );
};

const isBlog = (value: unknown): value is Blog => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const blog = value as Partial<Blog>;
  return Boolean(blog._id && blog.title && blog.slug);
};

const getBlogArray = (value: unknown): Blog[] => {
  return Array.isArray(value) ? value.filter(isBlog) : [];
};

const normalizeBlogsResponse = (payload: unknown): Blog[] => {
  if (Array.isArray(payload)) {
    return getBlogArray(payload);
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const response = payload as {
    data?: unknown;
    blogs?: unknown;
  };

  if (Array.isArray(response.data)) {
    return getBlogArray(response.data);
  }

  if (Array.isArray(response.blogs)) {
    return getBlogArray(response.blogs);
  }

  if (response.data && typeof response.data === 'object') {
    const nestedData = response.data as {
      data?: unknown;
      blogs?: unknown;
    };

    if (Array.isArray(nestedData.data)) {
      return getBlogArray(nestedData.data);
    }

    if (Array.isArray(nestedData.blogs)) {
      return getBlogArray(nestedData.blogs);
    }
  }

  return [];
};

const fetchPublishedBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(
      `${getApiBaseUrl()}/api/blogs?page=1&limit=100&status=published`,
      {
        headers: {
          Accept: 'application/json',
        },
        next: { revalidate },
      }
    );

    if (!response.ok) {
      return [];
    }

    return normalizeBlogsResponse(await response.json());
  } catch (error) {
    console.error('Error fetching public blogs:', error);
    return [];
  }
};

const getFeaturedBlogs = (blogs: Blog[]) => {
  return [...blogs]
    .sort((first, second) => (second.viewCount || 0) - (first.viewCount || 0))
    .slice(0, 3);
};

export default async function BlogsPage() {
  const blogs = await fetchPublishedBlogs();
  const featuredBlogs = getFeaturedBlogs(blogs);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blogs', path: '/blogs' },
        ])}
      />
      <div className='min-h-screen bg-white pb-16 md:pb-0'>
        <BlogHero />
        <FeaturedBlogs initialBlogs={featuredBlogs} />
        <BlogList initialBlogs={blogs} />
      </div>
    </>
  );
}

export const metadata = {
  title: 'Blogs',
  description:
    'Read TechUniqueIIT insights on software development, mobile apps, digital marketing, application maintenance, and practical technology delivery.',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    url: '/blogs',
  },
};