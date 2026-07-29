'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]'
          />

          <div className='fixed inset-0 flex items-center justify-center px-4 z-[70]'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className='w-full max-w-md overflow-y-auto max-h-[90vh]'
            >
              <div className='bg-white rounded-2xl shadow-xl relative'>
                <button
                  onClick={onClose}
                  className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
                  aria-label='Close sign in modal'
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

                <div className='p-8'>
                  <h2 className='text-3xl font-bold text-center mb-2'>
                    Welcome Back!
                  </h2>
                  <p className='text-gray-600 text-center mb-8'>
                    Please sign in to your account
                  </p>

                  <form className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Email address
                      </label>
                      <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors'
                        placeholder='Enter your email'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Password
                      </label>
                      <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors'
                        placeholder='Enter your password'
                      />
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                        />
                        <label className='ml-2 block text-sm text-gray-700'>
                          Remember me
                        </label>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className='w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity'
                    >
                      Sign In
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
