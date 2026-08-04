'use client';

import { motion } from 'framer-motion';
import { businessProfile } from '@/data/businessProfile';

const privacySections = [
  {
    title: 'Information We Collect',
    content: [
      'Contact details such as your name, email address, phone number, company name, and project requirements when you submit an inquiry or request a consultation.',
      'Career application details such as resume files, role preferences, work experience, education, portfolio links, and interview communication when you apply for a position.',
      'Project and support details that you choose to share with us during software development, maintenance, mobile app, or digital marketing discussions.',
      'Basic website usage and technical data such as IP address, browser, device type, pages visited, timestamps, and form activity for security, diagnostics, analytics, and service improvement.',
      'Account or dashboard information only when an authorized user is given access to a protected area of our website or services.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'To respond to project inquiries, job applications, support requests, and other messages sent through our website or official contact channels.',
      'To understand your requirements, prepare proposals, schedule discussions, and deliver agreed services.',
      'To build, maintain, deploy, and support software products, websites, mobile applications, and digital marketing work requested by clients.',
      'To secure our website, diagnose technical issues, prevent misuse, improve performance, and maintain business records.',
      'To send service-related updates, follow-ups, or information you requested from TechUniqueIIT.',
    ],
  },
  {
    title: 'Sharing and Disclosure',
    content: [
      'We do not sell or rent your personal information.',
      'We may share limited information with trusted service providers such as hosting, email, analytics, file storage, communication, or security tools when needed to operate our website or deliver services.',
      'We may disclose information if required by law, regulation, legal process, or to protect our rights, users, systems, or business operations.',
      'When you ask us to work with a third-party platform, vendor, or integration for your project, we may share only the information required for that requested work.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'We use reasonable technical and organizational safeguards to protect information submitted through our website and service channels.',
      'Access to personal information is limited to team members or service providers who need it for a legitimate business purpose.',
      'We use secure infrastructure practices for forms, dashboards, file uploads, and hosted services under our control.',
      'No online system is completely risk-free, so we encourage users not to submit unnecessary sensitive information through general website forms.',
    ],
  },
  {
    title: 'Your Rights and Choices',
    content: [
      'You may request access, correction, update, or deletion of personal information you have shared with us, subject to applicable law and business record requirements.',
      'You may opt out of non-essential communications by contacting us or using the unsubscribe option where available.',
      'You can control cookies through your browser settings.',
      'Where consent is the basis for processing, you may withdraw consent for future processing by contacting us.',
      'For India-based users, we handle privacy requests in line with applicable Indian data protection requirements, including the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 where applicable.',
    ],
  },
  {
    title: 'Children Privacy',
    content: [
      'Our website and business services are intended for companies, professionals, applicants, and users who contact us for legitimate service inquiries.',
      'We do not knowingly collect personal information from children for marketing or sales purposes.',
      'If a parent or guardian believes a child has submitted personal information to us, they can contact us and request review or deletion.',
    ],
  },
  {
    title: 'Data Retention',
    content: [
      'We keep inquiry, support, and project communication records only for as long as needed for business, service, legal, or operational purposes.',
      'Career application data may be retained for recruitment review and future suitable openings unless deletion is requested.',
      'Analytics and technical logs may be retained for a limited period to maintain security, debug issues, and improve the website.',
    ],
  },
  {
    title: 'Cookies and Analytics',
    content: [
      'We may use essential cookies or similar technologies to keep the website working correctly.',
      'We may use analytics tools to understand traffic, page performance, and visitor behavior at an aggregated level.',
      'You can restrict or block cookies in your browser, but some website features may not work as expected.',
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      'We may update this Privacy Policy when our services, website features, legal obligations, or operating practices change.',
      'The updated version will be posted on this page with a revised last-updated date.',
      'Please review this page periodically if you use our website or services.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions about this Privacy Policy, please contact us:',
      `By email: ${businessProfile.email}`,
      `By phone: ${businessProfile.phoneDisplay}`,
      `By mail: ${businessProfile.locationDisplay}`,
      `For privacy-related requests, contact the TechUniqueIIT team at ${businessProfile.email}.`,
      'We aim to respond to privacy-related inquiries within a reasonable time based on the nature of the request.',
    ],
  },
];

export const PrivacyContent = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {privacySections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='mb-12'
            >
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                {section.title}
              </h2>
              <div className='space-y-4'>
                {section.content.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className='flex items-start space-x-3 text-gray-600'
                  >
                    <div className='w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2.5 flex-shrink-0' />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Additional Notes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className='mt-16 p-6 bg-gray-50 rounded-xl'
          >
            <p className='text-gray-600 text-sm'>
              This Privacy Policy explains how TechUniqueIIT collects, uses,
              shares, and protects information submitted through this website
              and related service communication channels.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
