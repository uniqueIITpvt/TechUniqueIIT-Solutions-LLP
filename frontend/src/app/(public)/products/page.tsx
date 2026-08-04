import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { ProductsList } from '@/components/Products/ProductsList';
import { businessProfile } from '@/data/businessProfile';

const productsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'TechUniqueIIT Software Products',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'SoftwareApplication',
        name: 'UniqueIIT Learning Management System (LMS)',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        url: 'https://www.techuniqueiit.com/products',
        image: 'https://www.techuniqueiit.com/images/products/lms-portfolio.jpg',
        description:
          'LMS development company India product example: a full-stack learning management system for courses, student access, purchases, reviews, and progress tracking.',
        provider: {
          '@type': 'Organization',
          name: 'TechUniqueIIT Solutions LLP',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'SoftwareApplication',
        name: 'UniqueIIT Ebook & Audiobook Platform',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        url: 'https://www.techuniqueiit.com/products',
        image: 'https://www.techuniqueiit.com/images/products/ebook-portfolio.jpg',
        description:
          'A digital content platform for ebooks, audiobooks, summaries, subscriptions, purchases, and cross-device progress sync.',
        provider: {
          '@type': 'Organization',
          name: 'TechUniqueIIT Solutions LLP',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'SoftwareApplication',
        name: 'HRMS - Human Resource Management System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://www.techuniqueiit.com/products',
        image: 'https://www.techuniqueiit.com/images/products/HRMS-portfolio.jpg',
        description:
          'HRMS software development company product example for employee records, attendance, leave approvals, payroll inputs, performance reviews, HR reports, and role-based access workflows.',
        provider: {
          '@type': 'Organization',
          name: 'TechUniqueIIT Solutions LLP',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'SoftwareApplication',
        name: 'SCMS - Sales Commission Management System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://www.techuniqueiit.com/products',
        image: 'https://www.techuniqueiit.com/images/products/SCMS-portfolio.jpg',
        description:
          'A sales commission management system for commission rules, agent performance tracking, payout calculations, approval workflows, export-ready reports, and audit trails.',
        provider: {
          '@type': 'Organization',
          name: 'TechUniqueIIT Solutions LLP',
        },
      },
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          productsJsonLd,
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
          ]),
        ]}
      />
      <div className='pt-5 pb-16 md:pb-0'>
        <ProductsList />
      </div>
    </>
  );
}

export const metadata = {
  title: 'HRMS & LMS Software Products | TechUniqueIIT Solutions',
  description:
    'Explore TechUniqueIIT software products including HRMS software development company workflows, LMS development company India examples, ebook publishing, and sales commission management systems.',
  keywords: [
    ...businessProfile.priorityKeywords,
    'HRMS software development company',
    'LMS development company India',
    'learning management system development',
    'human resource management software development',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'HRMS & LMS Software Products | TechUniqueIIT Solutions',
    description:
      'Explore HRMS and LMS software product examples from TechUniqueIIT Solutions LLP.',
    url: '/products',
  },
};