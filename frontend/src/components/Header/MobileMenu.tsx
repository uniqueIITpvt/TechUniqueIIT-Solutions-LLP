'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: Array<{ label: string; href: string }>;
}

interface MobileMenuProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ navItems, isOpen, onClose }: MobileMenuProps) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-50'
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className='fixed right-0 top-0 bottom-0 w-[80%] sm:w-[60%] md:w-[45%] bg-white shadow-2xl z-50 overflow-y-auto'
          >
            <div className='sticky top-0 bg-white border-b z-10'>
              <div className='flex items-center justify-between p-4'>
                <Logo />
                <button
                  onClick={onClose}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <svg
                    className='w-6 h-6 text-gray-600'
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
            </div>

            <div className='p-4'>
              <div className='mb-6'>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href='/#contact-section'
                    onClick={onClose}
                    className='flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-200'
                  >
                    <svg
                      className='mr-2 w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                    Contact Us
                  </Link>
                </motion.div>
              </div>

              <div className='space-y-1'>
                <Link
                  href='/'
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                    isActive('/')
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <svg
                    className='w-5 h-5 mr-3'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  Home
                </Link>

                {navItems.map((item) => (
                  <div key={item.label} className='relative'>
                    {item.dropdownItems ? (
                      <>
                        <button
                          onClick={() =>
                            setExpandedItem(
                              expandedItem === item.label ? null : item.label
                            )
                          }
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg font-medium transition-colors ${
                            isActive(item.href)
                              ? 'text-indigo-600 bg-indigo-50'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                          }`}
                        >
                          <span className='flex items-center'>
                            <span className='mr-3'>
                              {getMenuIcon(item.label)}
                            </span>
                            {item.label}
                          </span>
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              expandedItem === item.label ? 'rotate-180' : ''
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

                        <AnimatePresence>
                          {expandedItem === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className='ml-7 mt-1 space-y-1'
                            >
                              {item.dropdownItems.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  onClick={onClose}
                                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                    isActive(dropdownItem.href)
                                      ? 'text-indigo-600 bg-indigo-50'
                                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                                  }`}
                                >
                                  {dropdownItem.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center px-3 py-2 rounded-lg font-medium transition-colors ${
                          isActive(item.href)
                            ? 'text-indigo-600 bg-indigo-50'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        }`}
                      >
                        <span className='mr-3'>
                          {getMenuIcon(item.label)}
                        </span>
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className='mt-auto p-4 border-t'>
              <div className='flex items-center justify-between text-sm text-gray-600'>
                <Link
                  href='/#contact-section'
                  onClick={onClose}
                  className='hover:text-indigo-600'
                >
                  Contact
                </Link>
                <Link
                  href='/company/privacy'
                  onClick={onClose}
                  className='hover:text-indigo-600'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/company/faq'
                  onClick={onClose}
                  className='hover:text-indigo-600'
                >
                  FAQ
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const getMenuIcon = (label: string) => {
  switch (label) {
    case 'Services':
      return (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 10V3L4 14h7v7l9-11h-7z'
          />
        </svg>
      );
    case 'Blogs':
      return (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15'
          />
        </svg>
      );
    case 'Careers':
      return (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      );
    case 'Our Company':
      return (
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
          />
        </svg>
      );
    default:
      return null;
  }
};
