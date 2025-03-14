import { ServiceDetailHero } from '@/components/Services/ServiceDetail/ServiceDetailHero';
import { ServiceFeatures } from '@/components/Services/ServiceDetail/ServiceFeatures';
import { ServiceTechnologies } from '@/components/Services/ServiceDetail/ServiceTechnologies';
import { ServiceCTA } from '@/components/Services/ServiceCTA';

const cloudSolutionsData = {
  title: 'Cloud Solutions',
  description:
    'Scalable and secure cloud infrastructure solutions for modern businesses',
  features: [
    {
      title: 'Cloud Infrastructure',
      description:
        'Design and implementation of scalable cloud architecture using AWS, Azure, or GCP.',
      icon: '☁️',
    },
    {
      title: 'DevOps & CI/CD',
      description:
        'Automated deployment pipelines and infrastructure as code for efficient delivery.',
      icon: '🔄',
    },
    {
      title: 'Cloud Security',
      description:
        'Implementation of robust security measures and compliance standards.',
      icon: '🔒',
    },
    {
      title: 'Containerization',
      description:
        'Docker and Kubernetes solutions for containerized application deployment.',
      icon: '📦',
    },
    {
      title: 'Monitoring & Logging',
      description:
        'Comprehensive monitoring solutions for performance and security.',
      icon: '📊',
    },
    {
      title: 'Cloud Cost Optimization',
      description:
        'Strategies and tools to optimize cloud spending and resource utilization.',
      icon: '💰',
    },
  ],
};

const cloudTechnologies = [
  'AWS',
  'Azure',
  'GCP',
  'Docker',
  'Kubernetes',
  'Terraform',
  'Jenkins',
  'GitLab',
  'Prometheus',
  'Grafana',
];

export default function CloudSolutionsPage() {
  return (
    <div className='pt-16'>
      <ServiceDetailHero
        title={cloudSolutionsData.title}
        description={cloudSolutionsData.description}
      />
      <ServiceFeatures features={cloudSolutionsData.features} />
      <ServiceTechnologies technologies={cloudTechnologies} />
      <ServiceCTA />
    </div>
  );
}
