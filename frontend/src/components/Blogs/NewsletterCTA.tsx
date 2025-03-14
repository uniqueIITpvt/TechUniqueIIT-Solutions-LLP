'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export const NewsletterCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setStatus('success');
    setEmail('');
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
              <div className='text-center mb-8'>
                <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full'>
                  Newsletter
                </span>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  Stay Updated with Tech Insights
                </h2>
                <p className='text-gray-600 max-w-2xl mx-auto'>
                  Subscribe to our newsletter for the latest articles, insights,
                  and industry trends delivered straight to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <div className='flex-grow'>
                    <div className='relative'>
                      <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        className='w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300'
                        required
                      />
                      {status === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className='absolute -bottom-6 left-0 text-sm text-green-600'
                        >
                          Successfully subscribed!
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='px-8 py-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors duration-300 flex-shrink-0'
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              {/* Features */}
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12'>
                {[
                  {
                    icon: '📚',
                    text: 'Weekly Articles',
                  },
                  {
                    icon: '🎯',
                    text: 'Industry Insights',
                  },
                  {
                    icon: '💡',
                    text: 'Tech Updates',
                  },
                  {
                    icon: '🔒',
                    text: 'No Spam',
                  },
                ].map((feature) => (
                  <motion.div
                    key={feature.text}
                    whileHover={{ y: -2 }}
                    className='text-center'
                  >
                    <span className='text-2xl mb-2 inline-block'>
                      {feature.icon}
                    </span>
                    <p className='text-sm text-gray-600'>{feature.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className='mt-8 pt-8 border-t text-center'>
                <p className='text-sm text-gray-500 mb-4'>
                  Trusted by developers from
                </p>
                <div className='flex justify-center items-center gap-6 opacity-50'>
                  {['Google', 'Microsoft', 'Amazon', 'Meta'].map((company) => (
                    <span
                      key={company}
                      className='text-sm font-medium text-gray-400'
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
