import { JsonLd, buildBreadcrumbJsonLd } from '@/components/SEO/JsonLd';
import { CompanyHero } from '@/components/Company/CompanyHero';
import { CompanyMission } from '@/components/Company/CompanyMission';
import { CompanyOffices } from '@/components/Company/CompanyOffices';
import { CompanyTeam } from '@/components/Company/CompanyTeam';
import { CompanyExpertise } from '@/components/Company/CompanyExpertise';
import { CompanyJourney } from '@/components/Company/CompanyJourney';
import { Testimonials } from '@/components/Home/Testimonials';
import { businessProfile } from '@/data/businessProfile';

export default function CompanyPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Company', path: '/company' },
        ])}
      />
      <div className='pt-16'>
        <CompanyHero />
        <CompanyMission />
        <CompanyExpertise />
        <CompanyJourney />
        <CompanyTeam />
        <CompanyOffices />
        <Testimonials />
      </div>
    </>
  );
}

export const metadata = {
  title: 'TechUniqueIIT Company | Software Company in Delhi',
  description:
    'Learn about TechUniqueIIT Solutions LLP, also searched as Tech Unique IIT, a Delhi software company for development services, careers, and client reviews.',
  keywords: [
    ...businessProfile.brandKeywords,
    'TechUniqueIIT Delhi',
    'TechUniqueIIT software company',
    'TechUniqueIIT reviews',
  ],
  alternates: {
    canonical: '/company',
  },
  openGraph: {
    title: 'TechUniqueIIT Company | Software Company in Delhi',
    description:
      'About TechUniqueIIT Solutions LLP, a Delhi software company for services, careers, and client reviews.',
    url: '/company',
  },
};