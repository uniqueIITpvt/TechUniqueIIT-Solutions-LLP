'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiBookOpen, FiUsers, FiTrendingUp } from 'react-icons/fi';

export function BlogHero() {
  return (
    <section className='relative mt-16 lg:mt-20 pt-20 lg:pt-24 pb-20 overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-grid-pattern opacity-10'></div>

      {/* Animated Blobs */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob'></div>
        <div className='absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto'>
          {/* Stats Section */}
          <div className='flex justify-center mb-8 lg:mb-12'>
            <div className='grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-center'
              >
                <div className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-white/10 rounded-xl'>
                  <FiBookOpen className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                </div>
                <div className='text-xl sm:text-2xl font-bold text-white'>
                  100+
                </div>
                <div className='text-xs sm:text-sm text-indigo-200'>
                  Articles
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='text-center'
              >
                <div className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-white/10 rounded-xl'>
                  <FiUsers className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                </div>
                <div className='text-xl sm:text-2xl font-bold text-white'>
                  50K+
                </div>
                <div className='text-xs sm:text-sm text-indigo-200'>
                  Readers
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-center'
              >
                <div className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-white/10 rounded-xl'>
                  <FiTrendingUp className='w-5 h-5 sm:w-6 sm:h-6 text-white' />
                </div>
                <div className='text-xl sm:text-2xl font-bold text-white'>
                  10+
                </div>
                <div className='text-xs sm:text-sm text-indigo-200'>
                  Categories
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hero Content */}
          <div className='text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4'
            >
              Discover Insights in
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200'>
                {' '}
                Technology
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='text-base sm:text-lg md:text-xl text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4'
            >
              Explore our collection of expert articles, tutorials, and insights
              about the latest in technology and innovation
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='relative max-w-2xl mx-auto px-4'
            >
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search articles...'
                  className='w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white placeholder-indigo-200 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent'
                />
                <button className='absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors'>
                  <FiSearch className='w-4 h-4 sm:w-5 sm:h-5' />
                </button>
              </div>
              <div className='mt-3 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-white'>
                {['React', 'NextJS', 'TypeScript', 'AI'].map((tag, index) => {
                  const colors = [
                    'bg-blue-500/30 border-blue-400/50 hover:bg-blue-500/40',
                    'bg-green-500/30 border-green-400/50 hover:bg-green-500/40',
                    'bg-purple-500/30 border-purple-400/50 hover:bg-purple-500/40',
                    'bg-red-500/30 border-red-400/50 hover:bg-red-500/40',
                  ];
                  return (
                    <button
                      key={tag}
                      className={`px-3 py-1 rounded-full border backdrop-blur-sm transition-colors duration-200 text-white hover:scale-105 ${colors[index]}`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className='absolute bottom-0 left-0 right-0'>
        <svg
          viewBox='0 0 1440 200'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-full h-auto'
          preserveAspectRatio='none'
        >
          <path
            d='M0 0L48 13.3C96 26.7 192 53.3 288 66.7C384 80 480 80 576 66.7C672 53.3 768 26.7 864 26.7C960 26.7 1056 53.3 1152 66.7C1248 80 1344 80 1392 80H1440V200H0V0Z'
            fill='rgb(249 250 251)'
          />
        </svg>
      </div>
    </section>
  );
}
