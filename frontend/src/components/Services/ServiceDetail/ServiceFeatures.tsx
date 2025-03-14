'use client';

import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface ServiceFeaturesProps {
  features: Feature[];
}

export const ServiceFeatures = ({ features }: ServiceFeaturesProps) => {
  return (
    <section className='py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000' />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:14px_24px]' />
      </div>

      <div className='container mx-auto px-4 relative'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-20'
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className='w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 p-[3px]'
          >
            <div className='w-full h-full rounded-full bg-white flex items-center justify-center'>
              <span className='text-3xl'>✨</span>
            </div>
          </motion.div>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            Powerful Features for{' '}
            <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
              Modern Solutions
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            Discover the tools and features that will transform your digital
            experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Feature Card */}
              <div className='group relative'>
                {/* Card Content */}
                <div className='relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100'>
                  {/* Icon */}
                  <div className='mb-6 relative'>
                    <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 p-[2px] group-hover:scale-110 transition-transform duration-300'>
                      <div className='w-full h-full rounded-xl bg-white flex items-center justify-center text-2xl'>
                        {feature.icon}
                      </div>
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300' />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600 leading-relaxed'>
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className='absolute bottom-0 left-8 right-8 h-[2px]'>
                    <div className='h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500' />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className='mt-20 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='inline-flex items-center px-6 py-3 rounded-full bg-white shadow-md hover:shadow-lg text-gray-600 hover:text-indigo-600 transition-all duration-300 group'
          >
            <span className='mr-2 font-medium'>Explore All Features</span>
            <svg
              className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </motion.div>
        </div> */}
      </div>
    </section>
  );
};
