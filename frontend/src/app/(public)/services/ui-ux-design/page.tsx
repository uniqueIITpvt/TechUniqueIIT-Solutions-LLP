import { ServiceDetailHero } from '@/components/Services/ServiceDetail/ServiceDetailHero';
import { ServiceFeatures } from '@/components/Services/ServiceDetail/ServiceFeatures';
import { ServiceTechnologies } from '@/components/Services/ServiceDetail/ServiceTechnologies';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

const uiUxDesignData = {
  title: 'UI/UX Design',
  description:
    'Creating intuitive and engaging digital experiences that users love',
  features: [
    {
      title: 'User Research & Analysis',
      description:
        'Understanding user needs, behaviors, and pain points through comprehensive research.',
      icon: '🔍',
    },
    {
      title: 'User Interface Design',
      description:
        'Creating visually stunning and functional interfaces that align with brand identity.',
      icon: '🎨',
    },
    {
      title: 'User Experience Design',
      description:
        'Crafting seamless user journeys and interactions across all touchpoints.',
      icon: '🔄',
    },
    {
      title: 'Prototyping & Testing',
      description:
        'Validating designs through interactive prototypes and user testing.',
      icon: '⚡',
    },
    {
      title: 'Design Systems',
      description:
        'Building scalable and consistent design systems for efficient development.',
      icon: '📐',
    },
    {
      title: 'Responsive Design',
      description:
        'Ensuring optimal user experience across all devices and screen sizes.',
      icon: '📱',
    },
  ],
};

const designTechnologies = [
  'Figma',
  'Adobe XD',
  'Sketch',
  'Photoshop',
  'Illustrator',
  'InVision',
  'Principle',
  'Framer',
  'Zeplin',
  'Webflow',
];

export default function UiUxDesignPage() {
  return (
    <div className='pt-16'>
      <ServiceDetailHero
        title={uiUxDesignData.title}
        description={uiUxDesignData.description}
      />
      <ServiceFeatures features={uiUxDesignData.features} />
      <ServiceTechnologies technologies={designTechnologies} />
      <ServiceCTA />
    </div>
  );
}
