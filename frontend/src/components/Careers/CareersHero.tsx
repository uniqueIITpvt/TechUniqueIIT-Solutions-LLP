'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const CareersHero = () => {
  return (
    <section className='relative py-20 overflow-hidden bg-gradient-to-b from-indigo-50 to-white'>
      <div className='container mx-auto px-4'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full'>
              We&apos;re Hiring!
            </span>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
              Join Our Team of{' '}
              <span className='text-indigo-600'>Innovators</span>
            </h1>
            <p className='text-lg text-gray-600 mb-8 max-w-lg'>
              Be part of a team that&apos;s shaping the future of technology.
              We&apos;re looking for passionate individuals who want to make a
              difference.
            </p>
            <div className='flex flex-wrap gap-4'>
              <button className='px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors'>
                View Open Positions
              </button>
              <button className='px-8 py-4 bg-white text-indigo-600 rounded-xl font-medium border-2 border-indigo-100 hover:border-indigo-200 transition-colors'>
                Learn About Culture
              </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-8 mt-12 pt-12 border-t'>
              {[
                { label: 'Team Members', value: '50+' },
                { label: 'Countries', value: '12' },
                { label: 'Open Positions', value: '15' },
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
              src='/careers/careers-1.jpg'
              alt='Our Team'
              fill
              className='object-cover rounded-2xl'
            />
            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='absolute -right-6 top-1/4 bg-white p-4 rounded-xl shadow-lg'
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
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                </div>
                <div>
                  <div className='text-sm font-medium text-gray-900'>
                    Great Culture
                  </div>
                  <div className='text-xs text-gray-500'>
                    Rated 4.8/5 by employees
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
                      d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                    />
                  </svg>
                </div>
                <div>
                  <div className='text-sm font-medium text-gray-900'>
                    Fast Growth
                  </div>
                  <div className='text-xs text-gray-500'>
                    40% YoY growth rate
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
