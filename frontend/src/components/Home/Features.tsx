'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    title: 'Custom Software Development',
    description:
      'Tailored solutions built from scratch to meet your specific business needs and requirements.',
    href: '/services/web-development',
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
          d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
        />
      </svg>
    ),
  },
  {
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure and services to power your applications and business processes.',
    href: '/services/cloud-solutions',
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
          d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
        />
      </svg>
    ),
  },
  {
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    href: '/services/mobile-development',
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
          d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
        />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    description:
      'User-centered design solutions that create engaging and intuitive digital experiences.',
    href: '/services/ui-ux-design',
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
          d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
        />
      </svg>
    ),
  },
];

export const Features = () => {
  return (
    <section className='py-10 bg-gradient-to-b from-white to-indigo-50/50 relative overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-0 w-72 h-72 bg-indigo-100/30 rounded-full mix-blend-multiply filter blur-xl' />
        <div className='absolute top-1/2 right-0 w-72 h-72 bg-violet-100/30 rounded-full mix-blend-multiply filter blur-xl' />
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
            Our Services
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Comprehensive{' '}
            <span className='relative'>
              <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                Digital Solutions
              </span>
              <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            We offer a full range of digital services to help your business grow
            and succeed in the modern world.
          </p>
        </motion.div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <div className='relative h-full bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] transition-all duration-300 overflow-hidden'>
                {/* Gradient Background Effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-violet-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* Top Accent Line */}
                <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300' />

                {/* Feature Icon with Enhanced Design */}
                <div className='relative flex items-center justify-center mb-8'>
                  <div className='absolute inset-0 bg-indigo-100 rounded-full scale-150 opacity-20' />
                  <div className='relative w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300'>
                    {feature.icon}
                  </div>
                </div>

                {/* Feature Content with Enhanced Typography */}
                <div className='relative'>
                  <h3 className='text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 group-hover:text-gray-700 transition-colors duration-300'>
                    {feature.description}
                  </p>

                  {/* Learn More Link - Now Active */}
                  <Link
                    href={feature.href}
                    className='mt-6 flex items-center text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:text-indigo-700'
                  >
                    Learn More
                    <svg
                      className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </Link>
                </div>

                {/* Decorative Corner Accents */}
                <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-600/5 to-violet-600/5 rounded-bl-[100px] transform scale-0 group-hover:scale-100 transition-transform duration-300' />
                <div className='absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-indigo-600/5 to-violet-600/5 rounded-tr-[100px] transform scale-0 group-hover:scale-100 transition-transform duration-300' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
