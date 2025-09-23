'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Registration successful!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center'
        >
          <Image
            src='/techuniqueiit-new-logo.svg' // Add your logo
            alt='Logo'
            width={80}
            height={80}
            className='rounded-xl shadow-lg'
            style={{ height: 'auto' }}
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create an Account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Sign up to get started with our platform
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
      >
        <div className='bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10'>
          {(error || validationError) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className='mb-4 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200'
            >
              <p className='flex items-center text-sm font-medium'>
                <span className='mr-2'>⚠️</span>
                {validationError || error}
              </p>
            </motion.div>
          )}

          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <div className='mt-1 relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiUser className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='name'
                  name='name'
                  type='text'
                  autoComplete='name'
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className='appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter your name'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1 relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiMail className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className='appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter your email'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1 relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiLock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className='appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Create a password'
                />
              </div>
              <p className='mt-1 text-xs text-gray-500'>
                Password must be at least 6 characters
              </p>
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm Password
              </label>
              <div className='mt-1 relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiLock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Confirm your password'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200'
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Registering...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>
                  Already have an account?
                </span>
              </div>
            </div>

            <div className='mt-6'>
              <Link
                href='/login'
                className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 