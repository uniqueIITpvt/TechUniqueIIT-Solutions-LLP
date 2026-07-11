'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaUser, FaTag } from 'react-icons/fa';
import { blogApi } from '@/services/api';
import { Blog } from '@/types/blog';
import LoadingSpinner from '@/components/LoadingSpinner';
import { applyBlogImageFallback, getImageUrl } from '@/utils/imageHelper';
import { getBlogBySlug } from '@/data/fallbackBlogs';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        setError('');
        setUsingFallback(false);
        
        const response = await blogApi.getBlogBySlug(params.slug);
        console.log('Blog detail response:', response);
        
        // Handle different possible response formats
        if (response.success && response.data) {
          setBlog(response.data);
        } else if (response && response._id) {
          // If the API directly returns the blog object
          setBlog(response);
        } else if (response && response.blog) {
          // Another possible format
          setBlog(response.blog);
        } else {
          throw new Error('Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog from API, trying fallback data:', err);
        
        // Try fallback data
        const fallbackBlog = getBlogBySlug(params.slug);
        if (fallbackBlog) {
          setBlog(fallbackBlog as Blog);
          setUsingFallback(true);
          setError('');
        } else {
          setError('Blog not found');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !blog) {
    return notFound();
  }

  // Ensure content is not null or undefined
  const safeContent = blog.content || '<p>No content available for this article.</p>';

  return (
    <div className="min-h-screen pt-20 bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          {/* {usingFallback && (
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm mb-4 text-center">
              Demo Content - This is sample blog content for demonstration purposes
            </div>
          )} */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
            <span className="inline-flex items-center">
              <FaCalendarAlt className="mr-1" />
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="inline-flex items-center">
              <FaClock className="mr-1" />
              {blog.readTime} min read
            </span>
            <span className="inline-flex items-center">
              <FaUser className="mr-1" />
              {typeof blog.author === 'object' ? blog.author.name : 'Unknown'}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {blog.summary}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              <FaTag className="mr-1" />
              {blog.category}
            </span>
            {blog.tags && blog.tags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={getImageUrl(blog.featuredImage)}
            alt={blog.title}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            unoptimized
            className="object-cover"
            onError={(e) => {
              applyBlogImageFallback(e.currentTarget);
            }}
          />
        </div>
        
        {/* Blog Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />
        
        {/* Back to Blogs */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link 
            href="/blogs"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Blog
          </Link>
        </div>
      </article>
    </div>
  );
}
