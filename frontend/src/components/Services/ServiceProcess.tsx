'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We begin by understanding your business needs and project requirements.',
    gradient: 'from-blue-500 to-indigo-500',
    icon: (
      <svg
        className='w-6 h-6'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
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
    number: '02',
    title: 'Planning',
    description:
      'Our team creates a detailed project plan and timeline for execution.',
    gradient: 'from-purple-500 to-pink-500',
    icon: (
      <svg
        className='w-6 h-6'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Development',
    description:
      'We build your solution using the latest technologies and best practices.',
    gradient: 'from-indigo-500 to-violet-500',
    icon: (
      <svg
        className='w-6 h-6'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
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
    number: '04',
    title: 'Delivery',
    description:
      'Final testing, deployment, and handover of your completed project.',
    gradient: 'from-cyan-500 to-blue-500',
    icon: (
      <svg
        className='w-6 h-6'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
        />
      </svg>
    ),
  },
];

export const ServiceProcess = () => {
  return (
    <section className='relative pt-5 sm:pt-10 lg:pt-15 overflow-hidden'>
      {/* Enhanced Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-b from-white via-indigo-50/50 to-white'></div>
        {/* Animated Grid */}
        <div
          className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse'
          style={{
            maskImage:
              'radial-gradient(circle at center, transparent 50%, white)',
          }}
        />
        {/* Floating Orbs */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-float'></div>
          <div className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-200/30 rounded-full blur-3xl animate-float-delayed'></div>
        </div>
      </div>

      <div className='container mx-auto px-4 relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12 md:mb-16'
        >
          <span className='inline-flex items-center px-3 py-1.5 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-sm text-indigo-600 font-medium mb-4'>
            <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
            Our Process
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            How We{' '}
            <span className='relative'>
              <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                Make It Happen
              </span>
              <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
            </span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            We follow a systematic approach to deliver high-quality solutions
            that exceed expectations
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative'>
          {/* Connecting Line */}
          <div className='absolute top-24 left-0 right-0 hidden lg:block'>
            <div className='h-[2px] w-full bg-gradient-to-r from-blue-200/50 via-indigo-300/50 to-violet-200/50'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 animate-pulse-slow'></div>
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className='relative group'
            >
              {/* Futuristic Card */}
              <div className='relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 border border-white/20'>
                {/* Glowing effect on hover */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500'></div>

                {/* Gradient Border */}
                <div className='absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

                {/* Content Container */}
                <div className='relative'>
                  {/* Number and Icon */}
                  <div className='flex items-center gap-4 mb-6'>
                    {/* Animated Number */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${step.gradient} relative`}
                    >
                      {step.number}
                      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 blur-sm animate-shine'></div>
                    </motion.div>

                    {/* Animated Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-[1px] transform group-hover:scale-110 transition-transform duration-500`}
                    >
                      <div className='w-full h-full bg-white rounded-xl flex items-center justify-center relative overflow-hidden'>
                        <div
                          className={`relative z-10 text-white bg-gradient-to-br ${step.gradient} p-2.5 rounded-lg`}
                        >
                          {step.icon}
                        </div>
                        {/* Animated background effect */}
                        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine'></div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.h3
                    whileHover={{ x: 5 }}
                    className='text-xl font-semibold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300'
                  >
                    {step.title}
                  </motion.h3>
                  <p className='text-gray-600 group-hover:text-gray-900 transition-colors duration-300'>
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  {index < steps.length - 1 && (
                    <div className='hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10'>
                      <div className='w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 p-[1px] animate-pulse'>
                        <div className='w-full h-full rounded-full bg-white flex items-center justify-center'>
                          <svg
                            className='w-4 h-4 text-indigo-600 animate-bounce'
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
