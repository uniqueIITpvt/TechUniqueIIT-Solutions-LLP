'use client';

import { motion } from 'framer-motion';

const companyFacts = [
  { value: '17+ Yrs', label: 'IT Leadership' },
  { value: 'Since 2022', label: 'Company Journey' },
  { value: '20+', label: 'Team Members' },
];

const capabilities = [
  { step: '01', label: 'Build', detail: 'Web & software' },
  { step: '02', label: 'Maintain', detail: 'Code & cloud' },
  { step: '03', label: 'Launch', detail: 'Mobile apps' },
  { step: '04', label: 'Grow', detail: 'Digital marketing' },
];

export const CompanyHero = () => {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-indigo-50/70 to-white py-12 sm:py-16 lg:py-20'>
      <div className='absolute left-1/2 top-0 h-80 w-2/3 -translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl' />
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16'>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className='mb-5 inline-flex items-center rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm'>
              About TechUniqueIIT
            </span>
            <h1 className='max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl'>
              Technology built around{' '}
              <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
                real business needs
              </span>
            </h1>
            <p className='mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg'>
              TechUniqueIIT designs, builds, and supports practical web,
              mobile, cloud, and growth solutions—starting with a clear
              understanding of how each client works.
            </p>

            <dl className='mt-9 grid grid-cols-3 gap-4 border-t border-indigo-100 pt-7'>
              {companyFacts.map((fact) => (
                <div key={fact.label}>
                  <dt className='text-xs leading-4 text-gray-500 sm:text-sm'>
                    {fact.label}
                  </dt>
                  <dd className='mt-1 text-lg font-bold text-gray-900 sm:text-2xl'>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-700 p-6 shadow-[0_28px_70px_-36px_rgba(67,56,202,0.75)] sm:p-8'
          >
            <div
              className='absolute inset-0 opacity-20'
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
                backgroundSize: '38px 38px',
              }}
            />
            <div className='relative'>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-indigo-200'>
                What we do
              </p>
              <div className='mt-6 grid grid-cols-2 gap-3'>
                {capabilities.map((capability) => (
                  <div
                    key={capability.step}
                    className='border-l border-white/25 bg-white/10 px-4 py-5 backdrop-blur-sm'
                  >
                    <span className='text-[10px] font-bold text-indigo-300'>
                      {capability.step}
                    </span>
                    <h2 className='mt-3 text-lg font-bold text-white'>
                      {capability.label}
                    </h2>
                    <p className='mt-1 text-xs text-indigo-200'>
                      {capability.detail}
                    </p>
                  </div>
                ))}
              </div>
              <p className='mt-6 border-t border-white/15 pt-5 text-sm leading-6 text-indigo-100'>
                One team supporting the full path from product planning and
                development to maintenance and growth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
