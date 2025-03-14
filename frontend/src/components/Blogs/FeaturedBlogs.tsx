'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiClock, FiTrendingUp } from 'react-icons/fi';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  views: number;
  readTime: number;
  category: string;
}

interface BlogResponse {
  success: boolean;
  data: {
    data: Blog[];
  };
}

export function FeaturedBlogs() {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await api.get<BlogResponse>(
          '/api/blogs?sort=-views&limit=3'
        );
        if (response.data.success) {
          // Ensure we only take the top 3 blogs
          const topThreeBlogs = response.data.data.data.slice(0, 3);
          setFeaturedBlogs(topThreeBlogs);
        }
      } catch (error) {
        console.error('Error fetching featured blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  if (featuredBlogs.length === 0) {
    return null;
  }

  const badges = ['#1 Most Read', '#2 Top Pick', '#3 Popular'];

  return (
    <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4'>
            <FiTrendingUp className='mr-2' />
            Most Popular
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Trending Articles
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Discover our most-read articles and see what's capturing our
            readers' attention
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {featuredBlogs.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blogs/${blog._id}`}>
                <article className='group relative bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300'>
                  <div className='relative h-64'>
                    <Image
                      src={blog.thumbnail || 'https://placehold.co/600x400'}
                      alt={blog.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 group-hover:via-black/40 group-hover:to-black/80 transition-colors duration-300' />

                    {/* Top Badge */}
                    <div className='absolute top-4 left-4 flex items-center gap-2'>
                      <span className='px-3 py-1 bg-indigo-600 text-white text-sm rounded-full'>
                        {blog.category}
                      </span>
                      <span
                        className={`px-3 py-1 text-white text-sm rounded-full flex items-center ${
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                            ? 'bg-indigo-500'
                            : 'bg-green-500'
                        }`}
                      >
                        <FiTrendingUp className='mr-1' /> {badges[index]}
                      </span>
                    </div>

                    <div className='absolute bottom-4 left-4 right-4'>
                      <h3 className='text-xl font-bold text-white mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300'>
                        {blog.title}
                      </h3>
                      <div className='flex items-center text-sm text-gray-200 space-x-4'>
                        <span className='flex items-center'>
                          <FiEye className='mr-2' />
                          {blog.views.toLocaleString()} views
                        </span>
                        <span className='flex items-center'>
                          <FiClock className='mr-2' />
                          {blog.readTime || 5} min read
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
