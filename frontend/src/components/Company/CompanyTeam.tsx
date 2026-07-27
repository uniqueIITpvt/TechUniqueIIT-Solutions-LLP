'use client';

import { motion } from 'framer-motion';

const specialistTeams = [
  {
    name: 'Engineering & Product',
    focus: 'Full-stack development, mobile applications, system architecture, and cloud delivery.',
  },
  {
    name: 'Digital Marketing & Strategy',
    focus: 'Content strategy, social media, SEO, brand growth, and performance marketing.',
  },
];

export const CompanyTeam = () => {
  return (
    <section className='bg-white py-12 sm:py-16 lg:py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-10 max-w-3xl'
        >
          <span className='mb-4 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600'>
            Our Leadership
          </span>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Experienced leadership, specialist teams
          </h2>
          <p className='mt-4 text-base leading-7 text-gray-600'>
            A straightforward team structure centred on technical ownership,
            clear decisions, and dependable delivery.
          </p>
        </motion.div>

        <div className='grid border-y border-gray-200 lg:grid-cols-[0.9fr_1.1fr]'>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='flex items-start gap-5 py-8 pr-0 lg:border-r lg:border-gray-200 lg:pr-10'
          >
            <div className='flex h-14 w-14 flex-shrink-0 items-center justify-center bg-indigo-600 text-sm font-bold text-white'>
              MM
            </div>
            <div>
              <h3 className='text-xl font-bold text-gray-900'>
                Mohammad Musharaf
              </h3>
              <p className='mt-1 text-sm font-semibold text-indigo-600'>
                Founder &amp; Managing Director
              </p>
              <p className='mt-4 max-w-lg text-sm leading-6 text-gray-600'>
                Brings more than 17 years of IT experience to engineering,
                solution architecture, and the strategic direction of
                TechUniqueIIT.
              </p>
            </div>
          </motion.div>

          <div className='border-t border-gray-200 lg:border-l-0 lg:border-t-0 lg:pl-10'>
            {specialistTeams.map((team, index) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`grid gap-2 py-6 sm:grid-cols-[180px_1fr] sm:gap-6 ${
                  index > 0 ? 'border-t border-gray-200' : ''
                }`}
              >
                <h3 className='text-sm font-bold text-gray-900'>{team.name}</h3>
                <p className='text-sm leading-6 text-gray-600'>{team.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
