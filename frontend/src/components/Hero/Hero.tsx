'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MobileContactForm } from '../Contact/BottmMobileForm';

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleServiceRequest = () => {
    if (isMobile) {
      setIsContactFormOpen(true);
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <>
      <section className='relative min-h-[90vh] flex items-center py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white'>
        {/* Background Decorations */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-40 -right-32 w-96 h-96 rounded-full bg-indigo-100/50'></div>
          <div className='absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-violet-100/50'></div>
        </div>

        <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div>
            <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='relative z-10 text-center lg:text-left'
              >
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className='inline-block mb-6'
                >
                  <span className='inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-sm text-indigo-600 font-medium'>
                    <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
                    End-to-End IT & Product Solutions
                  </span>
                </motion.div>

                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                  Transforming Ideas into{' '}
                  <span className='relative'>
                    <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                      Digital Reality
                    </span>
                    <span className='absolute inset-x-0 bottom-2 h-3 bg-indigo-100/50 z-0'></span>
                  </span>
                </h1>

                <p className='text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0'>
                  TechUniqueIIT Solutions LLP is a software development company in
                  Delhi NCR helping businesses build custom software, web apps,
                  mobile apps, MVPs, and offshore software products in India.
                </p>

                {/* Buttons with enhanced styling */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full sm:w-auto'
                  >
                    <Link
                      href='/services'
                      className='group w-full sm:w-auto inline-flex justify-center items-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300'
                    >
                      Explore Services
                      <motion.svg
                        className='ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13 7l5 5m0 0l-5 5m5-5H6'
                        />
                      </motion.svg>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full sm:w-auto'
                  >
                    <Link
                      href='/products'
                      className='group w-full sm:w-auto inline-flex justify-center items-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-indigo-600 bg-white border-2 border-indigo-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-300'
                    >
                      Explore Products
                      <motion.svg
                        className='ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M14 5l7 7m0 0l-7 7m7-7H3'
                        />
                      </motion.svg>
                    </Link>
                  </motion.div>
                </div>
                {/* Delivery highlights */}
                <div className='grid gap-3 sm:grid-cols-3'>
                  {[
                    ['Plan', 'Workflow-first discovery'],
                    ['Build', 'Production-ready delivery'],
                    ['Support', 'Post-launch ownership'],
                  ].map(([label, description], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className='rounded-xl border border-indigo-100 bg-white/80 p-3 text-left shadow-sm'
                    >
                      <div className='text-xs font-bold uppercase tracking-wider text-indigo-600'>
                        {label}
                      </div>
                      <div className='mt-1 text-sm text-gray-600'>
                        {description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Animated Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='relative hidden lg:block'
              >
                <div className='relative z-10'>
                  <div className='absolute top-0 -left-4 w-72 h-72 bg-purple-300/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob' />
                  <div className='absolute top-0 -right-4 w-72 h-72 bg-yellow-300/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000' />
                  <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000' />

                  <div className='relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-indigo-50'>
                    {/* Hero Image */}
                    <div className='relative aspect-square rounded-xl overflow-hidden'>
                      <Image
                        src='/uniqiit-logo.svg'
                        alt='Digital Transformation Illustration'
                        fill
                        priority
                        className='object-cover object-center transform group-hover:scale-105 transition-transform duration-500'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Contact Form */}
      <MobileContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </>
  );
};

