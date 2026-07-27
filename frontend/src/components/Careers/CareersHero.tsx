'use client';

import { motion } from 'framer-motion';

export const CareersHero = () => {
  return (
    <section className='bg-white py-8 sm:py-10 lg:py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='relative isolate flex min-h-[280px] items-center overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700 px-6 py-10 shadow-[0_24px_70px_-32px_rgba(67,56,202,0.7)] sm:min-h-[300px] sm:px-10 lg:px-16'
        >
          <div
            className='absolute inset-0 opacity-20'
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
            aria-hidden='true'
          />
          <div
            className='absolute -right-24 -top-40 h-96 w-96 rounded-full border-[56px] border-white/10'
            aria-hidden='true'
          />
          <div
            className='absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl'
            aria-hidden='true'
          />

          <div className='relative z-10 max-w-3xl'>
            <p className='mb-4 text-xs font-bold uppercase tracking-[0.24em] text-indigo-200'>
              Careers at TechUniqueIIT
            </p>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl'>
              Join Our Team of{' '}
              <span className='text-indigo-200'>Innovators</span>
            </h1>
            <p className='mt-5 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base sm:leading-7'>
              Work alongside our engineering, product, and digital strategy
              teams to build practical web, mobile, cloud, and growth
              solutions for real business needs.
            </p>
            <div className='mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-indigo-200 sm:text-sm'>
              <span>Engineering</span>
              <span className='h-1 w-1 rounded-full bg-indigo-300' />
              <span>Product</span>
              <span className='h-1 w-1 rounded-full bg-indigo-300' />
              <span>Digital Strategy</span>
              <span className='hidden h-1 w-1 rounded-full bg-indigo-300 sm:block' />
              <span className='basis-full sm:basis-auto'>
                Led by Mohammad Musharaf
              </span>
            </div>
          </div>

          <div
            className='absolute right-12 top-1/2 hidden h-44 w-56 -translate-y-1/2 lg:block'
            aria-hidden='true'
          >
            <div className='absolute inset-0 rotate-3 rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-sm'>
              <div className='mb-5 flex items-center gap-1.5'>
                <span className='h-2 w-2 rounded-full bg-indigo-200/80' />
                <span className='h-2 w-2 rounded-full bg-violet-200/70' />
                <span className='h-2 w-2 rounded-full bg-white/60' />
              </div>
              <div className='space-y-3'>
                <div className='h-2 w-4/5 rounded-full bg-white/70' />
                <div className='h-2 w-3/5 rounded-full bg-indigo-200/60' />
                <div className='h-2 w-11/12 rounded-full bg-white/40' />
                <div className='h-2 w-2/3 rounded-full bg-violet-200/50' />
              </div>
              <div className='mt-6 flex justify-end'>
                <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg font-bold text-indigo-700'>
                  &lt;/&gt;
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
