'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const AboutHero = () => {
  return (
    <section className='relative overflow-hidden py-8 sm:py-12 lg:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='relative z-10'
          >
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
              Transforming Ideas Into
              <span className='relative mt-2 block'>
                <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                  Digital Reality
                </span>
                <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
              </span>
            </h1>
            <p className='text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl'>
              At TechUniqeiit, we combine innovation with expertise to create
              cutting-edge digital solutions that help businesses thrive in
              today&apos;s competitive landscape.
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12 pt-8 border-t border-gray-100'>
              {[
                { value: '2+', label: 'Years Experience' },
                { value: '25+', label: 'Projects Delivered' },
                { value: '15+', label: 'Happy Clients' },
                { value: '4', label: 'Core Services' },
              ].map((stat) => (
                <div key={stat.label} className='text-center'>
                  <div className='text-3xl font-bold text-indigo-600 mb-2'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-gray-600'>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='relative'
          >
            <div className='relative rounded-3xl overflow-hidden shadow-2xl'>
              <Image
                src='/about/team-hero.jpg'
                alt='Our Team'
                width={600}
                height={700}
                className='w-full h-full object-cover'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
            </div>
            <div className='absolute -bottom-6 -left-6 w-64 h-64 bg-indigo-100 rounded-full filter blur-3xl opacity-50'></div>
            <div className='absolute -top-6 -right-6 w-64 h-64 bg-violet-100 rounded-full filter blur-3xl opacity-50'></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
