'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const AIHero = () => {
  return (
    <section className='relative overflow-hidden'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
              Intelligent Solutions with
              <span className='relative'>
                <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                  {' '}
                  AI Technology
                </span>
                <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
              </span>
            </h1>
            <p className='text-lg text-gray-600 mb-8'>
              Harness the power of artificial intelligence to transform your
              business operations and drive innovation.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Link
                href='/contact'
                className='px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:shadow-lg transition-all duration-300'
              >
                Get Started
              </Link>
              <Link
                href='#features'
                className='px-6 py-3 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300'
              >
                Explore Solutions
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='relative'
          >
            <Image
              src='/ai/ai-solutions-hero.jpg'
              alt='AI Solutions'
              width={600}
              height={400}
              className='rounded-2xl shadow-2xl'
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
