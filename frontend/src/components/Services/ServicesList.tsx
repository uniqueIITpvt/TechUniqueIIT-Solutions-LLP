'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: 'web-development',
    title: 'Custom Web & Software Development',
    subtitle: 'Scalable, High-Performance Web Applications',
    description:
      'We design and develop custom web applications from scratch tailored to your exact business workflow. Using modern frameworks across Frontend (React.js, Next.js, Angular), Backend (Node.js, Express, Python, .NET), Database (MongoDB, PostgreSQL, MySQL, SQL, GraphQL), and Cloud (AWS, Azure, Docker, Kubernetes, Terraform), we build fast, secure, and resilient web platforms.',
    features: [
      'Frontend Stack: React.js, Next.js, Angular, Tailwind CSS',
      'Backend Stack: Node.js, Express, Python, .NET',
      'Database Architecture: MongoDB, PostgreSQL, MySQL, SQL, GraphQL',
      'Cloud & Infrastructure: AWS, Azure, Docker, Kubernetes, Terraform',
      'Custom SaaS & Web Application Development'
    ],
    icon: (
      <svg className='w-7 h-7 text-indigo-600' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' />
      </svg>
    ),
    badge: 'Core Expertise',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'software-maintenance',
    title: 'Software Maintenance & Code Management',
    subtitle: 'Existing Application Takeover, Support & Server Maintenance',
    description:
      'Have an existing software application built by another team? We take full ownership of maintaining, upgrading, and optimizing pre-existing software. From bug fixing, code refactoring, security audits, database backups to 24/7 cloud server uptime management, we ensure your software runs smoothly without interruptions.',
    features: [
      'Existing & Legacy Codebase Takeover & Management',
      'Bug Fixing, Patch Management & Performance Optimization',
      'Cloud Infrastructure Management (AWS, Azure, Docker, Kubernetes)',
      'Database Tuning, Security Audits & Regular Data Backups',
      '24/7 Server Monitoring & Ongoing Technical Support'
    ],
    icon: (
      <svg className='w-7 h-7 text-blue-600' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
      </svg>
    ),
    badge: 'Application Support',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'mobile-development',
    title: 'Mobile App Development',
    subtitle: 'Cross-Platform iOS & Android Applications',
    description:
      'Empower your mobile presence with intuitive, feature-rich mobile applications built for both iOS and Android. We utilize React Native and Flutter for seamless cross-platform performance, native feel, and cost-effective development.',
    features: [
      'Cross-Platform iOS & Android App Development',
      'React Native & Flutter Technology Stack',
      'Mobile UI/UX Design & User Onboarding',
      'Real-Time Push Notifications & API Integration',
      'App Store & Google Play Store Publishing'
    ],
    icon: (
      <svg className='w-7 h-7 text-purple-600' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
        <rect x='5' y='2' width='14' height='20' rx='2' strokeWidth={1.5} />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 18h.01' />
      </svg>
    ),
    badge: 'Mobile First',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Social Media Management',
    subtitle: 'Data-Driven Brand Visibility & Lead Growth',
    description:
      'Scale your brand visibility and attract qualified leads through targeted digital marketing strategies. From YouTube channel growth, Instagram, LinkedIn, and Facebook campaign management to SEO and performance marketing, we build an impactful online brand presence.',
    features: [
      'YouTube Channel Management & Video Content Strategy',
      'Social Media Management (Instagram, LinkedIn, Facebook)',
      'Search Engine Optimization (SEO & Local Visibility)',
      'Performance Marketing & Targeted Ad Campaigns',
      'Brand Identity & Online Reputation Management'
    ],
    icon: (
      <svg className='w-7 h-7 text-emerald-600' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
      </svg>
    ),
    badge: 'Growth Marketing',
    gradient: 'from-emerald-500 to-teal-600',
  },
];

export const ServicesList = () => {
  const handleDownloadBrochure = () => {
    alert('TechUniqueIIT Brochure download will start shortly. Thank you for your interest!');
  };

  return (
    <section className='relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 bg-gradient-to-b from-white via-indigo-50/30 to-white'>
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-12'
        >
          <span className='inline-flex items-center px-4 py-1.5 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-xs sm:text-sm text-indigo-600 font-medium mb-4'>
            <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
            What We Do
          </span>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Comprehensive Technology &{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
              Digital Services
            </span>
          </h1>
          <p className='text-base text-gray-600 leading-relaxed'>
            We deliver end-to-end software development, existing application maintenance, and digital marketing solutions designed to accelerate business growth.
          </p>
        </motion.div>

        {/* Services Cards Container (Reduced card size by ~15%) */}
        <div className='space-y-8 mb-12'>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className='bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 grid lg:grid-cols-12 gap-6 items-center'
            >
              {/* Service Info (7 Cols) */}
              <div className='lg:col-span-7 space-y-3'>
                <div className='flex items-center space-x-3'>
                  <div className='p-2.5 bg-gray-50 rounded-xl border border-gray-100'>{service.icon}</div>
                  <span className='text-xs font-semibold px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full uppercase tracking-wider'>
                    {service.badge}
                  </span>
                </div>
                <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>{service.title}</h2>
                <p className='text-indigo-600 font-medium text-xs sm:text-sm'>{service.subtitle}</p>
                <p className='text-gray-600 leading-relaxed text-xs sm:text-sm'>{service.description}</p>
              </div>

              {/* Capabilities & Action Buttons (5 Cols) */}
              <div className='lg:col-span-5 bg-gray-50/80 rounded-xl p-5 border border-gray-100 space-y-2.5'>
                <h3 className='text-xs font-bold text-gray-900 uppercase tracking-wider mb-2'>Core Capabilities & Stack</h3>
                {service.features.map((feat, idx) => (
                  <div key={idx} className='flex items-start text-xs text-gray-700 font-medium leading-snug'>
                    <svg className='w-3.5 h-3.5 text-indigo-600 mr-2 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                    <span>{feat}</span>
                  </div>
                ))}
                
                {/* Action Buttons: Request Consultation & Download Brochure */}
                <div className='pt-3 flex flex-wrap items-center gap-2 sm:gap-3 border-t border-gray-200/60 mt-3'>
                  <Link
                    href='/contact'
                    className='inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm'
                  >
                    <span>Request Consultation</span>
                    <svg className='w-3.5 h-3.5 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </Link>

                  <button
                    onClick={handleDownloadBrochure}
                    className='inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors'
                  >
                    <svg className='w-3.5 h-3.5 mr-1 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' />
                    </svg>
                    <span>Download Brochure</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
