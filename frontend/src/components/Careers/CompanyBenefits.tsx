'use client';

import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Real Product Work',
    description: 'Contribute to web, mobile, business software, and cloud delivery.',
    icon: (
      <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
      </svg>
    ),
  },
  {
    title: 'Modern Tech Stack',
    description: 'Work with React, Next.js, Node.js, React Native, and cloud tools.',
    icon: (
      <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M8 9l-3 3 3 3m8-6l3 3-3 3m-2-10l-4 14' />
      </svg>
    ),
  },
  {
    title: 'Cross-Team Exposure',
    description: 'Collaborate with engineering, product, and digital strategy teams.',
    icon: (
      <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm13 10v-2a4 4 0 00-3-3.87m-2-12a4 4 0 010 7.75' />
      </svg>
    ),
  },
  {
    title: 'Experienced Guidance',
    description: 'Learn under leadership backed by more than 17 years in IT.',
    icon: (
      <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm-3-10l2 2 4-4' />
      </svg>
    ),
  },
  {
    title: 'End-to-End Exposure',
    description: 'See projects move from requirements through deployment and support.',
    icon: (
      <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.7} d='M4 6h12a4 4 0 014 4v1M20 18H8a4 4 0 01-4-4v-1m12-5l4 3 4-3M8 16l-4-3-4 3' />
      </svg>
    ),
  },
  {
    title: 'Meaningful Ownership',
    description: 'Take responsibility for practical deliverables and improvements.',
    icon: (
      <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <circle cx='12' cy='12' r='9' strokeWidth={1.7} />
        <circle cx='12' cy='12' r='5' strokeWidth={1.7} />
        <circle cx='12' cy='12' r='1' fill='currentColor' stroke='none' />
      </svg>
    ),
  },
];

export const CompanyBenefits = () => {
  return (
    <section className='border-y border-gray-100 bg-gray-50/70 py-12 sm:py-14'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-8 text-center'
        >
          <span className='mb-3 inline-flex items-center rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm'>
            Benefits &amp; Perks
          </span>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
            What You Can Expect Here
          </h2>
          <p className='mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600'>
            Practical exposure based on the work and teams already operating at
            TechUniqueIIT.
          </p>
        </motion.div>

        <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6'>
          {benefits.map((benefit, index) => (
            <motion.article
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className='group rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md'
            >
              <div className='mb-4 flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100'>
                  {benefit.icon}
                </div>
                <span className='text-[10px] font-bold text-gray-300'>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className='text-sm font-bold leading-5 text-gray-900'>
                {benefit.title}
              </h3>
              <p className='mt-2 text-xs leading-5 text-gray-600'>
                {benefit.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
