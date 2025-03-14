'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const offices = [
  {
    city: 'San Francisco',
    country: 'United States',
    address: '100 Market Street, Suite 300, CA 94105',
    image: '/company/company-2.jpg',
    phone: '+1 (415) 555-0123',
    email: 'sf@company.com',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    address: '10 Liverpool Street, EC2M 7PD',
    image: '/company/company-3.jpg',
    phone: '+44 20 7123 4567',
    email: 'london@company.com',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '1 Raffles Place, #20-61, 048616',
    image: '/company/company-4.jpg',
    phone: '+65 6789 0123',
    email: 'singapore@company.com',
  },
];

export const CompanyOffices = () => {
  return (
    <section className='py-20 bg-gradient-to-br from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-700 bg-blue-50 rounded-full'>
            Global Presence
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Our Offices Around the World
          </h2>
          <p className='text-lg text-gray-600'>
            Strategically located offices to serve our global client base.
          </p>
        </motion.div>

        {/* Offices Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
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
                    alt={office.city}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                </div>

                {/* Content */}
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>
                    {office.city}
                  </h3>
                  <div className='text-blue-600 font-medium mb-4'>
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
                        className='text-blue-600 hover:text-blue-700'
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
