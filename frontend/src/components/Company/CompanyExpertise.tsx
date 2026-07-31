'use client';

import { motion } from 'framer-motion';

const principles = [
  {
    number: '01',
    title: 'Understand the workflow',
    description:
      'We map real users, approvals, data, and daily operating steps before planning screens or development tasks.',
    points: ['Requirements', 'User flows', 'Business rules'],
  },
  {
    number: '02',
    title: 'Build in practical releases',
    description:
      'Work is broken into clear milestones so teams can review progress, adjust early, and avoid unnecessary complexity.',
    points: ['Milestones', 'Review cycles', 'Scope control'],
  },
  {
    number: '03',
    title: 'Own the technical base',
    description:
      'We keep architecture, code quality, deployment, and maintainability visible instead of treating launch as the finish line.',
    points: ['Architecture', 'Deployment', 'Documentation'],
  },
  {
    number: '04',
    title: 'Support after launch',
    description:
      'After release, we help stabilize workflows, handle fixes, and improve the product based on real usage and feedback.',
    points: ['Monitoring', 'Maintenance', 'Iteration'],
  },
];

export const CompanyExpertise = () => {
  return (
    <section className='bg-gray-50/70 py-12 sm:py-16 lg:py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end'
        >
          <div>
            <span className='mb-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm'>
              How We Work
            </span>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Delivery shaped around ownership
            </h2>
          </div>
          <p className='max-w-2xl text-sm leading-6 text-gray-600 lg:justify-self-end lg:text-base'>
            Our company approach is focused on clear decisions, practical
            execution, and long-term maintainability across every project.
          </p>
        </motion.div>

        <div className='grid overflow-hidden border-y border-gray-200 bg-white md:grid-cols-2 lg:grid-cols-4'>
          {principles.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className='border-b border-gray-200 p-5 last:border-b-0 md:border-r md:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0 sm:p-6'
            >
              <span className='text-xs font-bold text-indigo-400'>{item.number}</span>
              <h3 className='mt-5 min-h-[3rem] text-lg font-bold leading-6 text-gray-900'>
                {item.title}
              </h3>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                {item.description}
              </p>
              <div className='mt-5 flex flex-wrap gap-1.5'>
                {item.points.map((point) => (
                  <span
                    key={point}
                    className='rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-700'
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
