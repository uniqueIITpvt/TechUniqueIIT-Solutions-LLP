'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const departments = [
  'All',
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Operations',
];

const positions = [
  {
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    posted: '2 days ago',
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    salary: '$90k - $120k',
    posted: '1 week ago',
  },
  {
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'On-site',
    type: 'Full-time',
    salary: '$80k - $100k',
    posted: '3 days ago',
  },
  {
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60k - $80k + Commission',
    posted: '1 day ago',
  },
];

export const OpenPositions = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredPositions = positions.filter(
    (position) =>
      selectedDepartment === 'All' || position.department === selectedDepartment
  );

  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-12'
        >
          <span className='inline-block px-4 py-1.5 mb-4 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full'>
            Open Positions
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Join Our Growing Team
          </h2>
          <p className='text-lg text-gray-600'>
            We&apos;re always looking for talented individuals to help us build
            the future of technology.
          </p>
        </motion.div>

        {/* Department Filter */}
        <div className='flex flex-wrap justify-center gap-3 mb-12'>
          {departments.map((department, index) => (
            <motion.button
              key={department}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedDepartment(department)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${
                  selectedDepartment === department
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              {department}
            </motion.button>
          ))}
        </div>

        {/* Positions Grid */}
        <div className='grid gap-6 max-w-4xl mx-auto'>
          {filteredPositions.map((position, index) => (
            <motion.div
              key={position.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100'>
                <div className='flex flex-wrap gap-6 items-start justify-between'>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>
                      {position.title}
                    </h3>
                    <div className='flex flex-wrap gap-3'>
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-600'>
                        {position.department}
                      </span>
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600'>
                        {position.location}
                      </span>
                      <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600'>
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <div className='text-right'>
                    <div className='text-lg font-semibold text-gray-900 mb-1'>
                      {position.salary}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {position.posted}
                    </div>
                  </div>
                </div>
                <div className='mt-6 flex justify-between items-center'>
                  <button className='text-indigo-600 font-medium hover:text-indigo-700 transition-colors'>
                    Learn More →
                  </button>
                  <button className='px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors'>
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Positions Message */}
        {filteredPositions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12'
          >
            <p className='text-gray-500'>
              No open positions in this department at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
