'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const SignInModal = ({
  isOpen,
  onClose,
  defaultMode = 'signin',
}: SignInModalProps) => {
  const [isSignIn, setIsSignIn] = useState(defaultMode === 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsSignIn(defaultMode === 'signin');
  }, [defaultMode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]'
          />

          {/* Modal Container */}
          <div className='fixed inset-0 flex items-center justify-center px-4 z-[70]'>
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className='w-full max-w-md overflow-y-auto max-h-[90vh]'
            >
              <div className='bg-white rounded-2xl shadow-xl relative'>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
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

                {/* Header */}
                <div className='p-8'>
                  <h2 className='text-3xl font-bold text-center mb-2'>
                    {isSignIn ? 'Welcome Back!' : 'Create Account'}
                  </h2>
                  <p className='text-gray-600 text-center mb-8'>
                    {isSignIn
                      ? 'Please sign in to your account'
                      : 'Sign up for a new account'}
                  </p>

                  {/* Social Login Buttons */}
                  <div className='space-y-3 mb-8'>
                    <button className='w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors'>
                      <svg className='w-5 h-5' viewBox='0 0 24 24'>
                        <path
                          fill='currentColor'
                          d='M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z'
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </button>
                    <button className='w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors'>
                      <svg className='w-5 h-5' viewBox='0 0 24 24'>
                        <path
                          fill='currentColor'
                          d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.504.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z'
                        />
                      </svg>
                      <span>Continue with GitHub</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className='relative mb-8'>
                    <div className='absolute inset-0 flex items-center'>
                      <div className='w-full border-t border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center text-sm'>
                      <span className='px-2 bg-white text-gray-500'>
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Form */}
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

                    {isSignIn && (
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
                        <div className='text-sm'>
                          <a
                            href='#'
                            className='font-medium text-blue-600 hover:text-blue-500'
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className='w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity'
                    >
                      {isSignIn ? 'Sign In' : 'Create Account'}
                    </motion.button>
                  </form>

                  {/* Toggle Sign In/Sign Up */}
                  <p className='mt-8 text-center text-sm text-gray-600'>
                    {isSignIn
                      ? "Don't have an account?"
                      : 'Already have an account?'}{' '}
                    <button
                      onClick={() => setIsSignIn(!isSignIn)}
                      className='font-medium text-blue-600 hover:text-blue-500'
                    >
                      {isSignIn ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
