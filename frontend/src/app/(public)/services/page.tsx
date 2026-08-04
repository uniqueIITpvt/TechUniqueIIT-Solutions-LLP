import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { ServicesList } from '@/components/Services/ServicesList';
import { Testimonials } from '@/components/Home/Testimonials';
import { ServiceProcess } from '@/components/Services/ServiceProcess';
import { ServiceCTA } from '@/components/Services/ServiceCTA';
import { businessProfile } from '@/data/businessProfile';
import { servicePages } from '@/data/servicePages';

const servicesUrl = `${businessProfile.siteUrl}/services`;

const servicesCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${servicesUrl}#webpage`,
  url: servicesUrl,
  name: 'Software Development and Digital Marketing Services',
  description:
    'Custom software development, web application development, mobile app development, software maintenance, digital marketing, and SEO services by TechUniqueIIT Solutions LLP.',
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${businessProfile.siteUrl}/#website`,
    url: businessProfile.siteUrl,
    name: businessProfile.name,
  },
  provider: {
    '@type': 'Organization',
    '@id': `${businessProfile.siteUrl}/#organization`,
    name: businessProfile.name,
    url: businessProfile.siteUrl,
    telephone: businessProfile.telephone,
    email: businessProfile.email,
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'TechUniqueIIT service catalog',
    numberOfItems: servicePages.length,
    itemListElement: servicePages.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.shortTitle,
      url: `${businessProfile.siteUrl}/services/${service.slug}`,
      item: {
        '@type': 'Service',
        '@id': `${businessProfile.siteUrl}/services/${service.slug}#service`,
        name: service.title,
        alternateName: service.shortTitle,
        serviceType: service.primaryKeywords[0],
        description: service.description,
        url: `${businessProfile.siteUrl}/services/${service.slug}`,
        areaServed: businessProfile.serviceAreas.map((area) => ({
          '@type': 'Place',
          name: area,
        })),
        provider: {
          '@type': 'Organization',
          '@id': `${businessProfile.siteUrl}/#organization`,
          name: businessProfile.name,
          url: businessProfile.siteUrl,
        },
      },
    })),
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          servicesCollectionJsonLd,
        ]}
      />
      <div className='pt-5 pb-16 md:pb-0'>
        {/* Services Overview & Cards */}
        <ServicesList />

        {/* Reusable Client Testimonials for immediate trust & credibility */}
        <Testimonials />

        {/* Process & CTA */}
        <ServiceProcess />
        <ServiceCTA />
      </div>
    </>
  );
}

export const metadata = {
  title: 'Software Development & Digital Marketing Services',
  description:
    'Explore custom software development, web application development, mobile app development, software maintenance, digital marketing, and SEO services from TechUniqueIIT Solutions LLP.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Software Development & Digital Marketing Services',
    description:
      'Custom software, web apps, mobile apps, software maintenance, digital marketing, and SEO services for business growth.',
    url: '/services',
  },
};
