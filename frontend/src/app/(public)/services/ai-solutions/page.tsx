import { AIHero } from '@/components/Services/AISolutions/AIHero';
import { AIFeatures } from '@/components/Services/AISolutions/AIFeatures';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

export default function AISolutionsPage() {
  return (
    <main className='min-h-screen pt-16 bg-gradient-to-b from-white via-indigo-50/30 to-white'>
      <AIHero />
      <AIFeatures />
      <ServiceCTA />
    </main>
  );
}
