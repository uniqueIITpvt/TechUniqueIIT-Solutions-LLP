import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { ProductsList } from '@/components/Products/ProductsList';

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
          'A full-stack learning management system for courses, student access, purchases, reviews, and progress tracking.',
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
          'A human resource management system for employee lifecycle management, attendance, payroll, leave workflows, and performance reviews.',
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
          'A sales commission management system for commission structures, agent performance tracking, payout reports, and approval workflows.',
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
  title: 'Our Products',
  description:
    'Explore ready-to-deploy enterprise software products by TechUniqueIIT: HRMS, LMS (Learning Management System), and Tour & Travel Management ERP.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    url: '/products',
  },
};