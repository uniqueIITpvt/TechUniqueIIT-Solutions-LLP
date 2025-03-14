'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { countryCodes } from '@/data/countryCodes';
import { sendContactEmail } from '@/utils/emailService';

interface MobileContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileContactForm = ({
  isOpen,
  onClose,
}: MobileContactFormProps) => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const form = e.currentTarget;

    try {
      const result = await sendContactEmail(form);

      if (result.adminNotification.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: "Message sent successfully! We'll get back to you soon.",
        });
        form.reset();
        // Close the form after successful submission
        setTimeout(() => {
          onClose();
          setSubmitStatus({ type: null, message: '' });
        }, 2000);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black z-50'
          />

          {/* Form Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto'
          >
            {/* Handle */}
            <div className='sticky top-0 pt-4 pb-2 bg-white rounded-t-3xl'>
              <div className='w-12 h-1.5 bg-gray-300 rounded-full mx-auto' />
            </div>

            <div className='px-4 pb-8'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>Contact Us</h2>
                <button
                  onClick={onClose}
                  className='p-2 text-gray-500 hover:text-gray-700'
                >
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
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Your Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    required
                    className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none'
                    placeholder='Enter your name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    required
                    className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none'
                    placeholder='Enter your email'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Phone Number
                  </label>
                  <div className='flex'>
                    <input
                      type='hidden'
                      name='countryCode'
                      value={selectedCountry.dial_code}
                    />
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const country = countryCodes.find(
                          (c) => c.code === e.target.value
                        );
                        if (country) setSelectedCountry(country);
                      }}
                      className='px-4 py-3 rounded-l-xl border border-r-0 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none'
                    >
                      {countryCodes.map((country) => (
                        <option
                          key={`${country.code}-${country.name}`}
                          value={country.code}
                        >
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type='tel'
                      name='phone'
                      required
                      className='flex-1 px-4 py-3 rounded-r-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none'
                      placeholder='Phone number'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Message
                  </label>
                  <textarea
                    name='message'
                    required
                    rows={4}
                    className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none'
                    placeholder='How can we help you?'
                  />
                </div>

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

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full px-8 py-4 bg-gradient-to-r from-purple-800 to-blue-600 text-white rounded-xl font-medium disabled:opacity-70 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
