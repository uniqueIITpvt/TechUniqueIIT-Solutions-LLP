import type { Metadata } from 'next';
import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { CareersHero } from '@/components/Careers/CareersHero';
import { OpenPositions } from '@/components/Careers/OpenPositions';
import { CompanyBenefits } from '@/components/Careers/CompanyBenefits';

const title = 'Careers';
const description =
  'Explore career opportunities at TechUniqueIIT Solutions LLP and work on web, mobile, software maintenance, and digital technology projects with a practical delivery team.';

export const metadata: Metadata = {
  title,
  description,
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