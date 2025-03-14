'use client';

import { motion } from 'framer-motion';

const missions = [
  {
    title: 'Our Mission',
    description:
      'To empower businesses with innovative technology solutions that drive growth and create lasting impact.',
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
    title: 'Our Vision',
    description:
      'To be the global leader in transformative technology solutions that shape the future of digital innovation.',
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
          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
        />
      </svg>
    ),
  },
];

const values = [
  {
    title: 'Innovation',
    description: 'Pushing boundaries and embracing new technologies.',
  },
  {
    title: 'Excellence',
    description: 'Delivering outstanding quality in everything we do.',
  },
  {
    title: 'Integrity',
    description: 'Operating with honesty, transparency, and ethics.',
  },
  {
    title: 'Collaboration',
    description: 'Working together to achieve extraordinary results.',
  },
];

export const CompanyMission = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Mission & Vision */}
        <div className='grid md:grid-cols-2 gap-8 mb-20'>
          {missions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className='relative'
            >
              <div className='bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 h-full border border-blue-100'>
                <div className='w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6'>
                  {item.icon}
                </div>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  {item.title}
                </h3>
                <p className='text-gray-600 text-lg'>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className='text-center mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-700 bg-blue-50 rounded-full'>
              Our Values
            </span>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              What Drives Us Forward
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Our core values shape our culture and guide every decision we
              make.
            </p>
          </motion.div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <div className='bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100'>
                <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
                  {value.title}
                </h3>
                <p className='text-gray-600'>{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
