'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product, ProductModal } from './ProductModal';

const cloudinaryProductImage = (filename: string) =>
  `https://res.cloudinary.com/techuniqueiit/image/upload/product-images/${filename}`;

// ─── Static Product Data (Admin-panel ready: replace with API fetch later) ───
const productsData: Product[] = [
  {
    id: 'lms',
    title: 'UniqueIIT Learning Management System (LMS)',
    category: 'EdTech Solution',
    shortDescription:
      'A feature-rich full-stack web application designed to empower students to access, purchase, and engage with courses seamlessly.',
    fullDescription:
      'UniqueIIT Learning Management System (LMS) reflects our LMS development company India experience, built as a feature-rich full-stack web application designed to empower students to access, purchase, and engage with courses seamlessly. Leveraging the power of React.js, Node.js, Express.js, MongoDB, and Tailwind CSS, we have developed a platform that facilitates learning in an intuitive and user-friendly manner. Students can browse courses, purchase them, leave ratings & reviews, and track progress — while instructors can upload and manage course content through a streamlined admin interface.',
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
    thumbnail: cloudinaryProductImage('lms-portfolio.jpg'),
    gallery: [
      { src: cloudinaryProductImage('home-page-1.jpg'), caption: 'LMS Home Page — Hero Section' },
      { src: cloudinaryProductImage('home-page-2.jpg'), caption: 'LMS Home Page — Course Categories' },
      { src: cloudinaryProductImage('Course-details-page-1.jpg'), caption: 'Course Details Page — Overview' },
      { src: cloudinaryProductImage('Course-details-page-2.jpg'), caption: 'Course Details Page — Curriculum' },
      { src: cloudinaryProductImage('All-Course-page.jpg'), caption: 'All Courses Marketplace Page' },
      { src: cloudinaryProductImage('Student-Dashboard.jpg'), caption: 'Student / Teacher Dashboard' },
      { src: cloudinaryProductImage('Course-Upload-UI-1.jpg'), caption: 'Course Upload UI — Step 1' },
      { src: cloudinaryProductImage('Course-Upload-UI-2.jpg'), caption: 'Course Upload UI — Step 2' },
      { src: cloudinaryProductImage('Course-Upload-UI-3.jpg'), caption: 'Course Upload UI — Step 3' },
    ],
    demoUrl: 'https://lms.uniqueiit.in/',
    badge: 'EdTech Platform',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'ebook-audiobook-platform',
    title: 'UniqueIIT Ebook & Audiobook Platform',
    category: 'Digital Publishing & Audio Learning',
    shortDescription:
      'A feature-rich full-stack digital content ecosystem designed to empower users to discover, read, and listen to ebooks, audiobooks, and key summaries seamlessly.',
    fullDescription:
      'UniqueIIT Ebook & Audiobook Platform is a state-of-the-art digital content ecosystem designed to deliver seamless reading and listening experiences across web and mobile browsers. Built with Next.js 15, React 19, Node.js, Express.js, MongoDB, Cloudinary, and Tailwind CSS, the platform supports a triple access model: free 5-minute summaries for lead generation, unlimited subscription passes, and lifetime individual book purchases. Features include a custom in-browser EPUB/PDF reader, HTML5 audio player with multi-speed controls, real-time cross-device progress sync, automated AI audio generation, and a subscriber-exclusive "Keep Forever" library claim feature.',
    features: [
      'Dual-Format Reader & Player — In-browser EPUB/PDF reader & HTML5 audiobook player with speed controls',
      'Triple Access Model — Free tier summaries, unlimited subscription passes, and individual title purchases',
      '⭐ "Keep Forever" Subscription Claim — Subscribers permanently retain claimed books even after subscription ends',
      'Cross-Device Progress Sync — Seamless real-time sync of reading pages and audiobook timestamps',
      'Integrated Payment Gateway — Razorpay integration supporting UPI, Credit/Debit Cards, and PDF invoices',
      'Comprehensive Admin Telemetry — Content upload workflows, revenue charts, user subscriptions, and sales reports',
      'AI-Powered Audio & Transcripts — Automated text-to-speech summary generation via Edge-TTS & WhisperX',
      'Responsive & Accessible Design — Optimized viewing & listening experience across desktop, tablet, and mobile',
    ],
    techStack: [
      { layer: 'Frontend', tech: 'Next.js 15, React 19' },
      { layer: 'Backend', tech: 'Node.js, Express.js' },
      { layer: 'Database', tech: 'MongoDB' },
      { layer: 'Styling', tech: 'Tailwind CSS' },
    ],
    thumbnail: cloudinaryProductImage('ebook-portfolio.jpg'),
    gallery: [
      { src: cloudinaryProductImage('ebook-hero.jpg'), caption: 'Home Page — Hero Section & Header' },
      { src: cloudinaryProductImage('ebook-free-summaries.png'), caption: 'Free Ebook Summaries & Reader' },
      { src: cloudinaryProductImage('ebook-subscription.jpg'), caption: 'Subscription Plans — Basic, Premium, Pro' },
      { src: cloudinaryProductImage('ebook-catalog.jpg'), caption: 'Individual Ebooks Catalog' },
      { src: cloudinaryProductImage('ebook-audiobook-player.jpg'), caption: 'Audiobook Player & Audio Catalog' },
      { src: cloudinaryProductImage('ebook-login-modal.jpg'), caption: 'User Authentication Modal' },
      { src: cloudinaryProductImage('ebook-checkout.jpg'), caption: 'Checkout & Payment Gateway' },
      { src: cloudinaryProductImage('ebook-admin-upload-form.jpg'), caption: 'Admin Upload Modal — Add New Book' },
      { src: cloudinaryProductImage('ebook-admin-dashboard.jpg'), caption: 'Admin Telemetry & Revenue Dashboard' },
    ],
    demoUrl: 'http://localhost:3000/',
    badge: 'EdTech & Digital Content',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'restaurant-ordering-platform',
    title: 'Restaurant Food Ordering & Delivery Platform',
    category: 'FoodTech & Online Ordering',
    shortDescription:
      'A branded restaurant ordering website for menu discovery, dish customization, cart flow, authentication, and delivery-focused checkout.',
    fullDescription:
      'TechUniqueIIT Restaurant Food Ordering & Delivery Platform is a FoodTech web product built for restaurants, cloud kitchens, and catering brands that need a polished online ordering experience. The platform supports a strong branded homepage, category-based menu browsing, searchable dish cards, add-to-cart workflows, item customization with add-ons, quantity-based pricing, customer login, and a checkout-ready cart experience. It is designed to help restaurants present their menu clearly, reduce ordering friction, and create a mobile-friendly ordering journey for dine-in, pickup, and delivery use cases.',
    features: [
      'Branded Restaurant Storefront - Hero section, contact blocks, and social-first presentation',
      'Menu Categories - Appetizers, chicken, beef, vegetable, rice, desserts, wraps, and more',
      'Dish Cards - Price, ratings, category badges, short descriptions, and add-to-cart actions',
      'Customization Modal - Optional add-ons, bread choices, spice levels, quantity, and live total',
      'Cart & Checkout Flow - Cart summary, delivery fees, totals, and checkout-ready structure',
      'Customer Authentication - Email and phone login interface with account creation path',
      'Responsive Food Ordering UX - Optimized browsing and ordering across desktop and mobile',
    ],
    previewHighlights: [
      'Restaurant landing page with branded navigation, ordering CTA, and contact shortcuts',
      'Category carousel and menu filtering for faster dish discovery',
      'Product cards for grilled dishes, biryani, bread, vegetables, and featured dishes',
      'Item detail modal with add-ons, quantity controls, and live price calculation',
      'Login and delivery-focused customer onboarding screens',
    ],
    techStack: [
      { layer: 'Frontend', tech: 'Next.js, React.js' },
      { layer: 'Backend', tech: 'Node.js, Express.js' },
      { layer: 'Database', tech: 'MongoDB' },
      { layer: 'Styling', tech: 'Tailwind CSS, Framer Motion' },
    ],
    thumbnail: cloudinaryProductImage('restaurant-ordering-platform.jpg'),
    gallery: [
      { src: cloudinaryProductImage('restaurant-home.jpg'), caption: 'Restaurant Home Page - Hero, Navigation & Ordering CTA' },
      { src: cloudinaryProductImage('restaurant-menu.jpg'), caption: 'Menu Categories & Featured Dishes' },
      { src: cloudinaryProductImage('restaurant-menu-grid.jpg'), caption: 'Menu Grid - Product Cards & Add to Cart Flow' },
      { src: cloudinaryProductImage('restaurant-login.jpg'), caption: 'Customer Login & Food Delivery Screen' },
    ],
    demoUrl: 'https://resturant-app1frontend.vercel.app/',
    badge: 'FoodTech Platform',
    color: 'from-orange-600 to-rose-600',
  },
  {
    id: 'hrms',
    title: 'HRMS - Human Resource Management System',
    category: 'Enterprise ERP',
    shortDescription:
      'Complete employee lifecycle management system with attendance tracking, payroll workflows, leave approvals, performance reviews, and HR reporting.',
    fullDescription:
      'TechUniqueIIT HRMS reflects our HRMS software development company capability and is an all-in-one Human Resource Management System engineered to simplify people operations for growing teams and enterprises. The product centralizes employee records, role-based access, attendance, leave approvals, payroll inputs, performance reviews, and HR reporting in one workflow-driven platform. It is designed for organizations that need fewer manual spreadsheets, clearer approval trails, faster monthly HR operations, and a scalable foundation for future HR automation.',
    features: [
      'Employee Directory & Bio Profiles - Centralized team management',
      'Attendance Tracking - Clock-in/out logs and monthly summaries',
      'Payroll Inputs & Salary Workflows - Faster monthly processing',
      'Leave Request & Approval Workflows - Manager approval chains',
      'Performance Evaluation & KPI Tracking - Review cycle support',
      'Custom Role-Based Access Control - Admin, HR, Manager, Employee roles',
      'HR Reports & Audit Trail - Cleaner records for operations review',
    ],
    previewHighlights: [
      'Employee master records, documents, departments, and role assignments',
      'Attendance, leave, payroll input, and approval workflow modules',
      'Manager and HR dashboards for workforce status and pending actions',
      'Configurable roles for Admin, HR, Manager, and Employee access',
      'Reporting layer for monthly HR operations and compliance review',
    ],
    techStack: [
      { layer: 'Frontend', tech: 'React.js, Tailwind CSS' },
      { layer: 'Backend', tech: 'Node.js, Express.js' },
      { layer: 'Database', tech: 'MongoDB' },
      { layer: 'Auth', tech: 'JWT, Role-Based Access' },
    ],
    thumbnail: cloudinaryProductImage('HRMS-portfolio.jpg'),
    gallery: [],
    badge: 'Enterprise Product',
    color: 'from-indigo-600 to-blue-600',
  },
  {
    id: 'scms',
    title: 'SCMS - Sales Commission Management System',
    category: 'Business Intelligence',
    shortDescription:
      'Automated sales commission calculation, agent performance tracking, payout approvals, export-ready reports, and audit-friendly incentive workflows.',
    fullDescription:
      'TechUniqueIIT Sales Commission Management System (SCMS) automates the full commission lifecycle for sales-driven teams. The product supports commission rule configuration, agent and manager workflows, sales performance tracking, payout calculations, approval checkpoints, and export-ready reports. It helps companies reduce spreadsheet dependency, avoid calculation disputes, improve payout transparency, and give leadership a clear view of sales incentives and team performance.',
    features: [
      'Flexible Commission Rule Builder - Tiered, flat, or percentage-based logic',
      'Agent Sales Tracking & Performance Dashboard - Real-time metrics',
      'Automated Commission Calculation Engine - Reduced payout errors',
      'Payout Report Generation - Monthly or quarterly CSV/PDF exports',
      'Manager Approval Workflow - Commission review and sign-off',
      'Role-Based Access - Admin, Manager, Finance, Sales Agent portals',
      'Dispute Reduction & Audit Trail - Clear calculation history',
    ],
    previewHighlights: [
      'Commission rule setup for flat, tiered, percentage, and hybrid structures',
      'Agent sales tracking with monthly performance and incentive visibility',
      'Approval workflow for manager, finance, and admin review stages',
      'Payout report exports for accounting and leadership review',
      'Audit trail for commission calculations, changes, and approvals',
    ],
    techStack: [
      { layer: 'Frontend', tech: 'React.js, Tailwind CSS' },
      { layer: 'Backend', tech: 'Node.js, Express.js' },
      { layer: 'Database', tech: 'MongoDB' },
      { layer: 'Reports', tech: 'PDF/CSV Export Engine' },
    ],
    thumbnail: cloudinaryProductImage('SCMS-portfolio.jpg'),
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
            In addition to custom development, TechUniqueIIT builds production-grade software products for education, HR management, and sales operations, including LMS and HRMS software development examples. Click any product to explore features and screenshots.
          </p>
        </motion.div>

        {/* Gallery Grid */}
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
                {product.gallery.length === 0 && product.previewHighlights && (
                  <div className='absolute top-3 right-3 flex items-center px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full'>
                    <span className='text-[10px] text-white font-semibold'>Workflow Preview</span>
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
