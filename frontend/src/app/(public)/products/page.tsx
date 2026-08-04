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
          'A human resource management system for employee records, attendance, leave approvals, payroll inputs, performance reviews, HR reports, and role-based access workflows.',
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
  title: 'Our Products',
  description:
    'Explore TechUniqueIIT software products for learning management, ebook and audiobook publishing, HRMS operations, and sales commission management workflows.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    url: '/products',
  },
};