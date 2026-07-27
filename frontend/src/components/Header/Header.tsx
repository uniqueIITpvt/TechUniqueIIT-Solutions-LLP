'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileMenu } from './MobileMenu';
import { Logo } from './Logo';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  {
    label: 'Our Company',
    href: '/company',
    dropdownItems: [
      { label: 'About Us', href: '/company' },
      { label: 'FAQ', href: '/company/faq' },
      { label: 'Privacy Policy', href: '/company/privacy' },
    ],
  },
];

export const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white'
        }`}
      >
        <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              className='relative group flex items-center space-x-2'
            >
              <motion.div
                className='text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-transparent bg-clip-text whitespace-nowrap'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Logo />
                <div className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:w-full transition-all duration-300'></div>
              </motion.div>
            </Link>

            <nav className='hidden md:flex items-center space-x-1 lg:space-x-2'>
              <NavLink href='/' label='Home' />
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isHovered={hoveredItem === item.label}
                  onHover={setHoveredItem}
                />
              ))}
            </nav>

            <div className='flex items-center space-x-2 sm:space-x-3 lg:space-x-4'>
              <div className='hidden md:flex items-center'>
                <ActionLink href='/#contact-section' label='Contact Us' />
              </div>

              <div className='md:hidden flex items-center'>
                <ActionLink
                  href='/#contact-section'
                  label='Contact'
                  size='small'
                />
              </div>

              <button
                suppressHydrationWarning
                className='md:hidden p-2 rounded-lg transition-colors duration-200 bg-gray-100 hover:bg-gray-200'
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label='Open menu'
              >
                <svg
                  className='w-6 h-6 text-gray-700'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        navItems={navItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className='relative group px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300'
  >
    {label}
    <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300'></div>
  </Link>
);

const NavItem = ({
  item,
  isHovered,
  onHover,
}: {
  item: NavItem;
  isHovered: boolean;
  onHover: (label: string | null) => void;
}) => (
  <div
    className='relative'
    onMouseEnter={() => onHover(item.label)}
    onMouseLeave={() => onHover(null)}
  >
    <Link
      href={item.href}
      className='flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300'
    >
      <span>{item.label}</span>
      {item.dropdownItems && (
        <svg
          className='w-4 h-4 transition-transform duration-200 transform group-hover:rotate-180'
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
      )}
    </Link>

    <AnimatePresence>
      {item.dropdownItems && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className='absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2'
        >
          {item.dropdownItems.map((dropdownItem: DropdownItem) => (
            <Link
              key={dropdownItem.href}
              href={dropdownItem.href}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200'
            >
              {dropdownItem.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ActionLink = ({
  href,
  label,
  size = 'default',
}: {
  href: string;
  label: string;
  size?: 'default' | 'small';
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300';
  const sizeStyles =
    size === 'small' ? 'text-sm px-3 py-1.5' : 'text-base px-5 py-2.5';

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className={`${baseStyles} ${sizeStyles} block bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg`}
      >
        {label}
      </Link>
    </motion.div>
  );
};



