'use client';

import { motion } from 'framer-motion';

interface ServiceDetailHeroProps {
  title: string;
  description: string;
}

export const ServiceDetailHero = ({
  title,
  description,
}: ServiceDetailHeroProps) => {
  return (
    <section className='relative overflow-hidden pt-24 pb-24 sm:pb-28 lg:pb-32'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-transparent'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className='absolute top-0 left-0 w-full h-full'
        >
          <div className='absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob' />
          <div className='absolute top-0 right-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000' />
          <div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000' />
        </motion.div>
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center'
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md mb-8'
            >
              <span className='w-2 h-2 rounded-full bg-indigo-600 mr-2' />
              <span className='text-sm font-medium text-indigo-600'>
                Professional Service
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6'
            >
              <span className='inline-block text-gray-900'>{title}</span>
              <span className='inline-block mt-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent'>
                &nbsp;Solutions
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='mx-auto mb-10 max-w-3xl text-lg text-gray-600 sm:mb-12 sm:text-xl'
            >
              {description}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 lg:gap-8'
            >
              {[
                { number: '100+', label: 'Projects Completed' },
                { number: '95%', label: 'Client Satisfaction' },
                { number: '24/7', label: 'Support Available' },
                { number: '10+', label: 'Years Experience' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className='group'
                >
                  <div className='rounded-2xl bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6'>
                    <div className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent transition-transform duration-300 group-hover:scale-110 sm:text-3xl'>
                      {stat.number}
                    </div>
                    <div className='text-sm text-gray-600 mt-2'>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute bottom-0 left-0 right-0'>
        <svg
          className='w-full text-gray-50'
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

