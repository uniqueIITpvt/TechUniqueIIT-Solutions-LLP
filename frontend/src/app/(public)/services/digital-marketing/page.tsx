import { DigitalMarketingFeatures } from '@/components/Services/DigitalMarketing/DigitalMarketingFeatures';
import { DigitalMarketingHero } from '@/components/Services/DigitalMarketing/DigitalMarketingHero';
import { DigitalMarketingProcess } from '@/components/Services/DigitalMarketing/DigitalMarketingProcess';
import { ServiceCTA } from '@/components/Services/ServiceCTA';
import { YouTubeBranding } from '@/components/Services/DigitalMarketing/YouTubeBranding';

export default function DigitalMarketingPage() {
  return (
    <main className='min-h-screen pt-16 bg-gradient-to-b from-white via-indigo-50/30 to-white'>
      <DigitalMarketingHero />
      <YouTubeBranding />
      <DigitalMarketingFeatures />
      <DigitalMarketingProcess />
      <ServiceCTA />
    </main>
  );
}
