'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MobileContactForm } from '@/components/Contact/BottmMobileForm';

const navigationItems = [
  {
    label: 'Home',
    href: '/',
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
        />
      </svg>
    ),
  },
  {
    label: 'Blogs',
    href: '/blogs',
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15'
        />
      </svg>
    ),
  },
  {
    label: 'Careers',
    href: '/careers',
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        />
      </svg>
    ),
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: (
      <svg
        className='w-6 h-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
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
];

export const MobileNavigation = () => {
  const pathname = usePathname();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-40'>
        <div className='grid grid-cols-4 gap-1'>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            if (item.href === '/contact') {
              return (
                <button
                  key={item.href}
                  onClick={() => setIsContactFormOpen(true)}
                  className={`flex flex-col items-center py-2 px-1 ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <div
                    className={`p-1 rounded-full ${
                      isActive ? 'bg-indigo-50' : 'hover:bg-indigo-50'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className='text-xs mt-1 font-medium'>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-2 px-1 ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                <div
                  className={`p-1 rounded-full ${
                    isActive ? 'bg-indigo-50' : 'hover:bg-indigo-50'
                  }`}
                >
                  {item.icon}
                </div>
                <span className='text-xs mt-1 font-medium'>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <MobileContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </>
  );
};
