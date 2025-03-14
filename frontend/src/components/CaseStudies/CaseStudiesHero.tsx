'use client';

import { motion } from 'framer-motion';

export const CaseStudiesHero = () => {
  return (
    <section className='relative py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto'
        >
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
            Our{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
              Success Stories
            </span>
          </h1>
          <p className='text-lg text-gray-600 mb-8'>
            Discover how we&apos;ve helped businesses transform their digital
            presence and achieve remarkable results.
          </p>

          {/* Stats */}
          <div className='grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12'>
            <div className='bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-50'>
              <div className='text-2xl sm:text-3xl font-bold text-indigo-600 mb-1'>
                50+
              </div>
              <div className='text-sm text-gray-600'>Projects Completed</div>
            </div>
            <div className='bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-50'>
              <div className='text-2xl sm:text-3xl font-bold text-indigo-600 mb-1'>
                95%
              </div>
              <div className='text-sm text-gray-600'>Client Satisfaction</div>
            </div>
            <div className='bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-50'>
              <div className='text-2xl sm:text-3xl font-bold text-indigo-600 mb-1'>
                40M+
              </div>
              <div className='text-sm text-gray-600'>Revenue Generated</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
