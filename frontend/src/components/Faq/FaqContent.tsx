'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type FaqSection = {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

interface FaqContentProps {
  sections: FaqSection[];
}

export const FaqContent = ({ sections }: FaqContentProps) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].title);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <section className='py-16 sm:py-20 lg:py-24'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Navigation */}
        <div className='flex flex-nowrap overflow-x-auto pb-4 mb-8 gap-3 sm:gap-4 scrollbar-hide'>
          {sections.map((section) => (
            <motion.button
              key={section.title}
              onClick={() => {
                setActiveSection(section.title);
                setOpenQuestion(null); // Close open question when changing section
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === section.title
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {section.title}
            </motion.button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className='max-w-4xl mx-auto'>
          <AnimatePresence mode='wait'>
            {sections
              .find((section) => section.title === activeSection)
              ?.questions.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className='mb-4'
                >
                  <button
                    onClick={() => toggleQuestion(item.question)}
                    className='w-full text-left'
                  >
                    <div
                      className={`p-5 sm:p-6 rounded-xl transition-all ${
                        openQuestion === item.question
                          ? 'bg-indigo-50'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className='flex items-start'>
                        <div className='flex-1 pr-4'>
                          <h3
                            className={`text-base sm:text-lg font-semibold ${
                              openQuestion === item.question
                                ? 'text-indigo-700'
                                : 'text-gray-900'
                            }`}
                          >
                            {item.question}
                          </h3>
                        </div>
                        <div className='flex-shrink-0 mt-1'>
                          <svg
                            className={`w-5 h-5 transform transition-transform ${
                              openQuestion === item.question
                                ? 'rotate-180 text-indigo-600'
                                : 'text-gray-500'
                            }`}
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 9l-7 7-7-7'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openQuestion === item.question && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                      >
                        <div className='p-5 sm:p-6 text-gray-600'>
                          {item.answer.split('•').map(
                            (point, i) =>
                              point.trim() && (
                                <div
                                  key={i}
                                  className={`flex items-start ${
                                    i > 0 ? 'mt-2' : ''
                                  }`}
                                >
                                  {i > 0 && (
                                    <span className='mr-3 text-indigo-500'>
                                      •
                                    </span>
                                  )}
                                  <span>{point.trim()}</span>
                                </div>
                              )
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
