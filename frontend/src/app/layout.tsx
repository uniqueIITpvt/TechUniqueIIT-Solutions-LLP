import type { Metadata } from 'next';
import '@/app/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { JsonLd } from '@/components/SEO/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.techuniqueiit.com';

const defaultTitle =
  'TechUniqueIIT Solutions LLP | Custom Software, Mobile Apps & Digital Marketing';
const defaultDescription =
  'TechUniqueIIT Solutions LLP builds custom software, web applications, mobile apps, maintenance solutions, and digital marketing support for businesses in India.';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TechUniqueIIT Solutions LLP',
  url: siteUrl,
  logo: new URL('/techuniqueiit-new-logo.svg', siteUrl).toString(),
  email: 'info@techuniqueiit.com',
  telephone: '+91 7838758293',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 7838758293',
    email: 'info@techuniqueiit.com',
    contactType: 'customer support',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
};

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TechUniqueIIT Solutions LLP',
  url: siteUrl,
  image: new URL('/hero-image.jpg', siteUrl).toString(),
  logo: new URL('/techuniqueiit-new-logo.svg', siteUrl).toString(),
  email: 'info@techuniqueiit.com',
  telephone: '+91 7838758293',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'South Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  serviceType: [
    'Custom software development',
    'Web application development',
    'Mobile app development',
    'Software maintenance',
    'Digital marketing',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Technology Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Web & Software Development',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Software Maintenance & Code Management',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Marketing & Social Media Management',
        },
      },
    ],
  },
};
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'TechUniqueIIT',
  title: {
    default: defaultTitle,
    template: '%s | TechUniqueIIT Solutions',
  },
  description: defaultDescription,
  keywords: [
    'TechUniqueIIT',
    'TechUniqueIIT Solutions LLP',
    'custom software development India',
    'web application development',
    'mobile app development',
    'software maintenance',
    'digital marketing services',
    'South Delhi IT company',
  ],
  authors: [{ name: 'TechUniqueIIT Solutions LLP', url: siteUrl }],
  creator: 'TechUniqueIIT Solutions LLP',
  publisher: 'TechUniqueIIT Solutions LLP',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'TechUniqueIIT Solutions LLP',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'TechUniqueIIT Solutions LLP custom software, mobile apps, and digital marketing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <JsonLd data={[organizationJsonLd, professionalServiceJsonLd]} />
        <AuthProvider>{children}</AuthProvider>
        <Toaster
          position='top-center'
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#22c55e',
                color: '#fff',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
