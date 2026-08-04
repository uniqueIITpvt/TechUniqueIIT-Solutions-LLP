export type ServicePage = {
  slug: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  heroSummary: string;
  primaryKeywords: string[];
  idealFor: string[];
  capabilities: string[];
  deliverables: string[];
  technologies: string[];
  process: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedServices: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development Services',
    shortTitle: 'Custom Software Development',
    metaTitle: 'Custom Software Development Services',
    description:
      'Custom software development services for business workflows, SaaS platforms, dashboards, automation tools, and secure internal systems.',
    eyebrow: 'Business Software Engineering',
    heroSummary:
      'We design, build, and maintain custom software that matches your workflows instead of forcing your team into generic tools.',
    primaryKeywords: [
      'custom software development',
      'business software development',
      'SaaS application development',
      'enterprise software development',
    ],
    idealFor: [
      'Businesses replacing manual spreadsheets or legacy tools',
      'Teams that need custom dashboards, workflows, or portals',
      'Founders building SaaS platforms or MVPs',
      'Companies that need secure role-based internal systems',
    ],
    capabilities: [
      'Workflow analysis and technical planning',
      'Custom web portals and admin dashboards',
      'Role-based access control and authentication',
      'API design and third-party integrations',
      'Database modeling, reporting, and automation',
      'Deployment, monitoring, and ongoing support',
    ],
    deliverables: [
      'Functional software architecture',
      'Responsive application UI',
      'Backend APIs and database schema',
      'Admin and user workflows',
      'Deployment-ready codebase',
      'Maintenance and handover documentation',
    ],
    technologies: [
      'Next.js',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'AWS',
      'Azure',
      'Docker',
    ],
    process: [
      {
        title: 'Discovery',
        description:
          'We map business workflows, user roles, data needs, and integration points.',
      },
      {
        title: 'Architecture',
        description:
          'We define the database, API structure, user journeys, security model, and release plan.',
      },
      {
        title: 'Development',
        description:
          'We build the application in milestones with review points for UI, logic, and data flows.',
      },
      {
        title: 'Launch and Support',
        description:
          'We deploy, monitor, fix issues, and support future upgrades after release.',
      },
    ],
    faqs: [
      {
        question: 'Can you build software around our exact business workflow?',
        answer:
          'Yes. The project starts with workflow mapping so the application can match your operations, approvals, reports, and user roles.',
      },
      {
        question: 'Do you also maintain the software after launch?',
        answer:
          'Yes. We provide post-launch fixes, monitoring, feature upgrades, and technical support.',
      },
    ],
    relatedServices: [
      'web-application-development',
      'software-maintenance',
      'mobile-app-development',
    ],
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development Services',
    shortTitle: 'Web Application Development',
    metaTitle: 'Web Application Development Services',
    description:
      'Web application development services using React, Next.js, Node.js, APIs, databases, cloud deployment, and responsive UI engineering.',
    eyebrow: 'Modern Web Apps',
    heroSummary:
      'We build fast, secure, and scalable web applications for customer portals, internal tools, SaaS products, and business dashboards.',
    primaryKeywords: [
      'web application development',
      'Next.js development',
      'React web app development',
      'Node.js web application',
    ],
    idealFor: [
      'Companies launching a new customer-facing web app',
      'Teams that need dashboards, portals, or workflow systems',
      'Businesses modernizing older web applications',
      'Product teams building an MVP or SaaS product',
    ],
    capabilities: [
      'Responsive frontend development',
      'Backend API development',
      'Authentication and protected routes',
      'Database-backed dashboards and reports',
      'Payment, CRM, email, and analytics integrations',
      'Production deployment and performance optimization',
    ],
    deliverables: [
      'Web app UI and reusable components',
      'API layer and database integration',
      'Responsive pages for desktop and mobile',
      'SEO-ready public routes where needed',
      'Production deployment configuration',
      'Testing and launch checklist',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'Tailwind CSS',
      'Vercel',
    ],
    process: [
      {
        title: 'Product Planning',
        description:
          'We define users, screens, data entities, integrations, and measurable launch goals.',
      },
      {
        title: 'Interface Build',
        description:
          'We create responsive UI flows that are easy to scan, navigate, and repeat.',
      },
      {
        title: 'Backend Integration',
        description:
          'We connect APIs, databases, authentication, file uploads, and external services.',
      },
      {
        title: 'Release',
        description:
          'We deploy the app, verify production behavior, and prepare the next improvement cycle.',
      },
    ],
    faqs: [
      {
        question: 'Can you build both frontend and backend?',
        answer:
          'Yes. We handle frontend, backend APIs, database integration, deployment, and maintenance.',
      },
      {
        question: 'Can the web app be SEO-friendly?',
        answer:
          'Yes. Public pages can be server-rendered with metadata, structured data, and clean URL architecture.',
      },
    ],
    relatedServices: [
      'custom-software-development',
      'software-maintenance',
      'seo-services',
    ],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development Services',
    shortTitle: 'Mobile App Development',
    metaTitle: 'Mobile App Development Services',
    description:
      'Mobile app development services for Android and iOS apps with React Native, Flutter, API integrations, push notifications, and store launch support.',
    eyebrow: 'iOS and Android Apps',
    heroSummary:
      'We build practical mobile apps for customers, employees, field teams, education, ecommerce, and business operations.',
    primaryKeywords: [
      'mobile app development',
      'Android app development',
      'iOS app development',
      'React Native app development',
      'Flutter app development',
    ],
    idealFor: [
      'Businesses launching Android and iOS apps',
      'Teams that need mobile access to business workflows',
      'Education, ecommerce, service, and operations platforms',
      'Companies extending an existing web platform to mobile',
    ],
    capabilities: [
      'Cross-platform mobile app development',
      'Mobile onboarding and authentication',
      'API integration with existing backend systems',
      'Push notifications and user engagement flows',
      'Media, file upload, and payment integrations',
      'Play Store and App Store release support',
    ],
    deliverables: [
      'Mobile app UI and navigation',
      'API-connected screens and workflows',
      'Authentication and user profile flows',
      'Push notification setup',
      'Testing build and release build',
      'Store submission support',
    ],
    technologies: [
      'React Native',
      'Flutter',
      'Firebase',
      'Node.js',
      'REST APIs',
      'MongoDB',
      'PostgreSQL',
      'Android',
      'iOS',
    ],
    process: [
      {
        title: 'App Scope',
        description:
          'We define user journeys, platforms, backend needs, notifications, and release requirements.',
      },
      {
        title: 'Mobile UI',
        description:
          'We create compact, responsive mobile screens for repeated daily use.',
      },
      {
        title: 'Integration',
        description:
          'We connect APIs, authentication, payments, uploads, and notifications.',
      },
      {
        title: 'Launch',
        description:
          'We test devices, prepare builds, and support Play Store or App Store submission.',
      },
    ],
    faqs: [
      {
        question: 'Do you build both Android and iOS apps?',
        answer:
          'Yes. We can build cross-platform apps for both Android and iOS using React Native or Flutter.',
      },
      {
        question: 'Can you connect the app with our existing backend?',
        answer:
          'Yes. We can integrate with your existing APIs or build the backend if needed.',
      },
    ],
    relatedServices: [
      'web-application-development',
      'custom-software-development',
      'digital-marketing',
    ],
  },
  {
    slug: 'software-maintenance',
    title: 'Software Maintenance Services',
    shortTitle: 'Software Maintenance',
    metaTitle: 'Software Maintenance and Code Management Services',
    description:
      'Software maintenance services for existing applications, bug fixes, performance optimization, server monitoring, backups, upgrades, and code management.',
    eyebrow: 'Application Support',
    heroSummary:
      'We take over existing software, stabilize it, improve performance, and keep it running with practical maintenance support.',
    primaryKeywords: [
      'software maintenance services',
      'application maintenance',
      'code management services',
      'legacy software support',
      'server maintenance',
    ],
    idealFor: [
      'Businesses with software built by another team',
      'Teams facing bugs, downtime, or slow performance',
      'Companies that need ongoing server and database support',
      'Products that need upgrades without a full rebuild',
    ],
    capabilities: [
      'Existing codebase audit and takeover',
      'Bug fixing and release support',
      'Performance optimization',
      'Security patches and dependency upgrades',
      'Database backups and recovery planning',
      'Server monitoring and cloud maintenance',
    ],
    deliverables: [
      'Codebase health review',
      'Prioritized maintenance backlog',
      'Bug fixes and patches',
      'Performance and security improvements',
      'Backup and monitoring setup',
      'Monthly support reporting',
    ],
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'MongoDB',
      'SQL',
      'AWS',
      'Azure',
      'Docker',
      'Linux',
    ],
    process: [
      {
        title: 'Technical Audit',
        description:
          'We review code, infrastructure, database, logs, security risks, and current pain points.',
      },
      {
        title: 'Stabilization',
        description:
          'We fix urgent bugs, deployment issues, broken flows, and server reliability problems.',
      },
      {
        title: 'Optimization',
        description:
          'We improve performance, dependencies, backups, monitoring, and maintainability.',
      },
      {
        title: 'Ongoing Support',
        description:
          'We manage fixes, improvements, monitoring, and recurring technical support.',
      },
    ],
    faqs: [
      {
        question: 'Can you maintain software built by another developer?',
        answer:
          'Yes. We start with a code and infrastructure audit, then plan a safe takeover and support workflow.',
      },
      {
        question: 'Can you handle server and database maintenance?',
        answer:
          'Yes. We support deployments, monitoring, backups, database health, and cloud server maintenance.',
      },
    ],
    relatedServices: [
      'custom-software-development',
      'web-application-development',
      'seo-services',
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing Services',
    shortTitle: 'Digital Marketing',
    metaTitle: 'Digital Marketing Services',
    description:
      'Digital marketing services for SEO, social media management, YouTube growth, paid campaigns, brand visibility, and lead generation.',
    eyebrow: 'Growth Marketing',
    heroSummary:
      'We help businesses improve online visibility, generate better leads, and manage digital channels with a clear execution plan.',
    primaryKeywords: [
      'digital marketing services',
      'social media management',
      'YouTube channel management',
      'performance marketing',
      'lead generation',
    ],
    idealFor: [
      'Businesses that need consistent online visibility',
      'Brands growing YouTube, Instagram, LinkedIn, or Facebook',
      'Companies that need SEO and paid campaign support',
      'Teams that want better digital content and reporting',
    ],
    capabilities: [
      'Social media strategy and management',
      'YouTube channel planning and optimization',
      'SEO planning and website content improvements',
      'Paid campaign setup and performance tracking',
      'Content calendars and creative direction',
      'Lead generation funnel support',
    ],
    deliverables: [
      'Channel strategy and content calendar',
      'SEO keyword and content plan',
      'Campaign setup and tracking',
      'Monthly performance reports',
      'Creative and copy direction',
      'Landing page recommendations',
    ],
    technologies: [
      'Google Search Console',
      'Google Analytics',
      'Meta Ads',
      'Google Ads',
      'YouTube Studio',
      'LinkedIn',
      'Instagram',
      'SEO tools',
    ],
    process: [
      {
        title: 'Audit',
        description:
          'We review your website, channels, content, competitors, and current lead sources.',
      },
      {
        title: 'Strategy',
        description:
          'We define target audiences, channel priorities, content themes, and measurement goals.',
      },
      {
        title: 'Execution',
        description:
          'We manage content, campaigns, SEO tasks, and reporting cycles.',
      },
      {
        title: 'Optimization',
        description:
          'We use data to improve targeting, content, landing pages, and conversion rates.',
      },
    ],
    faqs: [
      {
        question: 'Do you manage social media channels?',
        answer:
          'Yes. We support planning, publishing, optimization, and reporting for key social channels.',
      },
      {
        question: 'Can digital marketing be connected with website SEO?',
        answer:
          'Yes. We align campaigns, content, landing pages, and search visibility so marketing traffic has better conversion paths.',
      },
    ],
    relatedServices: [
      'seo-services',
      'web-application-development',
      'mobile-app-development',
    ],
  },
  {
    slug: 'seo-services',
    title: 'SEO Services',
    shortTitle: 'SEO Services',
    metaTitle: 'SEO Services for Business Websites',
    description:
      'SEO services for technical SEO, on-page optimization, metadata, structured data, local SEO, content planning, and performance improvements.',
    eyebrow: 'Search Visibility',
    heroSummary:
      'We improve website structure, metadata, content quality, technical performance, and search visibility for long-term organic growth.',
    primaryKeywords: [
      'SEO services',
      'technical SEO',
      'on-page SEO',
      'local SEO services',
      'SEO audit',
    ],
    idealFor: [
      'Businesses that need more qualified organic traffic',
      'Websites with missing metadata, sitemap, or structured data',
      'Local businesses improving search visibility',
      'Companies planning service-specific landing pages',
    ],
    capabilities: [
      'Technical SEO audit and fixes',
      'Metadata, canonicals, robots, and sitemap setup',
      'Structured data and rich result readiness',
      'Keyword mapping and content planning',
      'Local SEO and NAP consistency review',
      'Core Web Vitals and image performance improvements',
    ],
    deliverables: [
      'SEO audit report',
      'Technical SEO implementation',
      'Keyword-to-page map',
      'Metadata and schema improvements',
      'Content recommendations',
      'Search Console setup support',
    ],
    technologies: [
      'Google Search Console',
      'PageSpeed Insights',
      'Schema.org',
      'Next.js Metadata API',
      'Sitemap XML',
      'Robots.txt',
      'Structured Data',
    ],
    process: [
      {
        title: 'SEO Audit',
        description:
          'We review crawlability, metadata, sitemap, content structure, speed, links, and schema.',
      },
      {
        title: 'Technical Fixes',
        description:
          'We implement high-impact technical SEO fixes before deeper content work.',
      },
      {
        title: 'Content Mapping',
        description:
          'We map services, keywords, search intent, and internal links.',
      },
      {
        title: 'Measure',
        description:
          'We use Search Console and analytics to track indexing, queries, clicks, and improvements.',
      },
    ],
    faqs: [
      {
        question: 'Do you handle technical SEO implementation?',
        answer:
          'Yes. We can implement metadata, sitemap, robots rules, schema, canonicals, image optimization, and page structure fixes.',
      },
      {
        question: 'Can you create SEO landing pages?',
        answer:
          'Yes. We can create focused service pages with unique metadata, copy, FAQs, internal links, and structured data.',
      },
    ],
    relatedServices: [
      'digital-marketing',
      'web-application-development',
      'custom-software-development',
    ],
  },
];

export const getServicePage = (slug: string) => {
  return servicePages.find((service) => service.slug === slug);
};
