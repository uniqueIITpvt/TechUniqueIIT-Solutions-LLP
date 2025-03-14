'use client';

import Image from 'next/image';

type TechIconType = {
  [key: string]: React.ReactNode;
};

export const TechStackIcons: TechIconType = {
  'Next.js': (
    <Image src='/tech-logos/next-js.svg' alt='Next.js' width={40} height={40} />
  ),
  React: (
    <Image src='/tech-logos/react-2.svg' alt='React' width={40} height={40} />
  ),
  TypeScript: (
    <Image
      src='/tech-logos/typescript-2.svg'
      alt='TypeScript'
      width={40}
      height={40}
    />
  ),
  'Node.js': (
    <Image
      src='/tech-logos/nodejs-3.svg'
      alt='Node.js'
      width={40}
      height={40}
    />
  ),
  Python: (
    <Image src='/tech-logos/python-5.svg' alt='Python' width={40} height={40} />
  ),
  PostgreSQL: (
    <Image
      src='/tech-logos/postgresql.svg'
      alt='PostgreSQL'
      width={40}
      height={40}
    />
  ),
  MongoDB: (
    <Image
      src='/tech-logos/mongodb-icon-1.svg'
      alt='MongoDB'
      width={40}
      height={40}
    />
  ),
  GraphQL: (
    <Image
      src='/tech-logos/graphql-logo-2.svg'
      alt='GraphQL'
      width={40}
      height={40}
    />
  ),
  Docker: (
    <Image
      src='/tech-logos/cloud-logo/docker-4.svg'
      alt='Docker'
      width={40}
      height={40}
    />
  ),
  AWS: (
    <Image
      src='/tech-logos/cloud-logo/aws-2.svg'
      alt='AWS'
      width={40}
      height={40}
    />
  ),
  Azure: (
    <Image
      src='/tech-logos/cloud-logo/azure-1.svg'
      alt='Azure'
      width={40}
      height={40}
    />
  ),
  GCP: (
    <Image
      src='/tech-logos/cloud-logo/google-cloud-1.svg'
      alt='Google Cloud'
      width={40}
      height={40}
    />
  ),

  // Mobile Development Icons
  'React Native': (
    <Image
      src='/tech-logos/mobile-dev-logo/react-native-1.svg'
      alt='React Native'
      width={40}
      height={40}
    />
  ),
  Flutter: (
    <Image
      src='/tech-logos/mobile-dev-logo/flutter.svg'
      alt='Flutter'
      width={40}
      height={40}
    />
  ),
  Swift: (
    <Image
      src='/tech-logos/mobile-dev-logo/swift-15.svg'
      alt='Swift'
      width={40}
      height={40}
    />
  ),
  'Swift UI': (
    <Image
      src='/tech-logos/mobile-dev-logo/swift-ui-1.svg'
      alt='Swift UI'
      width={40}
      height={40}
    />
  ),
  Kotlin: (
    <Image
      src='/tech-logos/mobile-dev-logo/kotlin-1.svg'
      alt='Kotlin'
      width={40}
      height={40}
    />
  ),
  Firebase: (
    <Image
      src='/tech-logos/mobile-dev-logo/firebase-1.svg'
      alt='Firebase'
      width={40}
      height={40}
    />
  ),
  'App Store': (
    <Image
      src='/tech-logos/mobile-dev-logo/apple-app-store.svg'
      alt='App Store'
      width={40}
      height={40}
    />
  ),
  'Google Play': (
    <Image
      src='/tech-logos/mobile-dev-logo/google-play-5.svg'
      alt='Google Play'
      width={40}
      height={40}
    />
  ),
  Analytics: (
    <Image
      src='/tech-logos/mobile-dev-logo/google-analytics-4.svg'
      alt='Analytics'
      width={40}
      height={40}
    />
  ),
  Jetpack: (
    <Image
      src='/tech-logos/mobile-dev-logo/jetpack.svg'
      alt='Jetpack'
      width={40}
      height={40}
    />
  ),

  // Design Tools
  Figma: (
    <Image
      src='/tech-logos/ui-ux-logo/figma-icon.svg'
      alt='Figma'
      width={40}
      height={40}
    />
  ),
  'Adobe XD': (
    <Image
      src='/tech-logos/ui-ux-logo/adobe-xd-2.svg'
      alt='Adobe XD'
      width={40}
      height={40}
    />
  ),
  Sketch: (
    <Image
      src='/tech-logos/ui-ux-logo/sketch-2.svg'
      alt='Sketch'
      width={40}
      height={40}
    />
  ),
  Photoshop: (
    <Image
      src='/tech-logos/ui-ux-logo/adobe-photoshop-2.svg'
      alt='Photoshop'
      width={40}
      height={40}
    />
  ),
  Illustrator: (
    <Image
      src='/tech-logos/ui-ux-logo/adobe-illustrator-cc-3.svg'
      alt='Illustrator'
      width={40}
      height={40}
    />
  ),
  InVision: (
    <Image
      src='/tech-logos/ui-ux-logo/invision.svg'
      alt='InVision'
      width={40}
      height={40}
    />
  ),
  Principle: (
    <Image
      src='/tech-logos/ui-ux-logo/principle-app-2.svg'
      alt='Principle'
      width={40}
      height={40}
    />
  ),
  Framer: (
    <Image
      src='/tech-logos/ui-ux-logo/framer-motion.svg'
      alt='Framer'
      width={40}
      height={40}
    />
  ),
  Zeplin: (
    <Image
      src='/tech-logos/ui-ux-logo/zeplin.svg'
      alt='Zeplin'
      width={40}
      height={40}
    />
  ),
  Webflow: (
    <Image
      src='/tech-logos/ui-ux-logo/webflow-icon.svg'
      alt='Webflow'
      width={40}
      height={40}
    />
  ),

  // Cloud Solutions Icons
  Kubernetes: (
    <Image
      src='/tech-logos/cloud-logo/kubernets.svg'
      alt='Kubernetes'
      width={40}
      height={40}
    />
  ),
  Terraform: (
    <Image
      src='/tech-logos/cloud-logo/terraform-enterprise.svg'
      alt='Terraform'
      width={40}
      height={40}
    />
  ),
  Jenkins: (
    <Image
      src='/tech-logos/cloud-logo/jenkins-1.svg'
      alt='Jenkins'
      width={40}
      height={40}
    />
  ),
  GitLab: (
    <Image
      src='/tech-logos/cloud-logo/gitlab-3.svg'
      alt='GitLab'
      width={40}
      height={40}
    />
  ),
  Prometheus: (
    <Image
      src='/tech-logos/cloud-logo/prometheus.svg'
      alt='Prometheus'
      width={40}
      height={40}
    />
  ),
  Grafana: (
    <Image
      src='/tech-logos/cloud-logo/grafana.svg'
      alt='Grafana'
      width={40}
      height={40}
    />
  ),
};
