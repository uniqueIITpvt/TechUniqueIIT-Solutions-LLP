'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product, ProductModal } from './ProductModal';

// ─── Static Product Data (Admin-panel ready: replace with API fetch later) ───
const productsData: Product[] = [
  {
    id: 'lms',
    title: 'UniqueIIT Learning Management System (LMS)',
    category: 'EdTech Solution',
    shortDescription:
      'A feature-rich full-stack web application designed to empower students to access, purchase, and engage with courses seamlessly.',
    fullDescription:
      'UniqueIIT Learning Management System (LMS) is a feature-rich full-stack web application designed to empower students to access, purchase, and engage with courses seamlessly. Leveraging the power of React.js, Node.js, Express.js, MongoDB, and Tailwind CSS, we have developed a platform that facilitates learning in an intuitive and user-friendly manner. Students can browse courses, purchase them, leave ratings & reviews, and track progress — while instructors can upload and manage course content through a streamlined admin interface.',
    features: [
      'User Authentication — Secure sign up, sign in, and account management',
      'Course Marketplace — Browse, search, and purchase courses across categories',
      'Course Upload UI — Instructors can upload and manage courses effortlessly',
      'Dedicated Course Pages — Detailed course information and curriculum',
      'Tag-based Search — Find courses by searching via tags or categories',
      'Rating and Reviews — Community-driven course ratings and feedback',
      'Responsive Design — Seamless experience across all devices',
    ],
    techStack: [
      { layer: 'Frontend', tech: 'React.js' },
      { layer: 'Backend', tech: 'Node.js, Express.js' },
      { layer: 'Database', tech: 'MongoDB' },
      { layer: 'Styling', tech: 'Tailwind CSS' },
    ],
    thumbnail: '/images/products/lms-portfolio.jpg',
    gallery: [
      { src: '/images/products/home-page-1.jpg', caption: 'LMS Home Page — Hero Section' },
      { src: '/images/products/home-page-2.jpg', caption: 'LMS Home Page — Course Categories' },
      { src: '/images/products/Course-details-page-1.png', caption: 'Course Details Page — Overview' },
      { src: '/images/products/Course-details-page-2.png', caption: 'Course Details Page — Curriculum' },
      { src: '/images/products/All-Course-page.jpg', caption: 'All Courses Marketplace Page' },
      { src: '/images/products/Student-Dashboard.jpg', caption: 'Student / Teacher Dashboard' },
      { src: '/images/products/Course-Upload-UI-1.jpg', caption: 'Course Upload UI — Step 1' },
      { src: '/images/products/Course-Upload-UI-2.jpg', caption: 'Course Upload UI — Step 2' },
      { src: '/images/products/Course-Upload-UI-3.jpg', caption: 'Course Upload UI — Step 3' },
    ],
    demoUrl: 'https://lms.uniqueiit.in/',
    badge: 'EdTech Platform',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'hrms',
    title: 'HRMS — Human Resource Management System',
    category: 'Enterprise ERP',
    shortDescription:
      'Complete employee lifecycle management system with attendance tracking, payroll automation, leave workflows, and performance appraisals.',
    fullDescription:
      'TechUniqueIIT HRMS is an all-in-one Human Resource Management System engineered to simplify HR operations for growing teams and enterprises. From employee onboarding and biometric attendance tracking to automated monthly payroll calculations, leave request workflows, and annual performance reviews — our HRMS reduces administrative overhead significantly and empowers HR teams to focus on people, not paperwork.',
    features: [
      'Employee Directory & Bio Profiles — Centralized team management',
      'Biometric & Mobile Attendance Tracking — Clock-in/out logging',
      'Automated Monthly Payroll & Tax Deduction — Salary processing',
      'Leave Request & Approval Workflows — Manager approval chains',
      'Performance Evaluation & KPI Tracking — Annual appraisals',
      'Custom Role-Based Access Control — Admin, HR, Employee roles',
    ],
    techStack: [
      { layer: 'Frontend', tech: 'React.js, Tailwind CSS' },
      { layer: 'Backend', tech: 'Node.js, Express.js' },
      { layer: 'Database', tech: 'MongoDB' },
      { layer: 'Auth', tech: 'JWT, Role-Based Access' },
    ],
    thumbnail: '/images/products/HRMS-portfolio.jpg',
    gallery: [],
    badge: 'Enterprise Product',
    color: 'from-indigo-600 to-blue-600',
  },
  {
    id: 'scms',
    title: 'SCMS — Sales Commission Management System',
    category: 'Business Intelligence',
    shortDescription:
      'Automated sales commission calculation, agent performance tracking, and real-time payout dashboard for sales-driven organizations.',
    fullDescription:
      'TechUniqueIIT Sales Commission Management System (SCMS) automates the entire sales commission lifecycle — from defining complex commission structures and tracking individual agent sales to generating accurate payout reports. SCMS eliminates manual spreadsheet-based commission tracking, reduces calculation errors, and gives sales managers real-time visibility into team performance and commission distribution.',
    features: [
      'Flexible Commission Structure Definition — Tiered, flat, or percentage-based',
      'Agent Sales Tracking & Performance Dashboard — Real-time metrics',
      'Automated Commission Calculation Engine — Error-free payouts',
      'Payout Report Generation — Monthly/quarterly export to CSV/PDF',
      'Manager Approval Workflow — Commission review and sign-off',
      'Role-Based Access — Admin, Manager, Sales Agent portals',
    ],
    techStack: [
      { layer: 'Frontend', tech: 'React.js, Tailwind CSS' },
      { layer: 'Backend', tech: 'Node.js, Express.js' },
      { layer: 'Database', tech: 'MongoDB' },
      { layer: 'Reports', tech: 'PDF/CSV Export Engine' },
    ],
    thumbnail: '/images/products/SCMS-portfolio.jpg',
    gallery: [],
    badge: 'Business Intelligence',
    color: 'from-emerald-600 to-teal-600',
  },
];

