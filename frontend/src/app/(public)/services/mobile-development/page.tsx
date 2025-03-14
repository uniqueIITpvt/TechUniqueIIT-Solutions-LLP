import { ServiceDetailHero } from '@/components/Services/ServiceDetail/ServiceDetailHero';
import { ServiceFeatures } from '@/components/Services/ServiceDetail/ServiceFeatures';
import { ServiceTechnologies } from '@/components/Services/ServiceDetail/ServiceTechnologies';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

const mobileDevData = {
  title: 'Mobile Development',
  description:
    'Native and cross-platform mobile applications for iOS and Android',
  features: [
    {
      title: 'Native iOS Development',
      description: 'High-performance iOS apps using Swift and SwiftUI.',
      icon: '📱',
    },
    {
      title: 'Native Android Development',
      description: 'Robust Android apps using Kotlin and Jetpack Compose.',
      icon: '🤖',
    },
    {
      title: 'Cross-Platform Development',
      description: 'Cost-effective solutions using React Native and Flutter.',
      icon: '🔄',
    },
    {
      title: 'App Maintenance',
      description: 'Continuous support, updates, and performance optimization.',
      icon: '🛠️',
    },
  ],
  technologies: [
    'Swift',
    'SwiftUI',
    'Kotlin',
    'Jetpack Compose',
    'React Native',
    'Flutter',
    'Firebase',
    'App Store',
    'Play Store',
    'Analytics',
  ],
};

const mobileTechnologies = [
  'React Native',
  'Flutter',
  'Swift',
  'Swift UI',
  'Kotlin',
  'Firebase',
  'App Store',
  'Google Play',
  'Analytics',
  'Jetpack',
];

export default function MobileDevelopmentPage() {
  return (
    <div className='pt-16'>
      <ServiceDetailHero
        title={mobileDevData.title}
        description={mobileDevData.description}
      />
      <ServiceFeatures features={mobileDevData.features} />
      <ServiceTechnologies technologies={mobileTechnologies} />
      <ServiceCTA />
    </div>
  );
}
