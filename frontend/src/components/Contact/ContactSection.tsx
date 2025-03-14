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
    flag: '🇮🇳',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter countries based on search query
  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (country.dial_code && country.dial_code.includes(searchQuery))
  );

  // Close dropdown when clicking outside
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
    if (!formRef.current || isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendContactEmail(formRef.current);

      if (result.adminNotification.text === 'OK') {
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
    <section className='relative py-4 sm:py-8 lg:py-12 overflow-hidden'>
      {/* Enhanced Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/30'></div>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70'></div>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
          <div className='absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-100/40 to-violet-100/40 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-violet-100/40 to-indigo-100/40 rounded-full blur-3xl'></div>
        </div>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
        <div className='max-w-7xl mx-auto'>
          {/* Section Header - Improved mobile spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='text-center mb-8 sm:mb-12 lg:mb-16'
          >
            <span className='inline-flex items-center px-3 py-1.5 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-xs sm:text-sm text-indigo-600 font-medium mb-3 sm:mb-4'>
              <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
              Get in Touch
            </span>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4'>
              Let&apos;s Build Something{' '}
              <span className='relative'>
                <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                  Amazing Together
                </span>
                <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
              </span>
            </h2>
            <p className='text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto'>
              Have a project in mind? We&apos;d love to hear about it.
              Let&apos;s chat and see how we can help you achieve your goals.
            </p>
          </motion.div>

          {/* Grid Layout - Improved mobile layout */}
          <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='relative'
            >
              {/* Glowing border effect */}
              <div className='absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200'></div>

              <div className='relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20'>
                <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-2xl'></div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className='space-y-6'
                >
                  {/* Name fields */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div className='relative'>
                      <input
                        type='text'
                        name='firstName'
                        required
                        className='peer w-full px-4 py-3 bg-gray-50/50 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 placeholder-transparent'
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
                        className='peer w-full px-4 py-3 bg-gray-50/50 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 placeholder-transparent'
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

                  {/* Email field */}
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      required
                      className='peer w-full px-4 py-3 bg-gray-50/50 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 placeholder-transparent'
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

                  {/* Phone field with integrated country code */}
                  <div className='relative'>
                    <div className='relative'>
                      <input
                        type='tel'
                        name='phone'
                        required
                        className='peer w-full pl-[120px] pr-4 py-3 bg-gray-50/50 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 placeholder-transparent'
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
                            className='h-full px-4 flex items-center gap-2 border-r border-gray-200 text-gray-600 hover:text-gray-800 transition-colors'
                          >
                            <span className='text-xl'>
                              {selectedCountry.flag}
                            </span>
                            <span className='text-sm'>
                              {selectedCountry.dial_code}
                            </span>
                            <svg
                              className={`w-4 h-4 transition-transform ${
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

                          {/* Country dropdown */}
                          {isOpen && (
                            <div className='absolute z-50 mt-1 w-72 bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 overflow-auto'>
                              <div className='p-2 border-b sticky top-0 bg-white'>
                                <input
                                  type='text'
                                  placeholder='Search country or code...'
                                  value={searchQuery}
                                  onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                  }
                                  className='w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm'
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
                                    className='w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3'
                                  >
                                    <span className='text-xl'>
                                      {country.flag}
                                    </span>
                                    <div>
                                      <div className='font-medium text-sm'>
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

                  {/* Message field */}
                  <div className='relative'>
                    <textarea
                      name='message'
                      required
                      rows={4}
                      className='peer w-full px-4 py-3 bg-gray-50/50 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 placeholder-transparent resize-none'
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

                  {/* Submit button */}
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='group relative w-full bg-indigo-600 text-white font-medium px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    <span className='relative flex items-center justify-center gap-2'>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && (
                        <svg
                          className='w-5 h-5 transform group-hover:translate-x-1 transition-transform'
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
                      className={`p-4 rounded-lg ${
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

            {/* Contact Information - Improved mobile layout */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='lg:pl-6'
            >
              <div className='bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20'>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-6 sm:mb-8'>
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
                      <div className='flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600'>
                        {info.icon}
                      </div>
                      <div>
                        <h4 className='text-sm sm:text-base lg:text-lg font-medium text-gray-900 mb-0.5 sm:mb-1'>
                          {info.title}
                        </h4>
                        {info.href ? (
                          <a
                            href={info.href}
                            className='text-xs sm:text-sm lg:text-base text-gray-600 hover:text-indigo-600 transition-colors duration-300'
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className='text-xs sm:text-sm lg:text-base text-gray-600'>
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
