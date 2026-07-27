import { CareersHero } from '@/components/Careers/CareersHero';
import { OpenPositions } from '@/components/Careers/OpenPositions';
import { CompanyBenefits } from '@/components/Careers/CompanyBenefits';

export default function CareersPage() {
  return (
    <div className='pt-16 pb-16 md:pb-0'>
      <CareersHero />
      <CompanyBenefits />
      <OpenPositions />
    </div>
  );
}
