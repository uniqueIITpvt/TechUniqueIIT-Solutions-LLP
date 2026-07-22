'use client';

import { motion } from 'framer-motion';

export const FaqHero = () => {
  return (
    <section className='bg-gradient-to-b from-indigo-50/50 to-white py-12 sm:py-16 lg:py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-2xl mx-auto'
        >
          <div className='inline-flex items-center justify-center space-x-2 mb-4'>
            <span className='w-8 h-0.5 bg-indigo-600'></span>
            <span className='text-sm font-medium text-indigo-600'>FAQ</span>
            <span className='w-8 h-0.5 bg-indigo-600'></span>
          </div>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-3'>
            Frequently Asked Questions
          </h1>
          <p className='text-base sm:text-lg text-gray-600'>
            Find answers to common questions about our services and solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
};
