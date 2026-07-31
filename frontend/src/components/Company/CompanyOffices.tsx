'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const offices = [
  {
    city: 'New Delhi',
    country: 'India',
    address: 'South Delhi, Delhi, India',
    image: '/company/company-1.jpg',
    phone: '+91 7838758293',
    email: 'info@techuniqueiit.com',
  },
];

export const CompanyOffices = () => {
  return (
    <section className='bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 lg:py-20'>
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full'>
            Headquarters
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Our Office Location
          </h2>
          <p className='text-lg text-gray-600'>
            Reach the TechUniqueIIT team at its South Delhi location.
          </p>
        </motion.div>

        {/* Offices Grid */}
        <div className='max-w-xl mx-auto'>
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300'>
                {/* Image */}
                <div className='relative h-48 overflow-hidden'>
                  <Image
                    src={office.image}
                    alt={office.city + ' office location'}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                </div>

                {/* Content */}
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>
                    {office.city}
                  </h3>
                  <div className='text-indigo-600 font-medium mb-4'>
                    {office.country}
                  </div>
                  <div className='space-y-3 text-gray-600'>
                    <p>{office.address}</p>
                    <p>
                      <span className='font-medium'>Phone:</span> {office.phone}
                    </p>
                    <p>
                      <span className='font-medium'>Email:</span>{' '}
                      <a
                        href={`mailto:${office.email}`}
                        className='text-indigo-600 hover:text-indigo-700'
                      >
                        {office.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
