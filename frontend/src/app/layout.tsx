import type { Metadata } from 'next';
import '@/app/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { JsonLd } from '@/components/SEO/JsonLd';
import { businessProfile } from '@/data/businessProfile';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.techuniqueiit.com';

const defaultTitle =
  'Software Development Company in Delhi NCR | TechUniqueIIT';
const defaultDescription =
  'TechUniqueIIT is a software development company in Delhi NCR providing custom software, web applications, mobile apps, cloud solutions, UI/UX design and application maintenance services.';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: businessProfile.name,
  alternateName: businessProfile.alternateNames,
  inLanguage: 'en-IN',
  publisher: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: businessProfile.name,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: businessProfile.name,
  legalName: businessProfile.name,
  alternateName: businessProfile.alternateNames,
  description: defaultDescription,
  url: siteUrl,
  logo: new URL('/techuniqueiit-new-logo.svg', siteUrl).toString(),
  email: businessProfile.email,
  telephone: businessProfile.telephone,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: businessProfile.telephone,
    email: businessProfile.email,
    contactType: 'customer support',
    areaServed: businessProfile.addressCountry,
    availableLanguage: businessProfile.languages,
  },
};

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#local-business`,
  name: businessProfile.name,
  alternateName: businessProfile.alternateNames,
  description: defaultDescription,
  url: siteUrl,
  image: new URL('/hero-image.jpg', siteUrl).toString(),
  logo: new URL('/techuniqueiit-new-logo.svg', siteUrl).toString(),
  email: businessProfile.email,
  telephone: businessProfile.telephone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: businessProfile.addressLocality,
    addressRegion: businessProfile.addressRegion,
    addressCountry: businessProfile.addressCountry,
  },
  areaServed: businessProfile.serviceAreas.map((area) => ({
    '@type': area === 'India' ? 'Country' : 'Place',
    name: area,
  })),
  availableLanguage: businessProfile.languages,
  serviceType: businessProfile.services,

  knowsAbout: [
    ...businessProfile.services,
    ...businessProfile.brandKeywords,
    ...businessProfile.priorityKeywords,
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'TechUniqueIIT Services',
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
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Services',
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
    ...businessProfile.priorityKeywords,
    ...businessProfile.brandKeywords,
    'TechUniqueIIT Solutions LLP',
    'custom software development India',
    'web application development',
    'mobile app development',
    'software maintenance',
    'digital marketing services',
    'South Delhi IT company',
    'software development company Delhi NCR',
    'web application development South Delhi',
    'SEO services Delhi',
    'cloud solutions company Delhi NCR',
    'UI UX design services Delhi NCR',
    'application maintenance services Delhi NCR',
  ],
  authors: [{ name: businessProfile.name, url: siteUrl }],
  creator: businessProfile.name,
  publisher: businessProfile.name,
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
        alt: 'TechUniqueIIT software development company in Delhi NCR for custom software, web applications, mobile apps, cloud solutions, UI UX design, and application maintenance',
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
        <JsonLd data={[websiteJsonLd, organizationJsonLd, professionalServiceJsonLd]} />
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