'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    content:
      'A sales commission application can be built by many developers, but finding a team that understands the business rules and takes ownership is difficult. TechUniqueIIT understood our calculation and payout process properly, suggested practical improvements, and delivered a system our team can manage with confidence.',
    author: 'Mohammad Murtaza',
    role: 'Entrepreneur',
    project: 'Sales Commission Management System (SCMS)',
    avatar: 'MM',
  },
  {
    content:
      'They did not treat our HRMS as just another software project. The team patiently mapped our payroll, attendance, and onboarding workflows before development, while the project manager kept every stage clear and organised. That combination of product understanding and disciplined execution made the rollout much easier for us.',
    author: 'Vinod Choudhary',
    role: 'IT Manager',
    project: 'HRMS (Human Resource Management System)',
    avatar: 'VC',
  },
  {
    content:
      'What stood out was how carefully the team listened to both our teachers and administrative staff. They understood that course delivery, examinations, and student records all needed to work together, then shaped the portal around our daily routine. Their patience during feedback and training helped our staff adopt it comfortably.',
    author: 'Rakesh Verma',
    role: 'School Manager',
    project: 'Student Management System / LMS',
    avatar: 'RV',
  },
  {
    content:
      'Taking responsibility for an existing application is never easy, but their engineers first studied the old code instead of rushing into changes. They resolved long-standing issues, explained priorities honestly, and now manage the cloud environment with consistent updates. That transparency has made the team feel like a dependable technical partner.',
    author: 'Mohammad Mufazzal',
    role: 'Technical Manager',
    project: 'Application Maintenance & Cloud Support',
    avatar: 'MM',
  },
  {
    content:
      'The team did not arrive with a generic content calendar. They researched our audience, understood the purpose of each platform, and coordinated social content and YouTube work around clear goals. Their consistency, quick responses, and willingness to refine ideas have made working together genuinely easy.',
    author: 'Hasan',
    role: 'Owner, Caspian Media',
    project: 'Social Media Research & Marketing',
    avatar: 'H',
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
    <section className='relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50 py-14 sm:py-18 lg:py-22'>
      {/* Background Decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl'></div>
        <div className='absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-violet-100/50 blur-3xl'></div>
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto mb-12 max-w-2xl text-center sm:mb-16'
        >
          <span className='mb-4 inline-flex items-center rounded-full border border-indigo-50 bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-indigo-600 shadow-md shadow-indigo-100'>
            <span className='mr-2 flex h-2 w-2 rounded-full bg-indigo-600'></span>
            Client Stories
          </span>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 sm:text-4xl'>
            Trusted by{' '}
            <span className='relative'>
              <span className='relative z-10 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
                Business Leaders
              </span>
              <span className='absolute inset-x-0 bottom-0 z-0 h-3 bg-indigo-100/50'></span>
            </span>
          </h2>
          <p className='text-base text-gray-600 sm:text-lg'>
            Real feedback from business leaders and managers who rely on TechUniqueIIT software solutions.
          </p>
        </motion.div>

        {/* Carousel Grid */}
        <div className='relative'>
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-3'>
            {visibleTestimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.author + idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className='flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300'
              >
                <div>
                  {/* Rating Stars */}
                  <div className='flex items-center space-x-1 mb-4 text-amber-400'>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    ))}
                  </div>

                  <p className='text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-6'>
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className='pt-4 border-t border-gray-100 flex items-center space-x-3'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs shadow-md'>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className='text-sm font-bold text-gray-900 leading-tight'>
                      {testimonial.author}
                    </h4>
                    <p className='text-xs text-indigo-600 font-medium'>{testimonial.role}</p>
                    <p className='text-[10px] text-gray-400 mt-0.5'>{testimonial.project}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Navigation Controls */}
          {groups.length > 1 && (
            <div className='mt-8 flex items-center justify-center space-x-4'>
              <button
                onClick={prevTestimonial}
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-indigo-600 hover:bg-indigo-50 transition-colors'
                aria-label='Previous testimonial'
              >
                <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
              </button>

              <div className='flex space-x-2'>
                {groups.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-indigo-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className='flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-indigo-600 hover:bg-indigo-50 transition-colors'
                aria-label='Next testimonial'
              >
                <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
