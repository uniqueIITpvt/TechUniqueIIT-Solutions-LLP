'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';

const testimonials = [
  {
    quote:
      'The team delivered exceptional results. Their expertise in web development transformed our e-commerce platform, leading to a significant increase in sales and user engagement.',
    author: 'Sarah Johnson',
    position: 'CEO, TechStart Inc.',
    image: '/testimonials/testimonial-1.jpg',
    rating: 5,
    project: 'E-commerce Platform',
  },
  {
    quote:
      'Outstanding service and technical expertise. The mobile banking app they developed exceeded our expectations in terms of security and user experience.',
    author: 'Michael Chen',
    position: 'CTO, Digital Bank Ltd.',
    image: '/testimonials/testimonial-2.jpg',
    rating: 5,
    project: 'Mobile Banking App',
  },
  {
    quote:
      'Their healthcare platform solution revolutionized how we connect with patients. The attention to detail and technical implementation was impressive.',
    author: 'Dr. Emily Roberts',
    position: 'Director, MedTech Solutions',
    image: '/testimonials/testimonial-3.jpg',
    rating: 5,
    project: 'Healthcare Platform',
  },
  {
    quote:
      "Their attention to detail and innovative solutions helped us achieve remarkable results. The team's expertise in cloud solutions was invaluable.",
    author: 'David Wilson',
    position: 'CIO, CloudTech Solutions',
    image: '/testimonials/testimonial-4.jpg',
    rating: 5,
    project: 'Cloud Infrastructure',
  },
  {
    quote:
      'The UI/UX design team created an exceptional user experience that perfectly aligned with our brand vision. Outstanding work!',
    author: 'Lisa Anderson',
    position: 'Head of Product, DesignCraft',
    image: '/testimonials/testimonial-5.jpg',
    rating: 5,
    project: 'UI/UX Redesign',
  },
];

export const CaseStudiesTestimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className='py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full'>
            Client Success Stories
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            What Our Clients Say
          </h2>
          <p className='text-lg text-gray-600'>
            Real feedback from real clients about their experience working with
            us
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <div className='relative max-w-[1200px] mx-auto'>
          {/* Background Elements */}
          <div className='absolute top-0 left-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2'></div>
          <div className='absolute bottom-0 right-0 w-32 h-32 bg-violet-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2'></div>

          {/* Scroll Buttons */}
          <div className='absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between z-20 px-2 md:px-4'>
            <button
              onClick={() => scroll('left')}
              className={`transform -translate-x-4 transition-all ${
                canScrollLeft
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className='w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors'>
                <svg
                  className='w-6 h-6'
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
              </div>
            </button>
            <button
              onClick={() => scroll('right')}
              className={`transform translate-x-4 transition-all ${
                canScrollRight
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className='w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors'>
                <svg
                  className='w-6 h-6'
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
              </div>
            </button>
          </div>

          {/* Scrollable Container */}
          <div className='relative'>
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className='overflow-x-auto hide-scrollbar pb-8'
            >
              <div className='flex gap-6 md:px-4'>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='flex-shrink-0 w-[300px]'
                  >
                    <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full'>
                      {/* Quote Icon */}
                      <div className='mb-6'>
                        <div className='w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center'>
                          <svg
                            className='w-6 h-6 text-white'
                            fill='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path d='M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z' />
                          </svg>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className='flex gap-1 mb-4'>
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className='w-4 h-4 text-yellow-400'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                          </svg>
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className='text-gray-600 mb-6 text-sm line-clamp-4'>
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      {/* Author Info */}
                      <div className='flex items-center gap-3'>
                        <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            fill
                            className='object-cover'
                          />
                        </div>
                        <div>
                          <h4 className='font-semibold text-gray-900 text-sm'>
                            {testimonial.author}
                          </h4>
                          <p className='text-gray-500 text-xs'>
                            {testimonial.position}
                          </p>
                          <p className='text-indigo-600 text-xs mt-0.5'>
                            {testimonial.project}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-16'
        >
          <p className='text-gray-600 mb-6'>
            Join our growing list of satisfied clients
          </p>
          <button className='inline-flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors duration-300'>
            Start Your Project
            <svg
              className='ml-2 w-5 h-5'
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
          </button>
        </motion.div>
      </div>
    </section>
  );
};
