'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    content:
      'Working with TechUniqueIIT has been transformative for our business. Their innovative solutions have helped us scale efficiently.',
    author: 'Sarah Johnson',
    role: 'CEO, TechCorp',
    image: '/testimonials/testimonial-1.jpg',
  },
  {
    content:
      "The team's expertise and dedication to our project was exceptional. They delivered beyond our expectations.",
    author: 'Michael Chen',
    role: 'CTO, InnovateLabs',
    image: '/testimonials/testimonial-2.jpg',
  },
  {
    content:
      'Their cybersecurity solutions have given us peace of mind. Highly recommended for any business serious about security.',
    author: 'Emily Rodriguez',
    role: 'Security Director, SecureNet',
    image: '/testimonials/testimonial-3.jpg',
  },
  {
    content:
      'The team is very professional and dedicated to our project. They delivered beyond our expectations.',
    author: ' Chen',
    role: 'CTO, InnovateLabs',
    image: '/testimonials/testimonial-2.jpg',
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const pageSize = isMobile ? 1 : 3;
  const groups = Array.from(
    { length: Math.ceil(testimonials.length / pageSize) },
    (_, index) => testimonials.slice(index * pageSize, index * pageSize + pageSize)
  );

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groups.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? groups.length - 1 : prevIndex - 1
    );
  };

  const visibleTestimonials = groups[currentIndex] ?? [];

  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50 py-12 sm:py-16 lg:py-20'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-indigo-100/50'></div>
        <div className='absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-violet-100/50'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto mb-12 max-w-2xl text-center sm:mb-16'
        >
          <span className='mb-6 inline-flex items-center rounded-full border border-indigo-50 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-md shadow-indigo-100'>
            <span className='mr-2 flex h-2 w-2 rounded-full bg-indigo-600'></span>
            Client Stories
          </span>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 sm:text-4xl'>
            Trusted by{' '}
            <span className='relative'>
              <span className='relative z-10 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
                Industry Leaders
              </span>
              <span className='absolute inset-x-0 bottom-0 z-0 h-3 bg-indigo-100/50'></span>
            </span>
          </h2>
          <p className='text-base text-gray-600 sm:text-lg'>
            Don&apos;t just take our word for it - hear from some of our
            satisfied clients about their experience working with us.
          </p>
        </motion.div>

        <div className='relative mx-auto max-w-6xl md:px-10'>
          <div className='absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 md:block'>
            <button
              onClick={prevTestimonial}
              suppressHydrationWarning
              className='group rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl'
              aria-label='Previous testimonials'
            >
              <svg
                className='h-6 w-6 text-indigo-600 transition-transform duration-300 group-hover:-translate-x-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
          </div>

          <div className='absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 md:block'>
            <button
              onClick={nextTestimonial}
              suppressHydrationWarning
              className='group rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl'
              aria-label='Next testimonials'
            >
              <svg
                className='h-6 w-6 text-indigo-600 transition-transform duration-300 group-hover:translate-x-1'
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
            </button>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'>
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.author}-${currentIndex}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group'
              >
                <div className='relative h-full rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] sm:p-8'>
                  <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-violet-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  <div className='absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-transform duration-300 group-hover:scale-x-100' />

                  <div className='absolute right-6 top-6 -rotate-6 text-indigo-100 transition-colors duration-300 group-hover:text-indigo-200 sm:right-8'>
                    <svg className='h-12 w-12 sm:h-16 sm:w-16' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                    </svg>
                  </div>

                  <div className='relative mb-6 sm:mb-8'>
                    <p className='text-sm italic text-gray-600 sm:text-base'>
                      {testimonial.content}
                    </p>
                  </div>

                  <div className='flex items-center space-x-4'>
                    <div className='relative h-12 w-12'>
                      <div className='absolute inset-0 -rotate-6 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-transform duration-300 group-hover:rotate-6' />
                      <div className='relative h-full w-full overflow-hidden rounded-full border-2 border-white'>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-semibold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600'>
                        {testimonial.author}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  <div className='absolute right-0 top-0 h-16 w-16 scale-0 rounded-bl-[100px] bg-gradient-to-br from-indigo-600/5 to-violet-600/5 transition-transform duration-300 group-hover:scale-100' />
                  <div className='absolute bottom-0 left-0 h-16 w-16 scale-0 rounded-tr-[100px] bg-gradient-to-tr from-indigo-600/5 to-violet-600/5 transition-transform duration-300 group-hover:scale-100' />
                </div>
              </motion.div>
            ))}
          </div>

          <div className='mt-6 flex items-center justify-center gap-3 md:hidden'>
            <button
              onClick={prevTestimonial}
              suppressHydrationWarning
              className='group rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl'
              aria-label='Previous testimonials'
            >
              <svg
                className='h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:-translate-x-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            <div className='flex justify-center space-x-2'>
              {groups.map((_, idx) => (
                <button
                  key={idx}
                  suppressHydrationWarning
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-6 bg-indigo-600'
                      : 'w-2 bg-indigo-200 hover:bg-indigo-300'
                  }`}
                  aria-label={`Go to testimonial group ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              suppressHydrationWarning
              className='group rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl'
              aria-label='Next testimonials'
            >
              <svg
                className='h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:translate-x-1'
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
            </button>
          </div>

          <div className='mt-8 hidden justify-center space-x-2 md:flex'>
            {groups.map((_, idx) => (
              <button
                key={idx}
                suppressHydrationWarning
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-6 bg-indigo-600'
                    : 'w-2 bg-indigo-200 hover:bg-indigo-300'
                }`}
                aria-label={`Go to testimonial group ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
