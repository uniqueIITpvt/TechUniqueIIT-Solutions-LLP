import type { Metadata } from 'next';
import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { CareersHero } from '@/components/Careers/CareersHero';
import { OpenPositions } from '@/components/Careers/OpenPositions';
import { CompanyBenefits } from '@/components/Careers/CompanyBenefits';
import { businessProfile } from '@/data/businessProfile';

const title = 'TechUniqueIIT Careers';
const description =
  'Explore TechUniqueIIT careers at TechUniqueIIT Solutions LLP and work on web, mobile, software maintenance, and digital technology projects with a practical delivery team in Delhi.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    ...businessProfile.brandKeywords,
    'TechUniqueIIT careers',
    'TechUniqueIIT jobs',
    'software company careers Delhi',
  ],
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title,
    description,
    url: '/careers',
  },
  twitter: {
    title,
    description,
  },
};

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
        ])}
      />
      <div className='pt-16 pb-16 md:pb-0'>
        <CareersHero />
        <CompanyBenefits />
        <OpenPositions />
      </div>
    </>
  );
}