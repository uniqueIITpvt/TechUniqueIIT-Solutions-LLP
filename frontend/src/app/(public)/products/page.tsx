import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { ProductsList } from '@/components/Products/ProductsList';
import { businessProfile } from '@/data/businessProfile';

const cloudinaryProductImage = (filename: string) =>
  `https://res.cloudinary.com/techuniqueiit/image/upload/product-images/${filename}`;

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
        image: cloudinaryProductImage('lms-portfolio.jpg'),
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
        image: cloudinaryProductImage('ebook-portfolio.jpg'),
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
        name: 'Restaurant Food Ordering & Delivery Platform',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://www.techuniqueiit.com/products',
        image: cloudinaryProductImage('restaurant-ordering-platform.jpg'),
        description:
          'A FoodTech web ordering product for restaurant storefronts, menu browsing, dish customization, cart workflows, customer authentication, and checkout-ready ordering experiences.',
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
        name: 'HRMS - Human Resource Management System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://www.techuniqueiit.com/products',
        image: cloudinaryProductImage('HRMS-portfolio.jpg'),
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
      position: 5,
      item: {
        '@type': 'SoftwareApplication',
        name: 'SCMS - Sales Commission Management System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://www.techuniqueiit.com/products',
        image: cloudinaryProductImage('SCMS-portfolio.jpg'),
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
  title: 'HRMS, LMS & Food Ordering Software Products | TechUniqueIIT',
  description:
    'Explore TechUniqueIIT software products including HRMS workflows, LMS examples, restaurant food ordering platforms, ebook publishing, and sales commission management systems.',
  keywords: [
    ...businessProfile.priorityKeywords,
    'HRMS software development company',
    'LMS development company India',
    'restaurant food ordering platform',
    'online food ordering website development',
    'learning management system development',
    'human resource management software development',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'HRMS, LMS & Food Ordering Software Products | TechUniqueIIT',
    description:
      'Explore HRMS, LMS, FoodTech ordering, ebook, and sales software product examples from TechUniqueIIT Solutions LLP.',
    url: '/products',
  },
};
