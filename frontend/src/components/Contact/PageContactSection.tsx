'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { countryCodes } from '@/data/countryCodes';
import { sendContactEmail } from '@/utils/emailService';

export const PageContactSection = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: 'IN',
    dial_code: '+91',
    name: 'India',
    flag: '🇮🇳',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const formRef = useRef<HTMLFormElement>(null);

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
    if (!formRef.current || isSubmitting) return;

    const form = formRef.current;
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendContactEmail(form);

      if (result.adminNotification.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: "Message sent successfully! We'll get back to you soon.",
        });
        form.reset();
        setSearchQuery('');
        setIsOpen(false);
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again later.',
        });
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
    <section className='relative min-h-screen flex items-center justify-center py-16 sm:py-20 lg:py-24'>
      <div className='container mx-auto px-4 sm:px-6 relative'>
        <div className='max-w-xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center mb-8 sm:mb-12'
          >
            <span className='inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-xs sm:text-sm text-indigo-600 font-medium mb-4 sm:mb-6'>
              <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
              Get in Touch
            </span>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4'>
              Let&apos;s Build Something{' '}
              <span className='relative'>
                <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                  Amazing Together
                </span>
                <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
              </span>
            </h2>
            <p className='text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0'>
              Have a project in mind? We&apos;d love to hear about it.
              Let&apos;s chat and see how we can help you achieve your goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relative w-full'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur-xl opacity-20 animate-pulse'></div>

            <div className='relative bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/20'>
              <div className='absolute top-0 left-8 w-1 h-16 bg-gradient-to-b from-indigo-500 to-transparent'></div>
              <div className='absolute top-8 left-0 h-1 w-16 bg-gradient-to-r from-transparent to-indigo-500'></div>

              <form
                className='space-y-4 sm:space-y-6 lg:space-y-8'
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                  <div className='relative'>
                    <input
                      type='text'
                      name='firstName'
                      required
                      className='w-full px-5 py-4 bg-gray-50/50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 peer'
                      placeholder='First Name'
                    />
                    <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 peer-focus:w-full'></div>
                  </div>

                  <div className='relative'>
                    <input
                      type='text'
                      name='lastName'
                      required
                      className='w-full px-5 py-4 bg-gray-50/50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 peer'
                      placeholder='Last Name'
                    />
                    <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 peer-focus:w-full'></div>
                  </div>
                </div>

                <div className='relative group'>
                  <input
                    type='email'
                    name='email'
                    required
                    className='w-full px-5 py-4 bg-gray-50/50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 peer'
                    placeholder='Email Address'
                  />
                  <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 peer-focus:w-full'></div>
                </div>

                <div className='relative group'>
                  <div className='flex flex-col sm:flex-row gap-4 sm:gap-0'>
                    <div
                      className='relative w-full sm:w-auto'
                      ref={dropdownRef}
                    >
                      <button
                        type='button'
                        onClick={() => setIsOpen(!isOpen)}
                        className='w-full sm:w-auto h-full px-3 py-4 bg-gray-50/50 rounded-lg sm:rounded-l-lg sm:rounded-r-none border-0 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 flex items-center gap-2 min-w-[120px]'
                      >
                        <span className='text-xl'>{selectedCountry.flag}</span>
                        <span>{selectedCountry.dial_code}</span>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${
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
                        <div className='absolute z-50 mt-1 w-full sm:w-72 bg-white rounded-lg shadow-lg border border-gray-100 max-h-60 sm:max-h-72 overflow-auto'>
                          <div className='p-2 border-b sticky top-0 bg-white'>
                            <input
                              type='text'
                              placeholder='Search country or code...'
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className='w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50'
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
                                <span className='text-xl'>{country.flag}</span>
                                <div>
                                  <div className='font-medium'>
                                    {country.name}
                                  </div>
                                  <div className='text-sm text-gray-500'>
                                    {country.dial_code}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type='tel'
                      name='phone'
                      required
                      className='w-full flex-1 px-5 py-4 bg-gray-50/50 rounded-lg sm:rounded-l-none sm:rounded-r-lg border-0 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300'
                      placeholder='Phone Number'
                    />
                  </div>
                </div>

                <div className='relative group'>
                  <textarea
                    name='message'
                    required
                    rows={4}
                    className='w-full px-5 py-4 bg-gray-50/50 rounded-lg border-0 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 resize-none peer'
                    placeholder='Your Message'
                  ></textarea>
                  <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 peer-focus:w-full'></div>
                </div>

                {submitStatus.type && (
                  <div
                    className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800'
                        : 'bg-red-50 text-red-800'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='group relative w-full bg-black text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-20 animate-pulse'></div>
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
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-white'></div>
        <div className='absolute inset-0'>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-100/50 rounded-full blur-3xl animate-pulse delay-1000'></div>
        </div>
      </div>
    </section>
  );
};
