'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaClock, FaTag, FaUser } from 'react-icons/fa';
import type { Blog } from '@/types/blog';
import { applyBlogImageFallback, getImageUrl } from '@/utils/imageHelper';

type BlogDetailClientProps = {
  blog: Blog;
};

const getAuthorName = (author: Blog['author']) => {
  return typeof author === 'object' ? author.name : 'Unknown';
};

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const safeContent = blog.content || '<p>No content available for this article.</p>';

  return (
    <div className='min-h-screen bg-white pt-20'>
      <article className='mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8'>
        <header className='mb-8'>
          <div className='mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500'>
            <span className='inline-flex items-center'>
              <FaCalendarAlt className='mr-1' />
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className='inline-flex items-center'>
              <FaClock className='mr-1' />
              {blog.readTime} min read
            </span>
            <span className='inline-flex items-center'>
              <FaUser className='mr-1' />
              {getAuthorName(blog.author)}
            </span>
          </div>

          <h1 className='mb-4 text-3xl font-bold text-gray-900 sm:text-4xl'>
            {blog.title}
          </h1>

          <p className='mb-6 text-xl text-gray-600'>{blog.summary}</p>

          <div className='mb-6 flex flex-wrap gap-2'>
            <span className='inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700'>
              <FaTag className='mr-1' />
              {blog.category}
            </span>
            {blog.tags &&
              blog.tags.map((tag) => (
                <span
                  key={tag}
                  className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700'
                >
                  {tag}
                </span>
              ))}
          </div>
        </header>

        <div className='relative mb-8 h-72 w-full overflow-hidden rounded-lg sm:h-96'>
          <Image
            src={getImageUrl(blog.featuredImage)}
            alt={blog.title}
            fill
            priority
            sizes='(min-width: 1024px) 768px, 100vw'
            className='object-cover'
            onError={(e) => {
              applyBlogImageFallback(e.currentTarget);
            }}
          />
        </div>

        <div
          className='prose prose-lg max-w-none'
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />

        <div className='mt-12 border-t border-gray-200 pt-6'>
          <Link
            href='/blogs'
            className='inline-flex items-center text-indigo-600 hover:text-indigo-800'
          >
            <svg
              className='mr-2 h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Back to All Blog
          </Link>
        </div>
      </article>
    </div>
  );
}