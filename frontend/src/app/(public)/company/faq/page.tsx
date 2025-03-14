import { FaqHero } from '@/components/Faq/FaqHero';
import { FaqContent } from '@/components/Faq/FaqContent';

import { ServiceCTA } from '@/components/Services/ServiceCTA';

const faqSections = [
  {
    title: 'Services & Solutions',
    questions: [
      {
        question: 'What services does TechUniqueIIT offer?',
        answer: `We offer a comprehensive range of digital solutions including:
          • Web Development & Design
          • Mobile App Development
          • Cloud Infrastructure Services
          • UI/UX Design
          • Digital Marketing & Branding
          • AI & Machine Learning Solutions
          • DevOps Services
          • IT Consulting`,
      },
      {
        question:
          'How does TechUniqueIIT approach digital marketing and branding?',
        answer: `Our digital marketing and branding approach is data-driven and results-focused. We create customized strategies that include:
          • SEO and Content Marketing
          • Social Media Management
          • Brand Identity Development
          • Performance Marketing
          • Analytics and Reporting
          • Influencer Marketing
          • Email Marketing Campaigns`,
      },
      {
        question: 'Can you elaborate on your cloud infrastructure services?',
        answer: `Our cloud infrastructure services include:
          • Cloud Migration & Integration
          • Cloud Architecture Design
          • AWS/Azure/GCP Solutions
          • Cloud Security Implementation
          • Performance Optimization
          • 24/7 Monitoring & Support
          • Disaster Recovery Planning`,
      },
    ],
  },
  {
    title: 'Technology & Innovation',
    questions: [
      {
        question:
          'What sets TechUniqueIIT apart in terms of software solutions?',
        answer: `We distinguish ourselves through:
          • Cutting-edge Technology Stack
          • Custom Software Development
          • Agile Development Methodology
          • Scalable Architecture
          • Robust Security Measures
          • Continuous Innovation
          • Quality Assurance`,
      },
      {
        question:
          'How does TechUniqueIIT approach website development and design?',
        answer: `Our website development approach focuses on:
          • Responsive Design
          • User-Centric Development
          • Performance Optimization
          • SEO-Friendly Architecture
          • Modern Technologies (React, Next.js)
          • Regular Maintenance
          • Security Implementation`,
      },
    ],
  },
  {
    title: 'Business & Support',
    questions: [
      {
        question:
          'What makes TechUniqueIIT a one-stop solution for businesses seeking technological advancement?',
        answer: `We offer comprehensive end-to-end solutions including:
          • Strategic IT Consulting
          • Custom Development
          • Digital Transformation
          • Ongoing Support & Maintenance
          • Technology Stack Integration
          • Scalable Solutions
          • Innovation Leadership`,
      },
      {
        question: 'How does TechUniqueIIT ensure client satisfaction?',
        answer: `We ensure client satisfaction through:
          • Regular Communication
          • Transparent Project Management
          • Quality Deliverables
          • Timely Support
          • Performance Monitoring
          • Client Feedback Integration
          • Continuous Improvement`,
      },
      {
        question:
          'Can TechUniqueIIT accommodate specific business requirements?',
        answer: `Yes, we offer customized solutions tailored to specific business needs:
          • Requirement Analysis
          • Custom Development
          • Flexible Engagement Models
          • Scalable Solutions
          • Industry-Specific Compliance
          • Integration Capabilities`,
      },
    ],
  },
  {
    title: 'Industries & Contact',
    questions: [
      {
        question: 'What industries does TechUniqueIIT cater to?',
        answer: `We serve various industries including:
          • E-commerce & Retail
          • Healthcare & Medical
          • Finance & Banking
          • Education & E-learning
          • Manufacturing
          • Real Estate
          • Technology & Software
          • Startups & SMEs`,
      },
      {
        question:
          'How can I get in touch with TechUniqueIIT for further inquiries or collaboration?',
        answer: `You can reach us through multiple channels:
          • Contact Form on our Website
          • Email: info@techuniqueiit.com
          • Phone: +91 7838758293
          • Schedule a Consultation
          • Visit our Office
          • Social Media Platforms`,
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className='min-h-screen pt-16 bg-gradient-to-b from-white via-indigo-50/30 to-white'>
      <FaqHero />
      <FaqContent sections={faqSections} />
      <ServiceCTA />
    </main>
  );
}
