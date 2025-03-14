'use client';

import { motion } from 'framer-motion';

const values = [
  {
    title: 'Innovation',
    description:
      'Constantly pushing boundaries to create cutting-edge solutions.',
    icon: '🚀',
  },
  {
    title: 'Excellence',
    description: 'Delivering exceptional quality in everything we do.',
    icon: '⭐',
  },
  {
    title: 'Integrity',
    description: 'Building trust through transparency and ethical practices.',
    icon: '🤝',
  },
  {
    title: 'Collaboration',
    description: 'Working together to achieve extraordinary results.',
    icon: '👥',
  },
];

export const AboutValues = () => {
  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <span className='inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4'>
            Our Values
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            What Drives Us
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Our core values shape everything we do and guide us in delivering
            exceptional solutions to our clients
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='text-center'
            >
              <div className='text-4xl mb-4'>{value.icon}</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {value.title}
              </h3>
              <p className='text-gray-600'>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
