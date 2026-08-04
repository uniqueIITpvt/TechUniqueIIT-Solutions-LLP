import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { ServiceLandingPage } from '@/components/Services/ServiceLandingPage';
import { getServicePage, servicePages } from '@/data/servicePages';

const DEFAULT_SITE_URL = 'https://www.techuniqueiit.com';

type PageProps = {
  params: {
    slug: string;
  };
};

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

const getSiteUrl = () => {
  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      DEFAULT_SITE_URL
  );
};

export function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getServicePage(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/services/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.description,
    alternates: {
      canonical: canonicalPath,
    },
    keywords: service.primaryKeywords,
    openGraph: {
      title: service.metaTitle,
      description: service.description,
      url: canonicalPath,
    },
    twitter: {
      title: service.metaTitle,
      description: service.description,
    },
  };
}

const buildServiceJsonLd = (service: NonNullable<ReturnType<typeof getServicePage>>) => {
  const siteUrl = getSiteUrl();
  const serviceUrl = new URL(`/services/${service.slug}`, siteUrl).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      name: 'TechUniqueIIT Solutions LLP',
      url: siteUrl,
      email: 'info@techuniqueiit.com',
      telephone: '+91 7838758293',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: service.shortTitle,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: serviceUrl,
    },
  };
};

const buildFaqJsonLd = (service: NonNullable<ReturnType<typeof getServicePage>>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: service.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export default function ServiceDetailPage({ params }: PageProps) {
  const service = getServicePage(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          buildServiceJsonLd(service),
          buildFaqJsonLd(service),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.shortTitle, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <ServiceLandingPage service={service} />
    </>
  );
}