export const ProductsList = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className='relative overflow-hidden py-14 sm:py-18 lg:py-22 bg-gradient-to-b from-white via-indigo-50/30 to-white'>
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-14'
        >
          <span className='inline-flex items-center px-4 py-1.5 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-xs sm:text-sm text-indigo-600 font-medium mb-5'>
            <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
            Our Software Products
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5'>
            Ready-to-Deploy{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
              Enterprise Software
            </span>
          </h1>
          <p className='text-base text-gray-600 leading-relaxed'>
            In addition to custom development, TechUniqueIIT builds production-grade software products for education, HR management, and sales operations. Click any product to explore features and screenshots.
          </p>
        </motion.div>

        {/* Gallery Grid — 3 Product Cards */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14'>
          {productsData.map((product, index) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className='group text-left bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden'
            >
              {/* Thumbnail Image */}
              <div className='relative aspect-[16/10] overflow-hidden'>
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                {/* Overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end'>
                  <div className='p-4 w-full'>
                    <span className='inline-flex items-center px-3 py-1 text-[10px] font-bold text-white bg-white/20 backdrop-blur-sm rounded-full uppercase tracking-wider'>
                      Click to View Details
                    </span>
                  </div>
                </div>
                {/* Badge */}
                <div className='absolute top-3 left-3'>
                  <span className={`inline-block px-2.5 py-1 text-[10px] font-bold text-white bg-gradient-to-r ${product.color} rounded-full shadow-lg uppercase tracking-wider`}>
                    {product.badge}
                  </span>
                </div>
                {/* Gallery count indicator */}
                {product.gallery.length > 0 && (
                  <div className='absolute top-3 right-3 flex items-center px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full'>
                    <svg className='w-3 h-3 text-white mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                    <span className='text-[10px] text-white font-semibold'>{product.gallery.length}</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className='p-5'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-[10px] font-semibold text-indigo-600 uppercase tracking-wider'>{product.category}</span>
                  {product.demoUrl && (
                    <span className='flex items-center text-[10px] text-green-600 font-semibold'>
                      <span className='flex h-1.5 w-1.5 rounded-full bg-green-500 mr-1 animate-pulse'></span>
                      Live Demo
                    </span>
                  )}
                </div>
                <h3 className='text-base font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug'>
                  {product.title}
                </h3>
                <p className='text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3'>
                  {product.shortDescription}
                </p>

                {/* Tech Tags */}
                <div className='flex flex-wrap gap-1.5'>
                  {product.techStack.map((item) => (
                    <span key={item.layer} className='px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-600 rounded-md'>
                      {item.tech.split(',')[0].trim()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='bg-gradient-to-r from-indigo-900 to-violet-900 rounded-2xl p-7 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl'
        >
          <div>
            <h3 className='text-xl sm:text-2xl font-bold mb-2'>Need a Customized Product Version?</h3>
            <p className='text-indigo-200 text-sm max-w-xl'>
              We can tailor LMS, HRMS, or SCMS to your exact business requirements, branding, and custom integrations.
            </p>
          </div>
          <a
            href='/contact'
            className='px-7 py-3 bg-white text-indigo-900 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors whitespace-nowrap shadow-lg'
          >
            Contact Product Team
          </a>
        </motion.div>

        {/* Product Detail Modal (Popup with Gallery) */}
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </div>
    </section>
  );
};
