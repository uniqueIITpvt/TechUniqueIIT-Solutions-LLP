'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { blogApi } from '@/services/api';
import LoadingSpinner from '../LoadingSpinner';
import { applyBlogImageFallback, getImageUrl } from '@/utils/imageHelper';
import { featuredBlogs as fallbackFeaturedBlogs, FallbackBlog } from '@/data/fallbackBlogs';

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
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        setIsLoading(true);
        setError('');
        setUsingFallback(false);
        
        const response = await blogApi.getFeaturedBlogs();
        
        // Handle different possible response formats
        if (response.success && Array.isArray(response.data)) {
          setFeaturedBlogs(response.data);
        } else if (Array.isArray(response)) {
          // If the API directly returns an array
          setFeaturedBlogs(response);
        } else if (response && Array.isArray(response.blogs)) {
          // Another possible format
          setFeaturedBlogs(response.blogs);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching featured blogs from API, using fallback data:', err);
        
        // Use fallback data when API fails
        if (Array.isArray(fallbackFeaturedBlogs)) {
          setFeaturedBlogs(fallbackFeaturedBlogs as Blog[]);
          setUsingFallback(true);
          setError('');
        } else {
          setFeaturedBlogs([]);
          setError('Failed to load featured blogs');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!featuredBlogs || !Array.isArray(featuredBlogs) || featuredBlogs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-3xl font-bold text-center">Featured Articles</h2>
          {/* {usingFallback && (
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm ml-4">
              Demo Content
            </div>
          )} */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBlogs.filter(blog => blog && blog._id).map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg">
              <Link href={`/blogs/${blog.slug}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={getImageUrl(blog.featuredImage || '')}
                    alt={blog.title || 'Blog post'}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    unoptimized
                    className="object-cover"
                    onError={(e) => {
                      applyBlogImageFallback(e.currentTarget);
                    }}
                  />
                </div>
              </Link>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="inline-flex items-center mr-3">
                    <FaCalendarAlt className="mr-1" />
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'No date'}
                  </span>
                  <span className="inline-flex items-center">
                    <FaClock className="mr-1" />
                    {blog.readTime || 5} min read
                  </span>
                </div>
                
                <Link href={`/blogs/${blog.slug || '#'}`}>
                  <h3 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
                    {blog.title || 'Untitled'}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.summary || 'No summary available'}
                </p>
                
                <Link 
                  href={`/blogs/${blog.slug || '#'}`}
                  className="text-blue-600 font-medium hover:underline inline-flex items-center"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
