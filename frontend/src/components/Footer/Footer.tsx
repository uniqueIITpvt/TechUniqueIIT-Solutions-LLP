'use client';

import Image from 'next/image';
import Link from 'next/link';

interface SocialIconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

const footerLinks = {
  company: [
    { name: 'About Us', href: '/company/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Mobile Development', href: '/services/mobile-development' },
    { name: 'Cloud Solutions', href: '/services/cloud-solutions' },
    { name: 'UI-UX Design', href: '/services/ui-ux-design' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com',
      icon: (props: SocialIconProps) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (props: SocialIconProps) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (props: SocialIconProps) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path
            fillRule='evenodd'
            d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
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

        <div className='container mx-auto px-4 relative'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16'>
            {/* Brand Section - Spans 2 columns */}
            <div className='lg:col-span-2 space-y-8'>
              <Link href='/' className='flex items-center space-x-3'>
                <Image
                  src='/uniqiit-logo.svg'
                  alt='TechUniqueIIT Logo'
                  width={48}
                  height={48}
                  className='w-12 h-12'
                />
                <div>
                  <span className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
                    TechUniqueIIT
                  </span>
                  <p className='text-sm text-gray-600'>
                    Innovative IT Solutions
                  </p>
                </div>
              </Link>
              <p className='text-gray-600 max-w-md'>
                Empowering businesses with innovative technology solutions. We
                transform ideas into exceptional digital experiences.
              </p>
              <div className='flex items-center gap-6'>
                {footerLinks.social.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className='text-gray-400 hover:text-indigo-600 transition-colors duration-200'
                  >
                    <span className='sr-only'>{item.name}</span>
                    <item.icon className='h-6 w-6' aria-hidden={true} />
                  </Link>
                ))}
              </div>
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
              <div className='flex items-center gap-6'>
                <Link
                  href='/privacy'
                  className='text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200'
                >
                  Privacy Policy
                </Link>
                <Link
                  href='/terms'
                  className='text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200'
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
