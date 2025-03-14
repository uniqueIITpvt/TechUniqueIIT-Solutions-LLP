'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export default function BackendConnectionTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    // Display the API URL from environment variable
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || 'Not configured');

    // Test connection to backend
    const testConnection = async () => {
      try {
        setStatus('loading');
        setMessage('Testing connection to backend...');

        const response = await api.get('/api/health-check');

        console.log('Backend response:', response.data);
        setStatus('success');
        setMessage(
          `Successfully connected to backend! Response: ${JSON.stringify(
            response.data
          )}`
        );
      } catch (error: any) {
        console.error('Backend connection error:', error);
        setStatus('error');
        setMessage(`Error connecting to backend: ${error.message}`);
      }
    };

    testConnection();
  }, []);

  return (
    <div className='p-6 max-w-lg mx-auto my-8 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Backend Connection Test</h2>

      <div className='mb-4'>
        <p className='font-semibold'>Backend URL:</p>
        <p className='text-gray-700'>{apiUrl}</p>
      </div>

      <div className='mb-4'>
        <p className='font-semibold'>Status:</p>
        <div
          className={`mt-2 p-3 rounded ${
            status === 'loading'
              ? 'bg-yellow-100 text-yellow-800'
              : status === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status === 'loading' && (
            <div className='flex items-center'>
              <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                  fill='none'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              <span>Loading...</span>
            </div>
          )}
          {status === 'success' && (
            <div className='flex items-center'>
              <svg
                className='h-5 w-5 mr-3 text-green-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                ></path>
              </svg>
              <span>Connected!</span>
            </div>
          )}
          {status === 'error' && (
            <div className='flex items-center'>
              <svg
                className='h-5 w-5 mr-3 text-red-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
              <span>Connection Failed</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <p className='font-semibold'>Message:</p>
        <p className='mt-2 p-3 bg-gray-100 rounded text-gray-800 whitespace-pre-wrap'>
          {message}
        </p>
      </div>
    </div>
  );
}
