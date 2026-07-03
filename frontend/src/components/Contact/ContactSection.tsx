'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { sendContactEmail } from '@/utils/emailService';
import { countryCodes } from '@/data/countryCodes';

const contactInfo = [
  {
    title: 'Email',
    content: 'info@techuniqueiit.com',
    href: 'mailto:info@techuniqueiit.com',
    icon: (
      <svg
        className='w-5 h-5 sm:w-6 sm:h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        />
      </svg>
    ),
  },
  {
    title: 'Phone',
    content: '+91 7838758293',
    href: 'tel:+917838758293',
    icon: (
      <svg
        className='w-5 h-5 sm:w-6 sm:h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
        />
      </svg>
    ),
  },
  {
    title: 'Location',
    content: 'South Delhi, Delhi, India',
    icon: (
      <svg
        className='w-5 h-5 sm:w-6 sm:h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
        />
      </svg>
    ),
  },
];

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    dial_code: '+91',
    name: 'India',
    flag: 'India',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (country.dial_code && country.dial_code.includes(searchQuery))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendContactEmail(formRef.current);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: "Message sent successfully! We'll get back to you soon.",
        });
        formRef.current.reset();
        setSearchQuery('');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id='contact-section'
      className='relative overflow-hidden scroll-mt-28 py-4 sm:py-8 lg:py-12'
    >
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/30'></div>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70'></div>
        <div className='absolute top-0 left-0 h-full w-full overflow-hidden'>
          <div className='absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-indigo-100/40 to-violet-100/40 blur-3xl'></div>
          <div className='absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-violet-100/40 to-indigo-100/40 blur-3xl'></div>
        </div>
      </div>

      <div className='container relative mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mb-8 text-center sm:mb-12 lg:mb-16'
          >
            <span className='mb-3 inline-flex items-center rounded-full border border-indigo-50 bg-white px-3 py-1.5 text-xs font-medium text-indigo-600 shadow-md shadow-indigo-100 sm:mb-4 sm:text-sm'>
              <span className='mr-2 flex h-2 w-2 rounded-full bg-indigo-600'></span>
              Get in Touch
            </span>
            <h2 className='mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-3xl lg:text-4xl'>
              Let&apos;s Build Something{' '}
              <span className='relative'>
                <span className='relative z-10 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
                  Amazing Together
                </span>
                <span className='absolute inset-x-0 bottom-0 z-0 h-3 bg-indigo-100/50'></span>
              </span>
            </h2>
            <p className='mx-auto max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg'>
              Have a project in mind? We&apos;d love to hear about it.
              Let&apos;s chat and see how we can help you achieve your goals.
            </p>
          </motion.div>

          <div className='grid items-start gap-8 lg:grid-cols-2 lg:gap-12'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='relative'
            >
              <div className='absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 opacity-20 blur transition duration-1000 group-hover:opacity-30 group-hover:duration-200'></div>

              <div className='relative rounded-2xl border border-white/20 bg-white/90 p-6 shadow-xl backdrop-blur-xl sm:p-8'>
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5'></div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className='space-y-6'
                >
                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                    <div className='relative'>
                      <input
                        type='text'
                        name='firstName'
                        required
                        className='peer w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 placeholder-transparent transition-all duration-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'
                        placeholder='First Name'
                        id='firstName'
                      />
                      <label
                        htmlFor='firstName'
                        className='absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600'
                      >
                        First Name
                      </label>
                    </div>

                    <div className='relative'>
                      <input
                        type='text'
                        name='lastName'
                        required
                        className='peer w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 placeholder-transparent transition-all duration-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'
                        placeholder='Last Name'
                        id='lastName'
                      />
                      <label
                        htmlFor='lastName'
                        className='absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600'
                      >
                        Last Name
                      </label>
                    </div>
                  </div>

                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      required
                      className='peer w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 placeholder-transparent transition-all duration-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'
                      placeholder='Email'
                      id='email'
                    />
                    <label
                      htmlFor='email'
                      className='absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600'
                    >
                      Email Address
                    </label>
                  </div>

                  <div className='relative'>
                    <div className='relative'>
                      <input
                        type='hidden'
                        name='countryCode'
                        value={selectedCountry.dial_code}
                      />
                      <input
                        type='tel'
                        name='phone'
                        required
                        className='peer w-full rounded-lg border border-gray-200 bg-gray-50/50 py-3 pl-[120px] pr-4 placeholder-transparent transition-all duration-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'
                        placeholder='Phone Number'
                        id='phone'
                      />
                      <label
                        htmlFor='phone'
                        className='absolute left-[120px] -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600'
                      >
                        Phone Number
                      </label>
                      <div className='absolute left-0 top-0 h-full'>
                        <div ref={dropdownRef} className='relative h-full'>
                          <button
                            type='button'
                            onClick={() => setIsOpen(!isOpen)}
                            className='flex h-full items-center gap-2 border-r border-gray-200 px-4 text-gray-600 transition-colors hover:text-gray-800'
                          >
                            <span className='text-xl'>
                              {selectedCountry.flag}
                            </span>
                            <span className='text-sm'>
                              {selectedCountry.dial_code}
                            </span>
                            <svg
                              className={`h-4 w-4 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                              />
                            </svg>
                          </button>

                          {isOpen && (
                            <div className='absolute z-50 mt-1 max-h-60 w-72 overflow-auto rounded-lg border border-gray-100 bg-white shadow-lg'>
                              <div className='sticky top-0 border-b bg-white p-2'>
                                <input
                                  type='text'
                                  placeholder='Search country or code...'
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                  className='w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50'
                                />
                              </div>
                              <div className='py-2'>
                                {filteredCountries.map((country) => (
                                  <button
                                    key={country.code}
                                    onClick={() => {
                                      setSelectedCountry(country);
                                      setIsOpen(false);
                                    }}
                                    className='flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-50'
                                  >
                                    <span className='text-xl'>
                                      {country.flag}
                                    </span>
                                    <div>
                                      <div className='text-sm font-medium'>
                                        {country.name}
                                      </div>
                                      <div className='text-xs text-gray-500'>
                                        {country.dial_code}
                                      </div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='relative'>
                    <textarea
                      name='message'
                      required
                      rows={4}
                      className='peer w-full resize-none rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 placeholder-transparent transition-all duration-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200'
                      placeholder='Message'
                      id='message'
                    ></textarea>
                    <label
                      htmlFor='message'
                      className='absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600'
                    >
                      Your Message
                    </label>
                  </div>

                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='group relative w-full overflow-hidden rounded-xl bg-indigo-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70'
                  >
                    <span className='relative flex items-center justify-center gap-2'>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && (
                        <svg
                          className='h-5 w-5 transform transition-transform group-hover:translate-x-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M14 5l7 7m0 0l-7 7m7-7H3'
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  {submitStatus.type && (
                    <div
                      className={`rounded-lg p-4 ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 text-green-800'
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='lg:pl-6'
            >
              <div className='rounded-xl border border-white/20 bg-white/80 p-4 shadow-xl backdrop-blur-sm sm:rounded-2xl sm:p-6 lg:p-8'>
                <h3 className='mb-6 text-lg font-semibold text-gray-900 sm:mb-8 sm:text-xl'>
                  Contact Information
                </h3>
                <div className='space-y-4 sm:space-y-6'>
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className='flex items-start space-x-3 sm:space-x-4'
                    >
                      <div className='flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:h-10 sm:w-10 lg:h-12 lg:w-12'>
                        {info.icon}
                      </div>
                      <div>
                        <h4 className='mb-0.5 text-sm font-medium text-gray-900 sm:mb-1 sm:text-base lg:text-lg'>
                          {info.title}
                        </h4>
                        {info.href ? (
                          <a
                            href={info.href}
                            className='text-xs text-gray-600 transition-colors duration-300 hover:text-indigo-600 sm:text-sm lg:text-base'
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className='text-xs text-gray-600 sm:text-sm lg:text-base'>
                            {info.content}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
