import type { Metadata } from 'next';
import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { PrivacyHero } from '@/components/Privacy/PrivacyHero';
import { PrivacyContent } from '@/components/Privacy/PrivacyContent';

const title = 'Privacy Policy';
const description =
  'Read the TechUniqueIIT Solutions LLP privacy policy covering information collection, use, data security, retention, cookies, and contact details for privacy requests.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/company/privacy',
  },
  openGraph: {
    title,
    description,
    url: '/company/privacy',
  },
  twitter: {
    title,
    description,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Company', path: '/company' },
          { name: 'Privacy Policy', path: '/company/privacy' },
        ])}
      />
      <div className='pt-16'>
        <PrivacyHero />
        <PrivacyContent />
      </div>
    </>
  );
}