'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Search Engine Optimization (SEO)',
    description:
      "Improve your website's visibility and ranking on search engines with our data-driven SEO strategies.",
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
          d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        />
      </svg>
    ),
  },
  {
    title: 'Social Media Marketing',
    description:
      'Build strong brand presence and engage with your audience through strategic social media campaigns.',
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
          d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
        />
      </svg>
    ),
  },
  {
    title: 'Content Marketing',
    description:
      'Create engaging content that resonates with your target audience and drives meaningful conversions.',
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
          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
        />
      </svg>
    ),
  },
  {
    title: 'Pay-Per-Click (PPC)',
    description:
      'Drive targeted traffic and maximize ROI with expertly managed paid advertising campaigns.',
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
          d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    ),
  },
];

export const DigitalMarketingFeatures = () => {
  return (
    <section id='features' className='py-16 bg-white/80 backdrop-blur-sm'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <span className='inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4'>
            Our Services
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Digital Marketing Solutions
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Comprehensive digital marketing strategies tailored to help your
            business grow and succeed in the digital landscape
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'
            >
              <div className='w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-600'>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
