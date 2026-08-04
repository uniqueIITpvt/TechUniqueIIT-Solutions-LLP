'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    id: 'web-development',
    title: 'Custom Web & Software Development',
    description:
      'Business-ready platforms and custom software shaped around your workflow.',
    capabilities: [
      'React',
      'Next.js',
      'Angular',
      'Node.js',
      'Python',
      '.NET',
      'SQL',
      'GraphQL',
      'AWS',
      'Azure',
    ],
    href: '/services/custom-software-development',
    icon: (
      <svg className='w-6 h-6 text-indigo-600' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' />
      </svg>
    ),
    badge: 'Build',
  },
  {
    id: 'software-maintenance',
    title: 'Software Maintenance & Code Management',
    description:
      'Reliable ownership of existing code, security, performance, and servers.',
    capabilities: [
      'Code Takeover',
      'Bug Fixing',
      'Refactoring',
      'Security',
      'Performance',
      'Server Support',
      'Docker',
      'Cloud Ops',
    ],
    href: '/services/software-maintenance',
    icon: (
      <svg className='w-6 h-6 text-blue-600' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
      </svg>
    ),
    badge: 'Maintain',
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    description:
      'Fast, intuitive mobile experiences for both iOS and Android users.',
    capabilities: [
      'React Native',
      'Flutter',
      'iOS',
      'Android',
      'UI/UX',
      'API Integration',
      'Push Notifications',
      'Store Launch',
    ],
    href: '/services/mobile-app-development',
    icon: (
      <svg className='w-6 h-6 text-purple-600' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
        <rect x='5' y='2' width='14' height='20' rx='2' strokeWidth={1.5} />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 18h.01' />
      </svg>
    ),
    badge: 'Launch',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Social Media',
    description:
      'Focused content and campaigns designed to grow reach and qualified leads.',
    capabilities: [
      'SEO',
      'YouTube',
      'Instagram',
      'LinkedIn',
      'Content Strategy',
      'Paid Ads',
      'Analytics',
      'Lead Generation',
    ],
    href: '/services/digital-marketing',
    icon: (
      <svg className='w-6 h-6 text-emerald-600' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
      </svg>
    ),
    badge: 'Grow',
  },
];

export const Features = () => {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/40 py-14 sm:py-16'>
      <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-100 to-transparent' />
      <div className='absolute left-1/2 top-24 h-64 w-2/3 -translate-x-1/2 rounded-full bg-indigo-100/30 blur-3xl' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mx-auto mb-8 max-w-3xl text-center'
        >
          <span className='mb-4 inline-flex items-center rounded-full border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm backdrop-blur'>
            <span className='mr-2 h-1.5 w-1.5 rounded-full bg-indigo-600' />
            Core Offerings
          </span>
          <h2 className='mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Services Engineered for{' '}
            <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
              Digital Excellence
            </span>
          </h2>
          <p className='text-sm leading-relaxed text-gray-600 sm:text-base'>
            Four focused capabilities to build, run, and grow your digital business.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, index) => (
            <motion.article
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className='group relative min-w-0 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_16px_40px_-24px_rgba(79,70,229,0.55)]'
            >
              <Link
                href={feature.href}
                className='flex h-full flex-col p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 sm:p-6'
                aria-label={`Explore ${feature.title}`}
              >
                <div className='mb-4 flex items-center justify-between'>
                  <div className='flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50/80 transition-colors duration-300 group-hover:bg-indigo-100'>
                    {feature.icon}
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                      {feature.badge}
                    </span>
                    <span className='text-xs font-semibold text-gray-300'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <h3 className='mb-1.5 min-h-[3rem] text-lg font-bold leading-6 text-gray-900 transition-colors group-hover:text-indigo-600'>
                  {feature.title}
                </h3>
                <p className='mb-4 text-sm leading-5 text-gray-600'>
                  {feature.description}
                </p>

                <div className='mb-5 flex flex-wrap gap-1.5'>
                  {feature.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className='rounded-md border border-gray-100 bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-600'
                    >
                      {capability}
                    </span>
                  ))}
                </div>

                <span className='mt-auto inline-flex items-center border-t border-gray-100 pt-4 text-xs font-bold text-indigo-600'>
                  Explore service
                  <svg className='ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
