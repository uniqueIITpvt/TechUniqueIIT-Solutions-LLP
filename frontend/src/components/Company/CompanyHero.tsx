'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const CompanyHero = () => {
  return (
    <section className='relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-700 bg-blue-50 rounded-full'>
              About Us
            </span>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
              Building the Future of{' '}
              <span className='text-blue-600'>Technology</span>
            </h1>
            <p className='text-lg text-gray-600 mb-8 max-w-lg'>
              We&apos;re a team of passionate innovators dedicated to creating
              solutions that transform businesses and enhance lives.
            </p>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-8 mt-12 pt-12 border-t'>
              {[
                { label: 'Founded', value: '2015' },
                { label: 'Team Members', value: '200+' },
                { label: 'Global Offices', value: '12' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className='text-3xl font-bold text-gray-900 mb-2'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-gray-600'>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relative lg:h-[600px] h-[400px]'
          >
            <Image
              src='/company/company-1.jpg'
              alt='Our Company'
              fill
              className='object-cover rounded-2xl'
            />
            {/* Floating Achievement Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='absolute -right-6 top-1/4 bg-white p-4 rounded-xl shadow-lg'
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-blue-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                    />
                  </svg>
                </div>
                <div>
                  <div className='text-sm font-medium text-gray-900'>
                    Industry Leader
                  </div>
                  <div className='text-xs text-gray-500'>
                    Top 10 Tech Companies 2024
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className='absolute -left-6 bottom-1/4 bg-white p-4 rounded-xl shadow-lg'
            >
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-green-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    />
                  </svg>
                </div>
                <div>
                  <div className='text-sm font-medium text-gray-900'>
                    Sustainable Growth
                  </div>
                  <div className='text-xs text-gray-500'>
                    100% YoY Revenue Growth
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
