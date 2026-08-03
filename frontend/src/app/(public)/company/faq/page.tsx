import type { Metadata } from 'next';
import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { FaqHero } from '@/components/Faq/FaqHero';
import { FaqContent } from '@/components/Faq/FaqContent';

import { ServiceCTA } from '@/components/Services/ServiceCTA';

const title = 'FAQ';
const description =
  'Find answers about TechUniqueIIT Solutions LLP services, software development process, mobile app work, digital marketing support, maintenance, and project collaboration.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/company/faq',
  },
  openGraph: {
    title,
    description,
    url: '/company/faq',
  },
  twitter: {
    title,
    description,
  },
};

const faqSections = [
  {
    title: 'Services & Solutions',
    questions: [
      {
        question: 'What services does TechUniqueIIT offer?',
        answer:
          'TechUniqueIIT focuses on custom web and software development, software maintenance and code management, mobile app development, and digital marketing with social media management. For hosting, deployment, or infrastructure needs, we handle the required server and cloud work as part of a software delivery or maintenance scope.',
      },
      {
        question:
          'How does TechUniqueIIT approach digital marketing and branding?',
        answer:
          'We start by understanding the business, target audience, platforms, and current online presence. Based on that, we plan practical work such as social media management, YouTube channel support, SEO basics, content planning, campaign management, and performance review. The goal is steady brand visibility and useful lead generation, not generic posting.',
      },
      {
        question: 'Do you provide server and cloud support?',
        answer:
          'Yes. Server and cloud support is available when it is connected to a software project or an existing application maintenance engagement. This can include deployment, hosting setup, monitoring, backups, performance checks, and routine server maintenance for platforms such as AWS, Azure, Docker-based environments, or similar stacks.',
      },
    ],
  },
  {
    title: 'Technology & Delivery',
    questions: [
      {
        question:
          'What sets TechUniqueIIT apart in terms of software solutions?',
        answer:
          'We spend time understanding the business workflow before development starts. That helps us build software around real operations, not only screens. Our work usually includes clear planning, modern web and mobile stacks, practical architecture, testing, deployment support, and post-launch maintenance when needed.',
      },
      {
        question:
          'How does TechUniqueIIT approach website development and design?',
        answer:
          'For websites and web applications, we focus on responsive UI, clear user flows, performance, SEO-ready structure, maintainable code, and secure integrations. Depending on the project, we use technologies such as React, Next.js, Node.js, Python, .NET, MongoDB, PostgreSQL, MySQL, and Tailwind CSS.',
      },
    ],
  },
  {
    title: 'Business & Support',
    questions: [
      {
        question:
          'What makes TechUniqueIIT a practical technology partner for businesses?',
        answer:
          'A business can work with us for the full delivery cycle: requirement discussion, UI planning, development, deployment, maintenance, and digital growth support. This is useful for teams that want one accountable technical partner instead of coordinating separate vendors for every step.',
      },
      {
        question: 'How does TechUniqueIIT keep projects clear for clients?',
        answer:
          'We confirm requirements before major work begins, share progress during development, test key workflows, and take feedback before launch. For maintenance clients, we prioritize issues, explain tradeoffs, and keep the application stable with regular support.',
      },
      {
        question:
          'Can TechUniqueIIT accommodate specific business requirements?',
        answer:
          'Yes. Most of our software work is custom. We can adapt modules, dashboards, approval flows, user roles, reports, integrations, and deployment choices around the way your team actually works.',
      },
    ],
  },
  {
    title: 'Industries & Contact',
    questions: [
      {
        question: 'What industries does TechUniqueIIT serve?',
        answer:
          'We work with businesses and organizations that need practical software, mobile apps, system maintenance, or digital growth support. Past and current product focus areas include education platforms, HR workflows, sales commission management, business operations, and digital marketing.',
      },
      {
        question:
          'How can I get in touch with TechUniqueIIT for a project or collaboration?',
        answer:
          'You can contact TechUniqueIIT through the website contact form, email us at info@techuniqueiit.com, or call +91 7838758293. Share your requirement, timeline, and any existing system details so the team can respond with the right next step.',
      },
    ],
  },
];

const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSections.flatMap((section) =>
    section.questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          faqPageJsonLd,
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Company', path: '/company' },
            { name: 'FAQ', path: '/company/faq' },
          ]),
        ]}
      />
      <main className='min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white pt-16 pb-16 md:pb-0'>
        <FaqHero />
        <FaqContent sections={faqSections} />
        <ServiceCTA />
      </main>
    </>
  );
}
