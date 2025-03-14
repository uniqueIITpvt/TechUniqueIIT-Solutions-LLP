'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  {
    name: 'Microsoft',
    logo: '/brand-icons/microsoft-svgrepo-com.svg',
    category: 'Technology Partner',
  },
  {
    name: 'Amazon Web Services',
    logo: '/tech-logos/aws-2.svg',
    category: 'Cloud Partner',
  },
  {
    name: 'Google Cloud',
    logo: '/tech-logos/cloud-logo/google-cloud-1.svg',
    category: 'Technology Partner',
  },
  {
    name: 'Salesforce',
    logo: '/tech-logos/crm-logo/salesforce-1.svg',
    category: 'Solution Partner',
  },
  {
    name: 'Oracle',
    logo: '/brand-icons/oracle-svgrepo-com.svg',
    category: 'Technology Partner',
  },
  {
    name: 'IBM',
    logo: '/brand-icons/ibm-svgrepo-com.svg',
    category: 'Strategic Partner',
  },
];

const testimonials = [
  {
    quote:
      'The partnership has been instrumental in accelerating our digital transformation journey.',
    author: 'David Wilson',
    role: 'CTO',
    company: 'Global Tech Solutions',
    image: '/company/testimonial-1.jpg',
  },
  {
    quote:
      'Their innovative solutions have helped us achieve remarkable results in record time.',
    author: 'Jennifer Lee',
    role: 'Director of Innovation',
    company: 'Future Enterprises',
    image: '/company/testimonial-2.jpg',
  },
];

export const CompanyPartners = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-700 bg-blue-50 rounded-full'>
            Our Partners
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Trusted by Industry Leaders
          </h2>
          <p className='text-lg text-gray-600'>
            We collaborate with leading companies to deliver exceptional
            solutions.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20'>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <div className='bg-gray-50 rounded-xl p-6 h-full flex flex-col items-center justify-center hover:bg-gray-100 transition-colors duration-300'>
                <div className='relative w-32 h-12'>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className='object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300'
                  />
                </div>
                <span className='text-sm text-gray-500 mt-3'>
                  {partner.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className='bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-sm'>
                <div className='flex items-center gap-4 mb-6'>
                  <div className='relative w-16 h-16 rounded-full overflow-hidden'>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div>
                    <div className='font-semibold text-gray-900'>
                      {testimonial.author}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {testimonial.role}
                    </div>
                    <div className='text-sm text-blue-600'>
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <blockquote className='text-gray-600 italic'>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='text-center mt-16'
        >
          <p className='text-lg text-gray-600 mb-6'>
            Interested in partnering with us?
          </p>
          <a
            href='#'
            className='inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors'
          >
            Become a Partner
          </a>
        </motion.div>
      </div>
    </section>
  );
};
