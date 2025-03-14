'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const YouTubeBranding = () => {
  const features = [
    {
      title: 'Channel Optimization',
      description:
        'Professional channel setup with optimized layouts, graphics, and metadata to maximize visibility and brand recognition.',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      ),
    },
    {
      title: 'Content Strategy',
      description:
        'Data-driven content planning that aligns with your brand voice and audience interests to drive engagement and subscriber growth.',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
      ),
    },
    {
      title: 'Video SEO',
      description:
        'Optimization of titles, descriptions, tags, and thumbnails to improve discoverability and ranking in YouTube search results.',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      ),
    },
    {
      title: 'Community Building',
      description:
        'Strategies to foster an engaged community through comments, community posts, and cross-platform promotion.',
      icon: (
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      ),
    },
  ];

  return (
    <section className='py-16 bg-gradient-to-br from-red-50 to-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row items-center gap-12 mb-16'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='lg:w-1/2'
          >
            <span className='inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-4'>
              YouTube Marketing
            </span>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-6'>
              Elevate Your Brand with YouTube Marketing
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              Harness the power of the world's second-largest search engine and
              most popular video platform. Our YouTube branding services help
              you create a compelling channel identity, produce engaging
              content, and build a loyal subscriber base.
            </p>
            <div className='flex flex-wrap gap-4'>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4'>
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>5 million+</h3>
                  <p className='text-sm text-gray-600'>Monthly active users</p>
                </div>
              </div>
              <div className='flex items-center'>
                <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4'>
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>100 million+</h3>
                  <p className='text-sm text-gray-600'>Hours watched daily</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='lg:w-1/2 relative'
          >
            <div className='relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl'>
              <div className='absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-900/40 z-10 rounded-2xl'></div>
              <Image
                src='/images/youtube-branding.jpg'
                alt='YouTube Branding'
                fill
                className='object-cover'
              />
              <div className='absolute inset-0 flex items-center justify-center z-20'>
                <div className='w-20 h-20 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-300'>
                  <svg
                    className='w-10 h-10 text-red-600'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
            >
              <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-600'>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mt-16 bg-white p-8 rounded-2xl shadow-xl'
        >
          <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
            <div className='md:w-2/3'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                Ready to grow your YouTube presence?
              </h3>
              <p className='text-gray-600 mb-6'>
                Our team of YouTube marketing specialists will help you create a
                compelling brand presence that drives engagement, subscribers,
                and business growth.
              </p>
              <Link
                href='/contact'
                className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300'
              >
                Get Started Today
              </Link>
            </div>
            <div className='md:w-1/3 flex justify-center'>
              <div className='relative w-40 h-40'>
                <svg
                  className='w-full h-full text-red-600'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
