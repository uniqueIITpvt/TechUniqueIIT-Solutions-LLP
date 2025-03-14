import { AboutHero } from '@/components/About/AboutHero';
import { AboutMission } from '@/components/About/AboutMission';
import { AboutStory } from '@/components/About/AboutStory';
import { AboutValues } from '@/components/About/AboutValues';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

export default function AboutPage() {
  return (
    <main className='min-h-screen pt-16 bg-gradient-to-b from-white via-indigo-50/30 to-white'>
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutValues />
      <ServiceCTA />
    </main>
  );
}
