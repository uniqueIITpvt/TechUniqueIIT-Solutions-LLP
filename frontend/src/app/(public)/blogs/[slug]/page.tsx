import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import type { Blog } from '@/types/blog';
import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import BlogDetailClient from './BlogDetailClient';

const DEFAULT_SITE_URL = 'https://www.techuniqueiit.com';
const FALLBACK_BLOG_IMAGE = '/blogs/blogs-1.jpg';
const PRODUCTION_BACKEND_HOST = 'tech-unique-iit-solutions-llp-updat.vercel.app';

export const revalidate = 300;

type PageProps = {
  params: {
    slug: string;
  };
};

type BlogApiResponse = {
  success?: boolean;
  data?: Blog;
  blog?: Blog;
} & Partial<Blog>;

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

const normalizeBlogResponse = (payload: BlogApiResponse): Blog | null => {
  if (payload.success && payload.data) {
    return payload.data;
  }

  if (payload.blog) {
    return payload.blog;
  }

  if (payload._id && payload.title && payload.slug) {
    return payload as Blog;
  }

  return null;
};

const normalizeImageUrl = (imagePath?: string) => {
  const normalizedPath = imagePath?.trim();

  if (!normalizedPath || normalizedPath === 'default-blog.jpg') {
    return FALLBACK_BLOG_IMAGE;
  }

  if (normalizedPath.startsWith(`http://${PRODUCTION_BACKEND_HOST}`)) {
    return normalizedPath.replace('http://', 'https://');
  }

  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith('/')) {
    return normalizedPath;
  }

  return `${getApiBaseUrl()}/uploads/${normalizedPath}`;
};

const getAbsoluteUrl = (pathOrUrl: string) => {
  return new URL(pathOrUrl, getSiteUrl()).toString();
};

const getAuthorName = (author: Blog['author']) => {
  return typeof author === 'object' ? author.name : 'TechUniqueIIT Team';
};

const fetchBlogBySlug = cache(async (slug: string): Promise<Blog | null> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/api/blogs/slug/${slug}`, {
      next: { revalidate },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as BlogApiResponse;
    return normalizeBlogResponse(payload);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await fetchBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = blog.title;
  const description = blog.summary || `${blog.title} by TechUniqueIIT Solutions LLP.`;
  const canonicalPath = `/blogs/${blog.slug}`;
  const imageUrl = getAbsoluteUrl(normalizeImageUrl(blog.featuredImage));

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonicalPath,
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [getAuthorName(blog.author)],
      tags: blog.tags,
      images: [
        {
          url: imageUrl,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

const buildBlogPostingJsonLd = (blog: Blog) => {
  const imageUrl = getAbsoluteUrl(normalizeImageUrl(blog.featuredImage));

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.summary,
    image: imageUrl,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Person',
      name: getAuthorName(blog.author),
    },
    publisher: {
      '@type': 'Organization',
      name: 'TechUniqueIIT Solutions LLP',
      logo: {
        '@type': 'ImageObject',
        url: getAbsoluteUrl('/techuniqueiit-new-logo.svg'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': getAbsoluteUrl(`/blogs/${blog.slug}`),
    },
    keywords: blog.tags,
    articleSection: blog.category,
  };
};

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await fetchBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          buildBlogPostingJsonLd(blog),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: '/blogs' },
            { name: blog.title, path: `/blogs/${blog.slug}` },
          ]),
        ]}
      />
      <BlogDetailClient blog={blog} />
    </>
  );
}
