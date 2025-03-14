'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => {
      const increment = isMobile ? 1 : 3;
      return prevIndex + increment >= testimonials.length
        ? 0
        : prevIndex + increment;
    });
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => {
      const increment = isMobile ? 1 : 3;
      return prevIndex - increment < 0
        ? Math.max(testimonials.length - increment, 0)
        : prevIndex - increment;
    });
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + (isMobile ? 1 : 3)
  );

  return (
    <section className='py-20 bg-gradient-to-b from-white to-indigo-50/50 relative overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-indigo-100/50'></div>
        <div className='absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-violet-100/50'></div>
      </div>

      <div className='relative container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-2xl mx-auto mb-16'
        >
          <span className='inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-sm text-indigo-600 font-medium mb-6'>
            <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
            Client Stories
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Trusted by{' '}
            <span className='relative'>
              <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                Industry Leaders
              </span>
              <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            Don&apos;t just take our word for it - hear from some of our
            satisfied clients about their experience working with us.
          </p>
        </motion.div>

        {/* Testimonials Carousel Container */}
        <div className='relative max-w-6xl mx-auto'>
          {/* Navigation Buttons */}
          <div className='absolute top-1/2 -left-4 sm:-left-8 transform -translate-y-1/2 z-10'>
            <button
              onClick={prevTestimonial}
              className='p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 group'
              aria-label='Previous testimonials'
            >
              <svg
                className='w-6 h-6 text-indigo-600 transform group-hover:-translate-x-1 transition-transform duration-300'
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

          <div className='absolute top-1/2 -right-4 sm:-right-8 transform -translate-y-1/2 z-10'>
            <button
              onClick={nextTestimonial}
              className='p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 group'
              aria-label='Next testimonials'
            >
              <svg
                className='w-6 h-6 text-indigo-600 transform group-hover:translate-x-1 transition-transform duration-300'
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

          {/* Testimonials Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.author}-${currentIndex + index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group'
              >
                <div className='relative h-full bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] transition-all duration-300'>
                  {/* Gradient Background Effect */}
                  <div className='absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-violet-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                  {/* Top Accent Line */}
                  <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300' />

                  {/* Quote Icon */}
                  <div className='absolute top-6 right-8 text-indigo-100 transform -rotate-6 group-hover:text-indigo-200 transition-colors duration-300'>
                    <svg
                      className='w-16 h-16'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className='relative mb-8'>
                    <p className='text-gray-600 italic'>
                      {testimonial.content}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className='flex items-center space-x-4'>
                    <div className='relative w-12 h-12'>
                      <div className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full transform -rotate-6 group-hover:rotate-6 transition-transform duration-300' />
                      <div className='relative w-full h-full rounded-full overflow-hidden border-2 border-white'>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300'>
                        {testimonial.author}
                      </div>
                      <div className='text-sm text-gray-500'>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner Accents */}
                  <div className='absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-600/5 to-violet-600/5 rounded-bl-[100px] transform scale-0 group-hover:scale-100 transition-transform duration-300' />
                  <div className='absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-600/5 to-violet-600/5 rounded-tr-[100px] transform scale-0 group-hover:scale-100 transition-transform duration-300' />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className='flex justify-center mt-8 space-x-2'>
            {Array.from({
              length: Math.ceil(testimonials.length / (isMobile ? 1 : 3)),
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * (isMobile ? 1 : 3))}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / (isMobile ? 1 : 3)) === idx
                    ? 'bg-indigo-600 w-6'
                    : 'bg-indigo-200 hover:bg-indigo-300'
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
