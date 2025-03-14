'use client';

import { motion } from 'framer-motion';
import { TechStackIcons } from './TechStackIcons';

interface ServiceTechnologiesProps {
  technologies: string[];
}

export const ServiceTechnologies = ({
  technologies,
}: ServiceTechnologiesProps) => {
  return (
    <section className='py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-4000' />
        <div className='absolute bottom-0 left-1/4 w-96 h-96 bg-violet-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob' />
      </div>

      <div className='container mx-auto px-4 relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          {/* Section Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className='inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md mb-6'
          >
            <span className='w-2 h-2 rounded-full bg-indigo-600 mr-2' />
            <span className='text-sm font-medium text-indigo-600'>
              Tech Stack
            </span>
          </motion.div>

          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            Built with Modern{' '}
            <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
              Technologies
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            We use cutting-edge technologies to deliver scalable and efficient
            solutions
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group relative'
              >
                {/* Card */}
                <div className='relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
                  {/* Gradient Border on Hover */}
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm' />

                  {/* Content */}
                  <div className='relative bg-white rounded-xl p-4 group-hover:bg-gradient-to-br from-indigo-50 to-violet-50 transition-colors duration-300'>
                    {/* Tech Icon */}
                    <div className='w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      {TechStackIcons[tech] || (
                        <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-2xl'>
                          {tech[0]}
                        </div>
                      )}
                    </div>

                    {/* Tech Name */}
                    <p className='text-center font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300'>
                      {tech}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='mt-16 text-center'
          >
            <div className='inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100'>
              <svg
                className='w-5 h-5 text-indigo-600 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                />
              </svg>
              <span className='text-sm font-medium text-gray-600'>
                Always up to date with the latest technologies
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className='absolute bottom-0 left-0 right-0'>
        <svg
          className='w-full text-white'
          viewBox='0 0 1440 100'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0 50L60 45.7C120 41.3 240 32.7 360 29.3C480 26 600 28 720 35.3C840 42.7 960 55.3 1080 57.7C1200 60 1320 52 1380 48L1440 44V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </section>
  );
};
