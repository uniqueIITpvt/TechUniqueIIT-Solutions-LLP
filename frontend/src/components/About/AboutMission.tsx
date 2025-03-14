'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const missions = [
  {
    title: 'Our Mission',
    description:
      'To deliver innovative and scalable technology solutions that drive digital transformation and empower businesses to achieve their full potential.',
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M13 10V3L4 14h7v7l9-11h-7z'
        />
      </svg>
    ),
  },
  {
    title: 'Our Approach',
    description:
      'We combine cutting-edge technology with creative thinking to develop solutions that are not just effective, but also future-proof and scalable.',
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
        />
      </svg>
    ),
  },
  {
    title: 'Our Promise',
    description:
      'We are committed to maintaining the highest standards of quality, integrity, and innovation in every project we undertake.',
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
    ),
  },
];

const services = [
  'Web Development',
  'Mobile Apps',
  'Cloud Solutions',
  'UI/UX Design',
  'Digital Marketing',
  'AI Solutions',
  'DevOps',
  'Consulting',
];

export const AboutMission = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className='py-20 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white'></div>
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob'></div>
        <div className='absolute top-0 -right-4 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-4000'></div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='max-w-7xl mx-auto' ref={ref}>
          {/* Mission Cards */}
          <div className='grid md:grid-cols-3 gap-8 mb-20'>
            {missions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300'
              >
                <div className='text-indigo-600 mb-6'>{item.icon}</div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  {item.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='text-center'
          >
            <h2 className='text-3xl font-bold text-gray-900 mb-12'>
              Our Expertise
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className='bg-white/50 backdrop-blur-sm border border-indigo-100 rounded-lg p-4 hover:bg-indigo-50 transition-all duration-300'
                >
                  <span className='text-gray-800 font-medium'>{service}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
