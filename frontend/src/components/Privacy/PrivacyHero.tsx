'use client';

import { motion } from 'framer-motion';

export const PrivacyHero = () => {
  return (
    <section className='py-20 bg-gradient-to-b from-blue-50 to-white'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto'
        >
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-700 bg-blue-50 rounded-full'>
            Privacy
          </span>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
            Privacy Policy
          </h1>
          <p className='text-lg text-gray-600 mb-8'>
            We are committed to protecting your privacy and ensuring the
            security of your personal information.
          </p>
          <div className='text-sm text-gray-500'>
            Last updated: March 15, 2024
          </div>
        </motion.div>
      </div>
    </section>
  );
};
