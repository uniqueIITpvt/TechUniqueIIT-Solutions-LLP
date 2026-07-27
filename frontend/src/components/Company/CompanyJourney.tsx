'use client';

import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2022',
    title: 'TechUniqueIIT was founded',
    description:
      'The company began its journey in Delhi with a focus on practical software and digital delivery for business needs.',
  },
  {
    year: '2026',
    title: 'Where we are today',
    description:
      'A 20+ member team now works across custom software, application maintenance, mobile development, and digital marketing under 17+ years of IT leadership.',
  },
];

export const CompanyJourney = () => {
  return (
    <section className='relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20'>
      <div className='absolute left-1/2 top-1/2 h-64 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50 blur-3xl' />
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto mb-12 max-w-3xl text-center'
        >
          <span className='mb-4 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600'>
            Our Journey
          </span>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            From 2022 to 2026
          </h2>
          <p className='mt-4 text-base leading-7 text-gray-600'>
            A concise timeline using only the milestones and current company
            facts reflected across this website.
          </p>
        </motion.div>

        <div className='relative mx-auto max-w-5xl'>
          <div className='absolute bottom-6 left-6 top-6 w-px bg-indigo-200 md:bottom-auto md:left-1/2 md:top-6 md:h-px md:w-full md:-translate-x-1/2' />
          <div className='grid gap-8 md:grid-cols-2 md:gap-16'>
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.year}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className='relative pl-16 md:pl-0 md:pt-14'
              >
                <div className='absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-xs font-bold text-white shadow-md md:left-1/2 md:-translate-x-1/2'>
                  {index + 1}
                </div>
                <div className='border-l-2 border-indigo-100 pl-5 md:border-l-0 md:pl-0 md:text-center'>
                  <span className='text-sm font-bold text-indigo-600'>
                    {milestone.year}
                  </span>
                  <h3 className='mt-2 text-xl font-bold text-gray-900'>
                    {milestone.title}
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-gray-600'>
                    {milestone.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
