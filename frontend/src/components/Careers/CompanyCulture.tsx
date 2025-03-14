'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const values = [
  {
    title: 'Innovation First',
    description:
      'We embrace new ideas and technologies to solve complex problems.',
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
          d='M13 10V3L4 14h7v7l9-11h-7z'
        />
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    description: 'Working together to achieve extraordinary results.',
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
          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        />
      </svg>
    ),
  },
  {
    title: 'Growth Mindset',
    description: 'Continuously learning and developing our skills.',
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
          d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
        />
      </svg>
    ),
  },
];

const gallery = [
  {
    image: '/careers/careers-2.jpg',
    title: 'Team Building',
  },
  {
    image: '/careers/careers-3.jpg',
    title: 'Office Life',
  },
  {
    image: '/careers/careers-4.jpg',
    title: 'Company Events',
  },
];

export const CompanyCulture = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full'>
            Our Culture
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Life at Our Company
          </h2>
          <p className='text-lg text-gray-600'>
            We&apos;ve built a culture that encourages innovation,
            collaboration, and personal growth.
          </p>
        </motion.div>

        {/* Values */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative'
            >
              <div className='bg-gray-50 rounded-2xl p-8 h-full'>
                <div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6'>
                  {value.icon}
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {value.title}
                </h3>
                <p className='text-gray-600'>{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Gallery */}
        <div className='grid md:grid-cols-3 gap-8'>
          {gallery.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className='group relative'
            >
              <div className='relative h-80 rounded-2xl overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                <div className='absolute bottom-6 left-6 right-6'>
                  <h4 className='text-xl font-bold text-white'>{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Employee Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='mt-16 text-center'
        >
          <blockquote className='text-xl text-gray-600 italic max-w-3xl mx-auto'>
            &ldquo;The culture here is amazing. Everyone is passionate about
            what they do and always willing to help each other grow.&rdquo;
          </blockquote>
          <div className='mt-4'>
            <span className='text-gray-900 font-medium'>Sarah Chen</span>
            <span className='text-gray-500 mx-2'>•</span>
            <span className='text-gray-500'>Senior Developer</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
