'use client';

import { motion } from 'framer-motion';

const expertise = [
  {
    number: '01',
    title: 'Custom Web & Software Development',
    description: 'Business platforms and custom workflows built for the way each organisation operates.',
    tools: ['React', 'Next.js', 'Angular', 'Node.js', 'Python', '.NET', 'SQL', 'Cloud'],
  },
  {
    number: '02',
    title: 'Software Maintenance & Code Management',
    description: 'Ownership of existing applications, from code takeover and refactoring to security and servers.',
    tools: ['Code Takeover', 'Bug Fixing', 'Refactoring', 'Security', 'Cloud Ops'],
  },
  {
    number: '03',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile products designed for reliable performance on iOS and Android.',
    tools: ['React Native', 'Flutter', 'iOS', 'Android', 'API Integration'],
  },
  {
    number: '04',
    title: 'Digital Marketing & Social Media',
    description: 'Research-led content and campaigns for visibility, engagement, and qualified growth.',
    tools: ['SEO', 'YouTube', 'Instagram', 'LinkedIn', 'Content Strategy'],
  },
];

export const CompanyExpertise = () => {
  return (
    <section className='bg-gray-50/70 py-12 sm:py-16 lg:py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end'
        >
          <div>
            <span className='mb-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm'>
              Our Expertise
            </span>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Four connected capabilities
            </h2>
          </div>
          <p className='max-w-2xl text-sm leading-6 text-gray-600 lg:justify-self-end lg:text-base'>
            The same core offerings presented on our home page, covering the
            complete path from development to ongoing support and growth.
          </p>
        </motion.div>

        <div className='grid overflow-hidden border-y border-gray-200 bg-white md:grid-cols-2 lg:grid-cols-4'>
          {expertise.map((item, index) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className='border-b border-gray-200 p-5 last:border-b-0 md:border-r md:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0 sm:p-6'
            >
              <span className='text-xs font-bold text-indigo-400'>{item.number}</span>
              <h3 className='mt-5 min-h-[3rem] text-lg font-bold leading-6 text-gray-900'>
                {item.title}
              </h3>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                {item.description}
              </p>
              <div className='mt-5 flex flex-wrap gap-1.5'>
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className='rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-700'
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
