'use client';

import Link from 'next/link';
import { Logo } from '@/components/Header/Logo';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/company' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Services Overview', href: '/services' },
    { name: 'Our Products', href: '/products' },
    { name: 'Company FAQ', href: '/company/faq' },
    { name: 'Privacy Policy', href: '/company/privacy' },
  ],
};

export const Footer = () => {
  return (
    <footer className='relative mt-0'>
      {/* Top Wave Decoration */}
      <div className='absolute top-0 inset-x-0'>
        <div className='w-full h-24 bg-gradient-to-b from-white via-indigo-50/50 to-transparent'></div>
      </div>

      <div className='relative bg-gradient-to-b from-white to-indigo-50/50 pt-24 pb-12 overflow-hidden'>
        {/* Decorative Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl'></div>
          <div
            className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:4rem_4rem]'
            style={{
              maskImage:
                'radial-gradient(circle at center, transparent 50%, white)',
            }}
          ></div>
        </div>

        <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-1 gap-10 pb-16 md:grid-cols-2 lg:grid-cols-6 lg:gap-12'>
            {/* Brand Section - Spans 2 columns */}
            <div className='space-y-6 lg:col-span-2 lg:space-y-8'>
              <Link href='/' className='inline-block'>
                <Logo />
              </Link>
              <p className='text-gray-600 max-w-md'>
                Empowering businesses with innovative technology solutions. We
                transform ideas into exceptional digital experiences.
              </p>
            </div>

            {/* Company Links */}
            <div className='lg:col-span-2'>
              <h3 className='text-lg font-semibold text-gray-900 mb-6 relative'>
                <span className='bg-gradient-to-r from-indigo-600 to-violet-600 h-1 w-8 absolute -bottom-2 left-0'></span>
                Company
              </h3>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center group'
                    >
                      <span className='w-1.5 h-1.5 rounded-full bg-indigo-200 mr-3 group-hover:bg-indigo-600 transition-colors duration-200'></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className='lg:col-span-2'>
              <h3 className='text-lg font-semibold text-gray-900 mb-6 relative'>
                <span className='bg-gradient-to-r from-indigo-600 to-violet-600 h-1 w-8 absolute -bottom-2 left-0'></span>
                Services
              </h3>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-gray-600 hover:text-indigo-600 transition-colors duration-200 flex items-center group'
                    >
                      <span className='w-1.5 h-1.5 rounded-full bg-violet-200 mr-3 group-hover:bg-violet-600 transition-colors duration-200'></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='border-t border-gray-200 pt-8'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
              <p className='text-sm text-gray-600'>
                &copy; {new Date().getFullYear()} TechUniqueIIT. All rights
                reserved.
              </p>
              <div className='flex flex-wrap items-center gap-4 sm:gap-6'>
                <Link
                  href='/company/privacy'
                  className='text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200'
                >
                  Privacy Policy
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

