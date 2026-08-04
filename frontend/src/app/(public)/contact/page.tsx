import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { ContactSection } from '@/components/Contact/ContactSection';
import { LocalSeoPanel } from '@/components/Contact/LocalSeoPanel';
import { businessProfile } from '@/data/businessProfile';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  businessProfile.siteUrl;

const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${businessProfile.name}`,
  url: new URL('/contact', siteUrl).toString(),
  about: {
    '@id': `${siteUrl}/#local-business`,
  },
  mainEntity: {
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#local-business`,
    name: businessProfile.name,
    url: siteUrl,
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
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          contactPageJsonLd,
        ]}
      />
      <main className='min-h-[calc(100vh-64px)] pt-10 sm:pt-15 lg:pt-20 relative bg-gradient-to-b from-white via-indigo-50/30 to-white'>
        {/* Contact Form Section */}
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative'>
          <div className='w-full max-w-7xl mx-auto'>
            <ContactSection />
          </div>
        </div>

        <LocalSeoPanel />

        {/* Decorative footer pattern */}
        <div className='absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-indigo-50/20 overflow-hidden pointer-events-none'>
          <div
            className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f91a_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f91a_1px,transparent_1px)] bg-[size:3rem_3rem]'
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
            }}
          />
        </div>
      </main>
    </>
  );
}

export const metadata = {
  title: 'Contact Us',
  description:
    'Contact TechUniqueIIT Solutions LLP in South Delhi for custom software development, mobile app development, software maintenance, digital marketing, and SEO services.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    url: '/contact',
  },
};