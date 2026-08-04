import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { ServicesList } from '@/components/Services/ServicesList';
import { Testimonials } from '@/components/Home/Testimonials';
import { ServiceProcess } from '@/components/Services/ServiceProcess';
import { ServiceCTA } from '@/components/Services/ServiceCTA';
import { businessProfile } from '@/data/businessProfile';

const servicesUrl = `${businessProfile.siteUrl}/services`;

const servicesCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${servicesUrl}#webpage`,
  url: servicesUrl,
  name: 'TechUniqueIIT Services',
  description:
    'TechUniqueIIT services include custom software development, web applications, mobile apps, software maintenance, digital marketing, and SEO services.',
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
        <ServicesList />
        <Testimonials />
        <ServiceProcess />
        <ServiceCTA />
      </div>
    </>
  );
}

export const metadata = {
  title: 'TechUniqueIIT Services | Software Development & Digital Marketing',
  description:
    'Explore TechUniqueIIT services from TechUniqueIIT Solutions LLP, including custom software development, web applications, mobile apps, maintenance, digital marketing, and SEO services in Delhi.',
  keywords: [
    ...businessProfile.brandKeywords,
    ...businessProfile.priorityKeywords,
    'TechUniqueIIT services',
    'TechUniqueIIT software company services',
    'TechUniqueIIT Delhi services',
    'software development services Delhi',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'TechUniqueIIT Services | Software Development & Digital Marketing',
    description:
      'TechUniqueIIT services include custom software, web apps, mobile apps, maintenance, digital marketing, and SEO services for business growth.',
    url: '/services',
  },
};