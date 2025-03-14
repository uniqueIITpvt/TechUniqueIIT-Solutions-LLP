'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export const ServiceCTA = () => {
  return (
    <section className='relative py-20 overflow-hidden'>
      {/* Background with animated gradient */}
      <div className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600'>
        {/* Animated overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/30 via-transparent to-purple-500/30 animate-pulse-slow'></div>

        {/* Animated grid pattern */}
        <div
          className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:3rem_3rem]'
          style={{
            maskImage: 'radial-gradient(circle at center, black, transparent)',
          }}
        />

        {/* Floating orbs */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-1/4 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float'></div>
          <div className='absolute bottom-1/4 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float-delayed'></div>
        </div>
      </div>

      <div className='container mx-auto px-4 relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='relative backdrop-blur-sm bg-white/5 rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl'
        >
          <div className='max-w-3xl mx-auto text-center'>
            {/* Decorative elements */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <div className='w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent'></div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6'>
                Ready to{' '}
                <span className='relative'>
                  <span className='relative z-10'>Transform</span>
                  <div className='absolute bottom-0 left-0 right-0 h-3 bg-indigo-400/30 -rotate-1'></div>
                </span>{' '}
                Your Ideas?
              </h2>
              <p className='text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto'>
                Let&apos;s discuss how we can help bring your vision to life
                with our cutting-edge solutions
              </p>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href='/contact'
                  className='group relative inline-flex items-center px-8 py-4 rounded-2xl bg-white text-indigo-600 font-semibold text-lg overflow-hidden transition-all duration-300'
                >
                  {/* Button gradient background */}
                  <div className='absolute inset-0 bg-gradient-to-r from-white via-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                  {/* Button content */}
                  <span className='relative flex items-center'>
                    Get Started
                    <svg
                      className='ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </span>

                  {/* Shine effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine'></div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom decorative element */}
            <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
              <div className='w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent'></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Additional decorative elements */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/10'></div>
    </section>
  );
};
