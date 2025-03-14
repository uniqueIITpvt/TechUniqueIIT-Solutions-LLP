'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: (
      <svg
        className='w-5 h-5'
        fill='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'Twitter',
    icon: (
      <svg
        className='w-5 h-5'
        fill='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
      </svg>
    ),
    href: '#',
  },
  {
    name: 'GitHub',
    icon: (
      <svg
        className='w-5 h-5'
        fill='currentColor'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path
          fillRule='evenodd'
          d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
          clipRule='evenodd'
        />
      </svg>
    ),
    href: '#',
  },
];

export const JoinTeam = () => {
  const [email, setEmail] = useState('');
  const [jobType, setJobType] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your job alert signup logic here
    setStatus('success');
    setEmail('');
    setJobType('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className='py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='relative bg-white rounded-2xl shadow-xl overflow-hidden'
          >
            {/* Background Pattern */}
            <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>

            <div className='relative p-8 md:p-12'>
              {/* Header */}
              <div className='text-center mb-12'>
                <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full'>
                  Join Us
                </span>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  Start Your Journey With Us
                </h2>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                  Get notified about new opportunities that match your
                  interests.
                </p>
              </div>

              {/* Job Alert Form */}
              <form onSubmit={handleSubmit} className='max-w-xl mx-auto mb-12'>
                <div className='space-y-4'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Email Address
                    </label>
                    <input
                      type='email'
                      id='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='you@example.com'
                      className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='jobType'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Job Category
                    </label>
                    <select
                      id='jobType'
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300'
                      required
                    >
                      <option value=''>Select a category</option>
                      <option value='engineering'>Engineering</option>
                      <option value='design'>Design</option>
                      <option value='marketing'>Marketing</option>
                      <option value='sales'>Sales</option>
                      <option value='operations'>Operations</option>
                    </select>
                  </div>

                  <button
                    type='submit'
                    className='w-full px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-300'
                  >
                    Sign Up for Job Alerts
                  </button>
                </div>

                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-4 text-sm text-green-600 text-center'
                  >
                    Successfully signed up for job alerts!
                  </motion.p>
                )}
              </form>

              {/* Social Links */}
              <div className='text-center'>
                <p className='text-sm text-gray-600 mb-4'>
                  Follow us on social media
                </p>
                <div className='flex justify-center space-x-4'>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className='text-gray-400 hover:text-indigo-600 transition-colors'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span className='sr-only'>{link.name}</span>
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className='mt-12 pt-12 border-t text-center'>
                <p className='text-gray-600 mb-4'>
                  Have questions? Contact our recruitment team
                </p>
                <a
                  href='mailto:careers@company.com'
                  className='text-indigo-600 font-medium hover:text-indigo-700'
                >
                  careers@company.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
