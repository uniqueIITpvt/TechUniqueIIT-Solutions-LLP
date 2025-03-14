'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const achievements = [
  {
    number: '25+',
    label: 'Projects Completed',
    description: 'Successfully delivered diverse digital solutions',
  },
  {
    number: '95%',
    label: 'Client Satisfaction',
    description: 'Consistently exceeding client expectations',
  },
  {
    number: '24/7',
    label: 'Support Available',
    description: 'Round-the-clock technical assistance',
  },
];

const journey = [
  {
    year: '2022',
    title: 'The Beginning',
    description:
      'Founded with a vision to revolutionize digital solutions in India',
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
          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
        />
      </svg>
    ),
  },
  {
    year: '2023',
    title: 'Rapid Growth',
    description:
      'Expanded our services and established strong client relationships',
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
          d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
        />
      </svg>
    ),
  },
  {
    year: '2024',
    title: 'Innovation Hub',
    description: 'Leading the way in AI and cloud-based solutions',
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
          d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
        />
      </svg>
    ),
  },
];

export const AboutStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className='py-20 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:4rem_4rem]'></div>
      <div className='absolute inset-0 bg-gradient-to-b from-white via-transparent to-white'></div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='max-w-7xl mx-auto' ref={ref}>
          {/* Achievements Section */}
          <div className='grid md:grid-cols-3 gap-8 mb-24'>
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className='text-center'
              >
                <div className='relative inline-block'>
                  <div className='absolute inset-0 bg-indigo-100 rounded-full transform -rotate-6'></div>
                  <div className='relative bg-white rounded-full p-8 shadow-lg'>
                    <div className='text-4xl font-bold text-indigo-600 mb-2'>
                      {item.number}
                    </div>
                    <div className='text-lg font-semibold text-gray-900'>
                      {item.label}
                    </div>
                    <p className='text-sm text-gray-600 mt-2'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='relative'
          >
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
                Our Journey
              </h2>
              <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
                From our inception to present day, we&apos;ve been committed to
                delivering excellence and innovation in everything we do.
              </p>
            </div>

            <div className='space-y-12'>
              {journey.map((step, index) => (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className='relative'
                >
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white'>
                      {step.icon}
                    </div>
                    <div className='ml-6'>
                      <div className='flex items-center'>
                        <span className='text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full'>
                          {step.year}
                        </span>
                        <h3 className='text-xl font-bold text-gray-900 ml-4'>
                          {step.title}
                        </h3>
                      </div>
                      <p className='mt-2 text-gray-600 max-w-2xl'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < journey.length - 1 && (
                    <div className='absolute left-6 top-12 w-0.5 h-12 bg-indigo-100'></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
