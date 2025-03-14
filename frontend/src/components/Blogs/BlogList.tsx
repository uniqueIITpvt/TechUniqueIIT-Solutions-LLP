'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import Link from 'next/link';
import {
  FiCalendar,
  FiUser,
  FiEye,
  FiClock,
  FiArrowRight,
} from 'react-icons/fi';
import Image from 'next/image';
import { BlogCategories } from './BlogCategories';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  author: {
    name: string;
  };
  category: string;
  views: number;
  readTime: number;
  createdAt: string;
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await api.get('/api/blogs');

        if (response.data.success) {
          const blogsData = response.data.data.data || [];
          setBlogs(blogsData);
          setFilteredBlogs(blogsData);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (error) {
        setError('Failed to fetch blogs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) => blog.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredBlogs(filtered);
    }
  }, [selectedCategory, blogs]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500'>No blogs found</p>
      </div>
    );
  }

  return (
    <section className='py-16 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            {selectedCategory === 'all'
              ? 'Latest Articles'
              : `${selectedCategory.replace(/-/g, ' ')} Articles`}
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            {filteredBlogs.length} articles found
          </p>
        </div>

        <BlogCategories
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
          blogs={blogs}
        />

        {filteredBlogs.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500'>No articles found in this category</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className='h-full'
              >
                <Link href={`/blogs/${blog._id}`}>
                  <article className='group h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'>
                    <div className='relative h-56 sm:h-64'>
                      <Image
                        src={blog.thumbnail || 'https://placehold.co/600x400'}
                        alt={blog.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 group-hover:via-black/40 group-hover:to-black/80 transition-colors duration-300' />
                      <div className='absolute top-4 left-4 flex flex-wrap gap-2'>
                        <span className='px-3 py-1 bg-indigo-600 text-white text-sm rounded-full'>
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className='p-6 flex flex-col h-[calc(100%-16rem)]'>
                      <h3
                        className='text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-300'
                        title={blog.title}
                      >
                        {truncateText(blog.title, 60)}
                      </h3>
                      <p className='text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-3 flex-grow'>
                        {truncateText(blog.excerpt, 120)}
                      </p>

                      <div className='border-t pt-4 mt-auto'>
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center'>
                            <div className='w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center'>
                              <FiUser className='text-indigo-600' />
                            </div>
                            <span className='ml-2 text-sm text-gray-700'>
                              {blog.author?.name || 'Anonymous'}
                            </span>
                          </div>
                          <span className='flex items-center text-sm text-gray-500'>
                            <FiEye className='mr-1' />
                            {blog.views}
                          </span>
                        </div>

                        <div className='flex items-center justify-between text-sm text-gray-500'>
                          <span className='flex items-center'>
                            <FiCalendar className='mr-1' />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                          <span className='flex items-center'>
                            <FiClock className='mr-1' />
                            {blog.readTime || 5} min read
                          </span>
                        </div>
                      </div>

                      <div className='mt-4 flex items-center justify-end text-indigo-600 group-hover:text-indigo-700 transition-colors'>
                        <span className='text-sm font-medium'>Read More</span>
                        <FiArrowRight className='ml-2 transform group-hover:translate-x-1 transition-transform' />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {filteredBlogs.length >= 9 && (
          <div className='text-center mt-12'>
            <button className='inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors'>
              Load More Articles
              <FiArrowRight className='ml-2' />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
