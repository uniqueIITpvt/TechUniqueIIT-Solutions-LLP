'use client';

import { motion } from 'framer-motion';

const privacySections = [
  {
    title: 'Information We Collect',
    content: [
      'Personal information such as name, email address, and contact details when you create an account or contact us.',
      'Usage data including IP address, browser type, device information, and interaction with our services.',
      'Cookies and similar tracking technologies to enhance your experience and analyze service usage.',
      'Payment information when you make purchases (processed securely through our payment providers).',
      'Communications data including your interactions with our support team.',
      'Technical data such as login information, time zone setting, and platform preferences.',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'To provide and maintain our services',
      'To notify you about changes to our services',
      'To provide customer support and respond to your requests',
      'To gather analysis or valuable information to improve our services',
      'To monitor the usage of our services',
      'To detect, prevent and address technical issues',
      'To process your transactions and send related information',
      'To send you technical notices, updates, and security alerts',
      'To provide news, special offers, and general information about our services',
    ],
  },
  {
    title: 'Information Sharing and Disclosure',
    content: [
      'We do not sell or rent your personal information to third parties.',
      'We may share your information with service providers who assist in delivering our services.',
      'We may disclose information if required by law or to protect our rights and safety.',
      'Business transfers: If we are involved in a merger or acquisition, your information may be transferred.',
      'With your consent: We may share your information with third parties when you explicitly consent.',
      'Aggregated data: We may share anonymized, aggregated information for business purposes.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'We implement appropriate security measures to protect against unauthorized access.',
      'We regularly review our security practices and update them as needed.',
      'We use encryption to protect sensitive information transmitted online.',
      'We restrict access to personal information to employees who need it.',
      'We maintain physical, electronic, and procedural safeguards.',
      'We conduct regular security assessments and penetration testing.',
      'We have incident response procedures in place for potential data breaches.',
    ],
  },
  {
    title: 'Your Rights and Choices',
    content: [
      'Access, update, or delete your personal information',
      'Opt-out of marketing communications',
      'Set your browser to refuse cookies',
      'Request data portability',
      'Withdraw consent where applicable',
      'Object to processing of your personal data',
      'Request restriction of processing your personal data',
      'Right to be informed about your data collection and use',
      'Right to lodge a complaint with a supervisory authority',
    ],
  },
  {
    title: 'Childrens Privacy',
    content: [
      'Our services are not intended for children under 13 years of age.',
      'We do not knowingly collect personal information from children.',
      'If we discover we have collected childrens personal information, we will delete it.',
      'Parents can review, delete, or refuse further collection of their childrens information.',
      'We encourage parents to supervise their childrens online activities.',
    ],
  },
  {
    title: 'International Data Transfers',
    content: [
      'Your information may be transferred to and processed in countries other than your residence.',
      'We ensure appropriate safeguards are in place for international transfers.',
      'We comply with applicable laws regarding international data transfers.',
      'We implement standard contractual clauses where necessary.',
      'You consent to these transfers by using our services.',
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      'We may update our Privacy Policy from time to time.',
      'We will notify you of any changes by posting the new Privacy Policy on this page.',
      'You are advised to review this Privacy Policy periodically for any changes.',
      'Material changes will be communicated directly to users when possible.',
      'Continued use of our services after changes constitutes acceptance.',
    ],
  },
  {
    title: 'Cookie Policy',
    content: [
      'We use essential cookies to ensure basic functionality of our website.',
      'Analytics cookies help us understand how you use our services.',
      'Marketing cookies are used to provide you with relevant advertising.',
      'You can control cookie preferences through your browser settings.',
      'Third-party cookies may be placed by our partners and service providers.',
    ],
  },
  {
    title: 'Contact Us',
    content: [
      'If you have any questions about this Privacy Policy, please contact us:',
      'By email: privacy@company.com',
      'By phone: 1-800-123-4567',
      'By mail: 123 Privacy Street, San Francisco, CA 94105',
      'Our Data Protection Officer can be reached at dpo@company.com',
      'Response time: We aim to respond to all privacy-related inquiries within 48 hours.',
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
                    <div className='w-1.5 h-1.5 rounded-full bg-blue-600 mt-2.5 flex-shrink-0' />
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
              This privacy policy is intended to help you understand how we
              collect, use, and safeguard your information. By using our
              services, you agree to the collection and use of information in
              accordance with this policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
