'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'John Anderson',
    role: 'Chief Executive Officer',
    image: '/testimonials/testimonial-1.jpg',
    bio: 'With over 20 years of experience in technology leadership.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    image: '/testimonials/testimonial-2.jpg',
    bio: 'Leading our technical innovation and engineering excellence.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Michael Roberts',
    role: 'Chief Operating Officer',
    image: '/testimonials/testimonial-3.jpg',
    bio: 'Driving operational efficiency and business growth.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Emily Parker',
    role: 'Chief Marketing Officer',
    image: '/testimonials/testimonial-4.jpg',
    bio: 'Creating impactful brand strategies and market presence.',
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
];

export const CompanyTeam = () => {
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
            Our Leadership
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Meet the Team Behind Our Success
          </h2>
          <p className='text-lg text-gray-600'>
            A diverse group of leaders passionate about innovation and
            excellence.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group'
            >
              <div className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300'>
                {/* Image Container */}
                <div className='relative h-80 overflow-hidden'>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  {/* Overlay with Social Links */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='absolute bottom-4 left-4 right-4 flex justify-end gap-2'>
                      <a
                        href={member.social.linkedin}
                        className='p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <svg
                          className='w-5 h-5 text-white'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                        </svg>
                      </a>
                      <a
                        href={member.social.twitter}
                        className='p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <svg
                          className='w-5 h-5 text-white'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>
                    {member.name}
                  </h3>
                  <div className='text-blue-600 font-medium mb-3'>
                    {member.role}
                  </div>
                  <p className='text-gray-600'>{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
