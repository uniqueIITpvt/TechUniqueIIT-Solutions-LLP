'use client';

import { motion } from 'framer-motion';

const roadmapSteps = [
  {
    phase: 'Phase 1',
    title: 'Research & Planning',
    duration: '1-2 Weeks',
    tasks: [
      'Requirements gathering',
      'Market research',
      'Technical feasibility analysis',
      'Project scope definition',
      'Architecture planning',
    ],
    icon: '🎯',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    phase: 'Phase 2',
    title: 'Design & Prototyping',
    duration: '2-3 Weeks',
    tasks: [
      'UI/UX design',
      'Wireframing',
      'Interactive prototyping',
      'Design system creation',
      'Client feedback & revisions',
    ],
    icon: '🎨',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    phase: 'Phase 3',
    title: 'Development',
    duration: '4-8 Weeks',
    tasks: [
      'Frontend development',
      'Backend implementation',
      'Database setup',
      'API integration',
      'Security implementation',
    ],
    icon: '⚙️',
    color: 'from-violet-500 to-purple-500',
  },
  {
    phase: 'Phase 4',
    title: 'Testing & Deployment',
    duration: '2-3 Weeks',
    tasks: [
      'Quality assurance',
      'Performance optimization',
      'Security testing',
      'User acceptance testing',
      'Production deployment',
    ],
    icon: '🚀',
    color: 'from-purple-500 to-pink-500',
  },
];

export const DevelopmentRoadmap = () => {
  return (
    <section className='py-20 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Development Journey
          </h2>
          <p className='text-lg text-gray-600'>
            Our proven process for bringing your web project to life
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4'>
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='group relative'
            >
              {/* Connecting Line */}
              {index < roadmapSteps.length - 1 && (
                <div className='hidden lg:block absolute top-1/2 right-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent transform translate-y-20 z-0' />
              )}

              {/* Card */}
              <div className='relative bg-white rounded-2xl shadow-lg overflow-hidden z-10 h-full transform transition-transform duration-300 group-hover:-translate-y-2'>
                {/* Gradient Border */}
                <div className={`h-2 bg-gradient-to-r ${step.color}`} />

                <div className='p-6'>
                  {/* Header */}
                  <div className='flex items-center gap-4 mb-6'>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-lg`}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3 className='text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                        {step.phase}
                      </h3>
                      <p className='text-sm font-medium text-gray-500'>
                        {step.duration}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                    {step.title}
                  </h4>

                  {/* Tasks */}
                  <ul className='space-y-3'>
                    {step.tasks.map((task, taskIndex) => (
                      <motion.li
                        key={taskIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + taskIndex * 0.1,
                        }}
                        className='flex items-start gap-3 text-gray-600 group/task'
                      >
                        <div
                          className={`w-6 h-6 rounded-full bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200`}
                        >
                          <svg
                            className='w-4 h-4 text-white'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M5 13l4 4L19 7'
                            />
                          </svg>
                        </div>
                        <span className='group-hover/task:text-gray-900 transition-colors duration-200'>
                          {task}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step Number */}
              <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gray-100'>
                <span className='text-sm font-bold text-gray-600'>
                  {index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
