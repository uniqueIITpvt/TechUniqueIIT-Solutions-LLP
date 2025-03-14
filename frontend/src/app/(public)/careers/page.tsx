import { CareersHero } from '@/components/Careers/CareersHero';
import { OpenPositions } from '@/components/Careers/OpenPositions';
import { CompanyBenefits } from '@/components/Careers/CompanyBenefits';
import { CompanyCulture } from '@/components/Careers/CompanyCulture';
import { JoinTeam } from '@/components/Careers/JoinTeam';

export default function CareersPage() {
  return (
    <div className='pt-16'>
      <CareersHero />
      <CompanyBenefits />
      <OpenPositions />
      <CompanyCulture />
      <JoinTeam />
    </div>
  );
}
