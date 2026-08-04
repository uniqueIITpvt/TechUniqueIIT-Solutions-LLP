'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface TechStackItem {
  layer: string;
  tech: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  previewHighlights?: string[];
  techStack: TechStackItem[];
  thumbnail: string;
  gallery: GalleryImage[];
  demoUrl?: string;
  badge: string;
  color: string;
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  if (!product) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto'
        onClick={onClose}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.25 }}
          className='relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`p-5 sm:p-8 bg-gradient-to-r ${product.color} text-white relative`}>
            <button
              onClick={onClose}
              className='absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10'
              aria-label='Close modal'
            >
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
            <span className='inline-block px-3 py-1 text-xs font-semibold bg-white/20 rounded-full mb-3 uppercase tracking-wider'>
              {product.badge}
            </span>
            <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold mb-2 pr-10'>{product.title}</h2>
            <p className='text-white/90 text-sm max-w-2xl'>{product.shortDescription}</p>
            {product.demoUrl && (
              <a
                href={product.demoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold transition-colors'
              >
                <svg className='w-4 h-4 mr-1.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                </svg>
                View Live Demo
              </a>
            )}
          </div>

          {/* Body */}
          <div className='p-5 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto'>
            {/* Overview */}
            <div>
              <h3 className='text-base font-bold text-gray-900 mb-2'>Overview</h3>
              <p className='text-gray-600 leading-relaxed text-sm'>{product.fullDescription}</p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className='text-base font-bold text-gray-900 mb-3'>Key Features & Capabilities</h3>
              <div className='grid sm:grid-cols-2 gap-2.5'>
                {product.features.map((feature, idx) => (
                  <div key={idx} className='flex items-start space-x-2.5 p-2.5 bg-gray-50 rounded-xl border border-gray-100'>
                    <svg className='w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                    <span className='text-xs text-gray-700 font-medium leading-snug'>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className='pt-3 border-t border-gray-100'>
              <h3 className='text-base font-bold text-gray-900 mb-3'>Technology Stack</h3>
              <div className='grid sm:grid-cols-2 gap-2'>
                {product.techStack.map((item) => (
                  <div key={item.layer} className='flex items-center text-xs'>
                    <span className='font-bold text-gray-800 w-20 flex-shrink-0'>{item.layer}:</span>
                    <span className='text-gray-600'>{item.tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshot Gallery */}
            {product.gallery.length > 0 && (
              <div className='pt-3 border-t border-gray-100'>
                <h3 className='text-base font-bold text-gray-900 mb-3'>
                  Application Screenshots
                  <span className='text-xs font-normal text-gray-500 ml-2'>({product.gallery.length} images)</span>
                </h3>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className='group relative aspect-video rounded-xl overflow-hidden border-2 border-gray-100 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md'
                    >
                      <Image
                        src={img.src}
                        alt={img.caption}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                        sizes='(max-width: 768px) 50vw, 33vw'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
                        <div className='absolute bottom-0 left-0 right-0 p-2'>
                          <p className='text-white text-[10px] font-medium truncate'>{img.caption}</p>
                        </div>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                          <svg className='w-8 h-8 text-white/90' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7' />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.gallery.length === 0 && product.previewHighlights && (
              <div className='pt-3 border-t border-gray-100'>
                <h3 className='text-base font-bold text-gray-900 mb-3'>Product Workflow Preview</h3>
                <div className='grid gap-4 sm:grid-cols-[0.9fr_1.1fr]'>
                  <div className='relative aspect-video overflow-hidden rounded-xl border border-gray-100 bg-gray-50'>
                    <Image
                      src={product.thumbnail}
                      alt={`${product.title} overview`}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 360px'
                    />
                  </div>
                  <div className='grid gap-2'>
                    {product.previewHighlights.map((highlight) => (
                      <div
                        key={highlight}
                        className='flex items-start rounded-xl border border-gray-100 bg-gray-50 p-3'
                      >
                        <svg className='mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                        </svg>
                        <span className='ml-2 text-xs font-medium leading-snug text-gray-700'>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className='mt-3 text-xs leading-5 text-gray-500'>
                  Detailed screens can be reviewed during a product walkthrough and customized to match your organization workflow.
                </p>
              </div>
            )}
          </div>

          {/* Footer CTAs */}
          <div className='p-5 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3'>
            <div className='text-xs text-gray-500 text-center sm:text-left'>
              Interested in {product.title}? Let&apos;s discuss your requirements.
            </div>
            <div className='flex items-center space-x-3 w-full sm:w-auto'>
              <button
                onClick={onClose}
                className='px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors w-1/2 sm:w-auto text-center'
              >
                Close
              </button>
              <Link
                href='/contact'
                onClick={onClose}
                className='px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:shadow-lg transition-all w-1/2 sm:w-auto text-center'
              >
                Request Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox for full-screen screenshot view */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90'
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className='absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          <div className='relative w-full max-w-5xl max-h-[90vh]' onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.caption}
              width={1400}
              height={900}
              sizes='(max-width: 1024px) 100vw, 1024px'
              className='w-full h-auto max-h-[85vh] object-contain rounded-lg'
            />
            <p className='text-white text-center text-sm font-medium mt-3'>{selectedImage.caption}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
