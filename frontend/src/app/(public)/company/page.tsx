import { CompanyHero } from '@/components/Company/CompanyHero';
import { CompanyMission } from '@/components/Company/CompanyMission';
import { CompanyOffices } from '@/components/Company/CompanyOffices';
import { CompanyTeam } from '@/components/Company/CompanyTeam';
import { CompanyExpertise } from '@/components/Company/CompanyExpertise';
import { CompanyJourney } from '@/components/Company/CompanyJourney';
import { Testimonials } from '@/components/Home/Testimonials';

export default function CompanyPage() {
  return (
    <div className='pt-16'>
      <CompanyHero />
      <CompanyMission />
      <CompanyExpertise />
      <CompanyJourney />
      <CompanyTeam />
      <CompanyOffices />
      <Testimonials />
    </div>
  );
}
