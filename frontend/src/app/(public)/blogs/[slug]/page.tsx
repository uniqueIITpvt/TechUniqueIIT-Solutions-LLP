'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
  FaCalendar,
  FaUser,
  FaClock,
  FaEye,
  FaShare,
  FaArrowLeft,
  FaBookmark,
  FaRegBookmark,
} from 'react-icons/fa';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  readTime: number;
  category: string;
  views: number;
}

interface BlogResponse {
  success: boolean;
  data: Blog;
}

export default function BlogPage() {
  const params = useParams();
  const { slug } = params as { slug: string };
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get<BlogResponse>(`/api/blogs/${slug}`);
        if (response.data.success) {
          setBlog(response.data.data);
          // Update document title with blog title
          document.title = `${response.data.data.title} | TechUnique IIT`;
        } else {
          setError('Failed to fetch blog post');
        }
      } catch (err: any) {
        console.error('Error details:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError('Failed to fetch blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Loading state with improved skeleton UI
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6'>
        <div className='w-full max-w-4xl mx-auto'>
          <div className='animate-pulse'>
            <div className='h-64 bg-gray-300 rounded-xl mb-6'></div>
            <div className='h-10 bg-gray-300 rounded-lg w-3/4 mb-4'></div>
            <div className='h-6 bg-gray-300 rounded-lg w-1/2 mb-8'></div>
            <div className='space-y-4'>
              <div className='h-4 bg-gray-300 rounded w-full'></div>
              <div className='h-4 bg-gray-300 rounded w-full'></div>
              <div className='h-4 bg-gray-300 rounded w-5/6'></div>
              <div className='h-4 bg-gray-300 rounded w-full'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with improved UI
  if (error || !blog) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6'>
        <div className='p-8 bg-white rounded-xl shadow-lg text-center max-w-md w-full'>
          <div className='text-red-500 text-5xl mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-24 w-24 mx-auto'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            {error || 'Blog post not found'}
          </h1>
          <p className='text-gray-600 mb-6'>
            We couldn't find the blog post you're looking for. It may have been
            moved or deleted.
          </p>
          <Link
            href='/blogs'
            className='inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg'
          >
            <FaArrowLeft className='mr-2' /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className='min-h-screen bg-gray-50'>
      {/* Hero Section with responsive adjustments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full'
      >
        <Image
          src={blog.thumbnail || 'https://placehold.co/1200x600'}
          alt={blog.title}
          fill
          className='object-cover'
          priority
          quality={100}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 to-black/40'></div>

        {/* Back button for mobile - fixed position */}
        <div className='absolute top-4 left-4 z-10'>
          <Link
            href='/blogs'
            className='flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-200'
            aria-label='Back to blogs'
          >
            <FaArrowLeft />
          </Link>
        </div>

        {/* Bookmark button for mobile - fixed position */}
        <div className='absolute top-4 right-4 z-10'>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className='flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-200'
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='absolute inset-0 flex items-center justify-center px-4 sm:px-6'
        >
          <div className='container mx-auto text-center text-white'>
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className='inline-block px-4 py-1.5 mb-4 text-xs sm:text-sm font-medium bg-indigo-600 rounded-full transform hover:scale-105 transition-transform duration-200'
            >
              {blog.category}
            </motion.span>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight'
            >
              {blog.title}
            </motion.h1>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className='flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs sm:text-sm text-gray-200'
            >
              <span className='flex items-center gap-1.5'>
                <FaUser className='text-indigo-400' />{' '}
                {blog.author?.name || 'Anonymous'}
              </span>
              <span className='flex items-center gap-1.5'>
                <FaCalendar className='text-indigo-400' />
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className='flex items-center gap-1.5'>
                <FaClock className='text-indigo-400' /> {blog.readTime || '5'}{' '}
                min read
              </span>
              <span className='flex items-center gap-1.5'>
                <FaEye className='text-indigo-400' /> {blog.views} views
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Content Section with improved layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className='container mx-auto px-4 sm:px-6 py-8 sm:py-12'
      >
        <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden'>
          {/* Author info card - new addition */}
          <div className='p-4 sm:p-6 md:p-8 border-b border-gray-100'>
            <div className='flex items-center'>
              <div className='relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4'>
                <Image
                  src={
                    blog.author?.avatar ||
                    'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(blog.author?.name || 'Anonymous')
                  }
                  alt={blog.author?.name || 'Anonymous'}
                  fill
                  className='object-cover'
                />
              </div>
              <div>
                <p className='font-medium text-gray-900'>
                  {blog.author?.name || 'Anonymous'}
                </p>
                <p className='text-sm text-gray-500'>
                  Published on{' '}
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className='ml-auto hidden sm:flex'>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isBookmarked
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>

          {/* Blog content with improved typography */}
          <div className='p-4 sm:p-6 md:p-8'>
            <div className='prose prose-lg max-w-none prose-img:rounded-xl prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline'>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Tags section - new addition */}
            <div className='mt-8 pt-6 border-t border-gray-100'>
              <h3 className='text-sm font-medium text-gray-500 mb-3'>
                Related Topics
              </h3>
              <div className='flex flex-wrap gap-2'>
                {['Technology', 'Web Development', blog.category].map(
                  (tag, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer'
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Share and Navigation with improved mobile layout */}
            <div className='mt-8 pt-6 border-t border-gray-100'>
              <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <Link
                  href='/blogs'
                  className='w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-sm hover:shadow'
                >
                  <FaArrowLeft className='mr-2' /> Back to Blogs
                </Link>

                <div className='w-full sm:w-auto flex justify-center sm:justify-end gap-2 mt-4 sm:mt-0'>
                  <button
                    className='flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200'
                    onClick={() => {
                      navigator
                        .share({
                          title: blog.title,
                          text: blog.title,
                          url: window.location.href,
                        })
                        .catch(console.error);
                    }}
                  >
                    <FaShare /> Share Article
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related articles section - new addition */}
          <div className='bg-gray-50 p-4 sm:p-6 md:p-8 border-t border-gray-100'>
            <h3 className='text-xl font-bold text-gray-900 mb-6'>
              You might also like
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow'
                >
                  <div className='aspect-video relative'>
                    <div className='absolute inset-0 bg-gray-200 animate-pulse'></div>
                  </div>
                  <div className='p-4'>
                    <div className='text-xs text-indigo-600 font-medium mb-2'>
                      {blog.category}
                    </div>
                    <h4 className='font-medium text-gray-900 mb-1'>
                      Related article title here
                    </h4>
                    <p className='text-sm text-gray-500 mb-2'>
                      A brief description of the related article...
                    </p>
                    <div className='text-xs text-gray-400'>5 min read</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  );
}
