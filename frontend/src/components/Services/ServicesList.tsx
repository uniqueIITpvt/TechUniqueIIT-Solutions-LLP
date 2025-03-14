'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Web Development',
    description:
      'Custom web applications built with modern technologies and best practices.',
    path: '/services/web-development',
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M14 4h6v6M10 20H4v-6'
        />
      </svg>
    ),
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    title: 'Mobile Development',
    description:
      'Native and cross-platform mobile applications for iOS and Android.',
    path: '/services/mobile-development',
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <rect x='5' y='2' width='14' height='20' rx='2' strokeWidth={1.5} />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M12 18h.01M8 2h8'
        />
        <path d='M9 22h6' strokeLinecap='round' strokeWidth={1.5} />
        <path
          d='M7 6h10M7 9h10M7 12h10'
          strokeLinecap='round'
          strokeWidth={1.5}
        />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'UI/UX Design',
    description:
      'User-centered design solutions that create engaging digital experiences.',
    path: '/services/ui-ux-design',
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z'
        />
        <path
          d='M7 9l10-4M17 19L7 15'
          strokeLinecap='round'
          strokeWidth={1.5}
        />
      </svg>
    ),
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure and solutions for modern businesses.',
    path: '/services/cloud-solutions',
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M12 12v7m0 0l-3-3m3 3l3-3'
        />
        <circle cx='12' cy='8' r='1' fill='currentColor' />
      </svg>
    ),
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Digital Marketing',
    description:
      'Strategic digital marketing solutions to grow your online presence.',
    path: '/services/digital-marketing',
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
        />
        <circle cx='16' cy='5' r='1' fill='currentColor' />
        <circle cx='12' cy='9' r='1' fill='currentColor' />
        <circle cx='8' cy='13' r='1' fill='currentColor' />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'AI Solutions',
    description:
      'Intelligent automation and AI-powered solutions for business growth.',
    path: '/services/ai-solutions',
    icon: (
      <svg
        className='w-10 h-10'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
        />
        <circle cx='7.5' cy='12' r='1' fill='currentColor' />
        <circle cx='16.5' cy='12' r='1' fill='currentColor' />
      </svg>
    ),
    gradient: 'from-rose-500 to-red-500',
  },
];

export const ServicesList = () => {
  return (
    <section className='relative pt-16 sm:pt-20 lg:pt-24 overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-b from-white via-indigo-50/50 to-white'></div>
        <div
          className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:4rem_4rem]'
          style={{
            maskImage:
              'radial-gradient(circle at center, transparent 50%, white)',
          }}
        ></div>
      </div>

      <div className='container mx-auto px-4 relative'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12 md:mb-16'
        >
          <span className='inline-flex items-center px-3 py-1.5 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-sm text-indigo-600 font-medium mb-4'>
            <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
            Our Services
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Transforming Ideas into{' '}
            <span className='relative'>
              <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                Digital Reality
              </span>
              <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
            </span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Explore our comprehensive range of services designed to help your
            business thrive in the digital age.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.path}>
                <div className='group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500'>
                  {/* Top Gradient Bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform origin-left transition-transform duration-500 group-hover:scale-x-100`}
                  ></div>

                  <div className='p-8 sm:p-10'>
                    <div className='flex items-start gap-6'>
                      {/* Icon Container */}
                      <div
                        className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-[1px] transform group-hover:scale-110 transition-transform duration-500`}
                      >
                        <div className='w-full h-full bg-white rounded-2xl flex items-center justify-center'>
                          <div
                            className={`group-hover:scale-110 transition-transform duration-300`}
                          >
                            <div
                              className={`bg-gradient-to-br ${service.gradient} [&>svg]:stroke-white p-3 rounded-xl`}
                            >
                              {service.icon}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className='flex-1'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300'>
                          {service.title}
                        </h3>
                        <p className='text-gray-600 mb-4 group-hover:text-gray-900 transition-colors duration-300'>
                          {service.description}
                        </p>

                        {/* Learn More Link */}
                        <div
                          className={`inline-flex items-center font-semibold bg-gradient-to-br ${service.gradient} text-white px-4 py-2 rounded-full text-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300`}
                        >
                          <span>Learn More</span>
                          <svg
                            className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Gradient Line - Animated */}
                    <div className='absolute bottom-0 left-0 w-full h-[2px] overflow-hidden'>
                      <div
                        className={`w-full h-full bg-gradient-to-r ${service.gradient} transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700`}
                      ></div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Optional: Add a decorative element at the bottom */}
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2'>
          <div className='w-96 h-96 bg-gradient-to-r from-indigo-100/20 to-violet-100/20 rounded-full blur-3xl opacity-50'></div>
        </div>
      </div>
    </section>
  );
};
