'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { blogApi } from '@/services/api';
import LoadingSpinner from '../LoadingSpinner';
import { applyBlogImageFallback, getImageUrl } from '@/utils/imageHelper';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  featuredImage: string;
  readTime: number;
  createdAt: string;
}

const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await blogApi.getFeaturedBlogs();

        if (response.success && Array.isArray(response.data)) {
          setFeaturedBlogs(response.data);
        } else if (Array.isArray(response)) {
          setFeaturedBlogs(response);
        } else if (response && Array.isArray(response.blogs)) {
          setFeaturedBlogs(response.blogs);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching featured blogs from API:', err);
        setFeaturedBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className='py-10 text-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!featuredBlogs || !Array.isArray(featuredBlogs) || featuredBlogs.length === 0) {
    return null;
  }

  return (
    <section className='bg-white py-10'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 flex items-center justify-center sm:mb-16'>
          <h2 className='text-center text-3xl font-bold'>Featured Articles</h2>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8'>
          {featuredBlogs.filter((blog) => blog && blog._id).map((blog) => (
            <div key={blog._id} className='overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-105 hover:shadow-lg'>
              <Link href={`/blogs/${blog.slug}`}>
                <div className='relative h-48 w-full'>
                  <Image
                    src={getImageUrl(blog.featuredImage || '')}
                    alt={blog.title || 'Blog post'}
                    fill
                    sizes='(min-width: 768px) 33vw, 100vw'
                    unoptimized
                    className='object-cover'
                    onError={(e) => {
                      applyBlogImageFallback(e.currentTarget);
                    }}
                  />
                </div>
              </Link>

              <div className='p-5 sm:p-6'>
                <div className='mb-3 flex items-center text-sm text-gray-500'>
                  <span className='mr-3 inline-flex items-center'>
                    <FaCalendarAlt className='mr-1' />
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }) : 'No date'}
                  </span>
                  <span className='inline-flex items-center'>
                    <FaClock className='mr-1' />
                    {blog.readTime || 5} min read
                  </span>
                </div>

                <Link href={`/blogs/${blog.slug || '#'}`}>
                  <h3 className='mb-3 text-xl font-semibold transition-colors hover:text-indigo-600'>
                    {blog.title || 'Untitled'}
                  </h3>
                </Link>

                <p className='mb-4 line-clamp-3 text-gray-600'>
                  {blog.summary || 'No summary available'}
                </p>

                <Link
                  href={`/blogs/${blog.slug || '#'}`}
                  className='inline-flex items-center font-medium text-indigo-600 hover:underline'
                >
                  Read More
                  <svg className='ml-1 h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
