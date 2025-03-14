import { CompanyHero } from '@/components/Company/CompanyHero';
import { CompanyMission } from '@/components/Company/CompanyMission';
import { CompanyStats } from '@/components/Company/CompanyStats';
import { CompanyOffices } from '@/components/Company/CompanyOffices';
import { CompanyPartners } from '@/components/Company/CompanyPartners';
import { CompanyTeam } from '@/components/Company/CompanyTeam';

export default function CompanyPage() {
  return (
    <div className='pt-16'>
      <CompanyHero />
      <CompanyMission />
      <CompanyStats />
      <CompanyTeam />
      <CompanyOffices />
      <CompanyPartners />
    </div>
  );
}
