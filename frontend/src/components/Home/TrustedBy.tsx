'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Logo {
  name: string;
  logo: string;
}

interface TechCategory {
  category: string;
  logos: Logo[];
}

const technologies: TechCategory[] = [
  {
    category: 'Cloud & DevOps',
    logos: [
      { name: 'AWS', logo: '/tech-logos/cloud-logo/aws-2.svg' },
      { name: 'Azure', logo: '/tech-logos/cloud-logo/azure-1.svg' },
      {
        name: 'Google Cloud',
        logo: '/tech-logos/cloud-logo/google-cloud-1.svg',
      },
      { name: 'Docker', logo: '/tech-logos/cloud-logo/docker-4.svg' },
      { name: 'Kubernetes', logo: '/tech-logos/cloud-logo/kubernets.svg' },
      {
        name: 'Terraform',
        logo: '/tech-logos/cloud-logo/terraform-enterprise.svg',
      },
    ],
  },
  {
    category: 'Mobile Development',
    logos: [
      {
        name: 'React Native',
        logo: '/tech-logos/mobile-dev-logo/react-native-1.svg',
      },
      { name: 'Flutter', logo: '/tech-logos/mobile-dev-logo/flutter.svg' },
      { name: 'Swift', logo: '/tech-logos/mobile-dev-logo/swift-15.svg' },
      { name: 'Kotlin', logo: '/tech-logos/mobile-dev-logo/kotlin-1.svg' },
      { name: 'Firebase', logo: '/tech-logos/mobile-dev-logo/firebase-1.svg' },
      {
        name: 'App Store',
        logo: '/tech-logos/mobile-dev-logo/apple-app-store.svg',
      },
    ],
  },
  {
    category: 'Web Development',
    logos: [
      { name: 'Next.js', logo: '/tech-logos/next-js.svg' },
      { name: 'React', logo: '/tech-logos/react-2.svg' },
      { name: 'Node.js', logo: '/tech-logos/nodejs-3.svg' },
      { name: '.NET Core', logo: '/tech-logos/dotnet.png' },
      { name: 'MongoDB', logo: '/tech-logos/mongodb-icon-1.svg' },
      { name: 'GraphQL', logo: '/tech-logos/graphql-logo-2.svg' },
    ],
  },
];

interface TechCategoryProps {
  tech: TechCategory;
  index: number;
}

const TechCategory = ({ tech, index }: TechCategoryProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll animation for both mobile and desktop
  useEffect(() => {
    const startAutoScroll = async () => {
      const container = scrollContainerRef.current;
      if (container) {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        if (scrollWidth > clientWidth) {
          // Start the infinite scroll animation
          controls.start({
            x: [0, -(scrollWidth - clientWidth), 0],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 25,
                ease: 'linear',
              },
            },
          });
        }
      }
    };

    startAutoScroll();

    // Re-calculate on window resize
    const handleResize = () => {
      startAutoScroll();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [controls]);

  // Pause animation on hover/touch
  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else {
      const container = scrollContainerRef.current;
      if (container) {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        controls.start({
          x: [0, -(scrollWidth - clientWidth), 0],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          },
        });
      }
    }
  }, [isHovered, controls]);

  return (
    <div className='relative'>
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className='text-xl font-semibold text-gray-900 mb-6 pl-4 border-l-4 border-indigo-500'
      >
        {tech.category}
      </motion.h3>

      <div className='relative'>
        {/* Gradient Overlays for scroll effect */}
        <div className='absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10'></div>
        <div className='absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10'></div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className='overflow-hidden pb-4'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <motion.div
            animate={controls}
            className='flex space-x-6 min-w-max px-0.5'
          >
            {/* First set of logos for continuous loop effect */}
            {tech.logos.map((item: Logo, logoIndex: number) => (
              <motion.div
                key={`${item.name}-1`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + logoIndex * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
                className='flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 w-24 flex-shrink-0'
              >
                <div className='relative w-16 h-16 mb-3'>
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className='object-contain transition-all duration-300'
                  />
                </div>
                <span className='text-sm text-gray-600 text-center font-medium'>
                  {item.name}
                </span>
              </motion.div>
            ))}

            {/* Duplicate set of logos for seamless looping */}
            {tech.logos.map((item: Logo, logoIndex: number) => (
              <motion.div
                key={`${item.name}-2`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + logoIndex * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
                className='flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 w-24 flex-shrink-0'
              >
                <div className='relative w-16 h-16 mb-3'>
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className='object-contain transition-all duration-300'
                  />
                </div>
                <span className='text-sm text-gray-600 text-center font-medium'>
                  {item.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const TrustedBy = () => {
  return (
    <section className='py-10 bg-gradient-to-b from-white to-indigo-50/50 relative overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-indigo-100/50'></div>
        <div className='absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-violet-100/50'></div>
      </div>

      <div className='container mx-auto px-4 relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <span className='inline-flex items-center px-4 py-2 rounded-full bg-white shadow-md shadow-indigo-100 border border-indigo-50 text-sm text-indigo-600 font-medium mb-6'>
            <span className='flex h-2 w-2 rounded-full bg-indigo-600 mr-2'></span>
            Tech Stack
          </span>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            Powered by{' '}
            <span className='relative'>
              <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>
                Modern Technology
              </span>
              <span className='absolute inset-x-0 bottom-0 h-3 bg-indigo-100/50 z-0'></span>
            </span>
          </h2>
          <p className='text-lg text-gray-600'>
            We leverage cutting-edge technologies to deliver exceptional
            solutions
          </p>
        </motion.div>

        <div className='space-y-10'>
          {technologies.map((tech, index) => (
            <TechCategory key={tech.category} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
