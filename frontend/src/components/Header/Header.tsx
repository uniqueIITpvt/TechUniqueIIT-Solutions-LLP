'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileMenu } from './MobileMenu';
import { SignInModal } from '../Auth/SignInModal';
import Image from 'next/image';
import { Logo } from './Logo';

// Add type for dropdown items
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
  {
    label: 'Services',
    href: '/services',
    dropdownItems: [
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Mobile Development', href: '/services/mobile-development' },
      { label: 'UI/UX Design', href: '/services/ui-ux-design' },
      { label: 'Cloud Solutions', href: '/services/cloud-solutions' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'AI Solutions', href: '/services/ai-solutions' },
    ],
  },
  {
    label: 'Case Studies',
    href: '/case-studies',
  },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  {
    label: 'Our Company',
    href: '/company',
    dropdownItems: [
      { label: 'About Us', href: '/company/about' },
      { label: 'FAQ', href: '/company/faq' },
      { label: 'Privacy Policy', href: '/company/privacy' },
    ],
  },
];

export const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    setIsSignUp(false);
    setIsSignInModalOpen(true);
  };

  const handleGetStarted = () => {
    setIsSignUp(true);
    setIsSignInModalOpen(true);
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white'
        }`}
      >
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
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

            {/* Desktop Navigation */}
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

            {/* Auth Buttons */}
            <div className='flex items-center space-x-2 sm:space-x-3 lg:space-x-4'>
              {/* Desktop Auth Buttons */}
              <div className='hidden md:flex items-center space-x-2 sm:space-x-3'>
                <AuthButton
                  onClick={handleSignIn}
                  variant='ghost'
                  label='Sign In'
                />
                <AuthButton
                  onClick={handleGetStarted}
                  variant='primary'
                  label='Get Started'
                />
              </div>

              {/* Mobile Auth Buttons */}
              <div className='md:hidden flex items-center space-x-2'>
                <AuthButton
                  onClick={handleSignIn}
                  variant='ghost'
                  label='Sign in'
                  size='small'
                />
                <AuthButton
                  onClick={handleGetStarted}
                  variant='primary'
                  label='Start'
                  size='small'
                />
              </div>

              {/* Mobile Menu Button */}
              <button
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

      {/* Mobile Menu & Sign In Modal */}
      <MobileMenu
        navItems={navItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => {
          setIsSignInModalOpen(false);
          setIsSignUp(false);
        }}
        defaultMode={isSignUp ? 'signup' : 'signin'}
      />
    </>
  );
};

// NavLink Component
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className='relative group px-3 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300'
  >
    {label}
    <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300'></div>
  </Link>
);

// NavItem Component
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

// AuthButton Component
const AuthButton = ({
  onClick,
  variant,
  label,
  size = 'default',
}: {
  onClick: () => void;
  variant: 'ghost' | 'primary';
  label: string;
  size?: 'default' | 'small';
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-300';
  const sizeStyles =
    size === 'small' ? 'text-sm px-3 py-1.5' : 'text-base px-5 py-2.5';

  const variants = {
    ghost:
      'text-gray-700 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50',
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variants[variant]}`}
    >
      {label}
    </motion.button>
  );
};
