import { ServiceDetailHero } from '@/components/Services/ServiceDetail/ServiceDetailHero';
import { ServiceFeatures } from '@/components/Services/ServiceDetail/ServiceFeatures';
import { ServiceTechnologies } from '@/components/Services/ServiceDetail/ServiceTechnologies';
import { DevelopmentRoadmap } from '@/components/Services/ServiceDetail/DevelopmentRoadmap';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

const webDevData = {
  title: 'Web Development',
  description: 'Custom web applications built with cutting-edge technologies',
  features: [
    {
      title: 'Frontend Development',
      description:
        'Responsive and interactive user interfaces using React, Next.js, and modern web technologies.',
      icon: '🎨',
    },
    {
      title: 'Backend Development',
      description:
        'Scalable server-side solutions with Node.js, Python, and cloud technologies.',
      icon: '⚙️',
    },
    {
      title: 'E-commerce Solutions',
      description:
        'Custom online stores with secure payment integration and inventory management.',
      icon: '🛍️',
    },
    {
      title: 'API Development',
      description:
        'RESTful and GraphQL APIs for seamless data integration and communication.',
      icon: '🔄',
    },
  ],
  technologies: [
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'TypeScript',
    'GraphQL',
  ],
};

export default function WebDevelopmentPage() {
  return (
    <div className='pt-10'>
      <ServiceDetailHero
        title={webDevData.title}
        description={webDevData.description}
      />
      <ServiceFeatures features={webDevData.features} />
      <DevelopmentRoadmap />
      <ServiceTechnologies technologies={webDevData.technologies} />
      <ServiceCTA />
    </div>
  );
}
