'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Research & Analysis',
    description:
      'We analyze your business, competitors, and target audience to develop effective strategies.',
  },
  {
    number: '02',
    title: 'Strategy Development',
    description:
      'Create customized digital marketing plans aligned with your business objectives.',
  },
  {
    number: '03',
    title: 'Implementation',
    description:
      'Execute strategies across various digital channels with precision and expertise.',
  },
  {
    number: '04',
    title: 'Monitor & Optimize',
    description:
      'Continuously track performance and optimize campaigns for maximum ROI.',
  },
];

export const DigitalMarketingProcess = () => {
  return (
    <section className='py-16 relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-50 opacity-50'></div>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='text-center mb-12'>
          <span className='inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4'>
            How We Work
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Our Process
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            A systematic approach to delivering exceptional digital marketing
            results
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative'
            >
              <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='text-4xl font-bold text-indigo-600 mb-4'>
                  {step.number}
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {step.title}
                </h3>
                <p className='text-gray-600'>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-indigo-200'></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
