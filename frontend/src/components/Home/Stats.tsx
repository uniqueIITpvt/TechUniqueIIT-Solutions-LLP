'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    value: '50+',
    label: 'Clients Worldwide',
    description: 'Trusted by companies globally',
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
        />
      </svg>
    ),
  },
  {
    value: '100+',
    label: 'Projects Completed',
    description: 'Delivering excellence',
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
        />
      </svg>
    ),
  },
  {
    value: '99%',
    label: 'Client Satisfaction',
    description: 'Our top priority',
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
        />
      </svg>
    ),
  },
  {
    value: '24/7',
    label: 'Support Available',
    description: 'Always here to help',
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
        />
      </svg>
    ),
  },
];

export const Stats = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className='py-10 bg-gradient-to-b from-indigo-50/50 to-white relative overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-indigo-100/50'></div>
        <div className='absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-violet-100/50'></div>
      </div>

      <div className='relative container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-2xl mx-auto mb-16'
        >
          <span className='inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-sm text-indigo-600 font-medium mb-6'>
            <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
            Our Impact
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Delivering{' '}
            <span className='relative'>
              <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                Measurable Results
              </span>
              <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            Our track record speaks for itself. Here&apos;s what we&apos;ve
            achieved for our clients.
          </p>
        </motion.div>

        <div
          ref={ref}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <div className='relative bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] transition-all duration-300'>
                {/* Gradient Background Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-violet-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* Top Accent Line */}
                <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300' />

                {/* Icon */}
                <div className='relative flex items-center justify-center mb-6'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300'>
                    {stat.icon}
                  </div>
                </div>

                {/* Content */}
                <div className='text-center'>
                  <div className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text mb-2'>
                    {stat.value}
                  </div>
                  <div className='text-lg font-semibold text-gray-900 mb-2'>
                    {stat.label}
                  </div>
                  <p className='text-gray-600'>{stat.description}</p>
                </div>

                {/* Decorative Corner Accents */}
                <div className='absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-600/5 to-violet-600/5 rounded-bl-[100px] transform scale-0 group-hover:scale-100 transition-transform duration-300' />
                <div className='absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-600/5 to-violet-600/5 rounded-tr-[100px] transform scale-0 group-hover:scale-100 transition-transform duration-300' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
