'use client';

import { motion } from 'framer-motion';

const missions = [
  {
    title: 'Our Mission',
    description:
      'To design, build, and support practical digital solutions aligned with each client’s real workflows and goals.',
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
    title: 'Our Approach',
    description:
      'Understand the requirement first, choose technology responsibly, communicate clearly, and stay accountable after launch.',
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
    title: 'Ownership',
    description: 'Taking responsibility for delivery, stability, and support.',
  },
  {
    title: 'Clarity',
    description: 'Keeping priorities, trade-offs, and progress easy to understand.',
  },
  {
    title: 'Practical Innovation',
    description: 'Using the right technology to solve the actual problem.',
  },
  {
    title: 'Partnership',
    description: 'Listening carefully and supporting clients beyond delivery.',
  },
];

export const CompanyMission = () => {
  return (
    <section className='bg-white py-12 sm:py-16 lg:py-20'>
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
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
              <div className='bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-8 h-full border border-indigo-100'>
                <div className='w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6'>
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
            <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full'>
              Our Values
            </span>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              What Drives Us Forward
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              How we work across product development, maintenance, and client
              collaboration.
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
                <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors'>
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
