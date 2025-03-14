'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  {
    value: 95,
    suffix: '%',
    label: 'Customer Satisfaction',
    description: 'Of our clients report improved efficiency',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Global Clients',
    description: 'Trusted by companies worldwide',
  },
  {
    value: 100,
    suffix: 'M+',
    label: 'Revenue Generated',
    description: 'For our clients in the last year',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Support Available',
    description: 'Our team is here to help you succeed',
  },
];

export const CompanyStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className='py-20 bg-gradient-to-br from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <motion.div
          ref={ref}
          className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='text-center'
            >
              <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full'>
                <motion.div
                  className='text-4xl font-bold text-blue-600 mb-2'
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                  {stat.suffix}
                </motion.div>
                <div className='text-xl font-semibold text-gray-900 mb-2'>
                  {stat.label}
                </div>
                <p className='text-gray-600'>{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
