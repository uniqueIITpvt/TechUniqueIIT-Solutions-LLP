export interface FallbackCaseStudy {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  client: string;
  duration: string;
  year: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  tags: string[];
  featured: boolean;
  status: 'published';
  content?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
    company: string;
  };
}

export const fallbackCaseStudies: FallbackCaseStudy[] = [
  {
    _id: 'fallback-cs-1',
    title: 'E-commerce Platform Transformation',
    slug: 'ecommerce-platform-transformation',
    category: 'Web Development',
    description: 'Complete redesign and development of a modern e-commerce platform resulting in 250% increase in conversions and enhanced user experience.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    client: 'RetailMax Solutions',
    duration: '4 months',
    year: '2024',
    stats: [
      { label: 'Conversion Rate', value: '+250%' },
      { label: 'Page Load Speed', value: '-65%' },
      { label: 'User Engagement', value: '+180%' },
      { label: 'Mobile Traffic', value: '+320%' }
    ],
    tags: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    featured: true,
    status: 'published',
    challenge: 'The client had an outdated e-commerce platform with poor mobile experience, slow loading times, and a complex checkout process that resulted in high cart abandonment rates.',
    solution: 'We built a modern, responsive e-commerce platform using Next.js with server-side rendering, implemented a streamlined checkout process, and integrated advanced analytics and personalization features.',
    results: 'The new platform delivered exceptional results with significantly improved conversion rates, faster loading times, and enhanced user experience across all devices.',
    technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'AWS S3', 'CloudFront'],
    content: `
      <h2>Project Overview</h2>
      <p>RetailMax Solutions approached us with a critical challenge: their existing e-commerce platform was losing customers due to poor user experience and technical limitations. The platform suffered from slow loading times, a complicated checkout process, and lack of mobile optimization.</p>
      
      <h2>The Challenge</h2>
      <p>The existing platform had several critical issues:</p>
      <ul>
        <li>Cart abandonment rate of 78%</li>
        <li>Average page load time of 8+ seconds</li>
        <li>Poor mobile experience with only 15% mobile conversions</li>
        <li>Outdated design that didn't reflect the brand</li>
        <li>Limited payment options and complex checkout flow</li>
      </ul>
      
      <h2>Our Solution</h2>
      <p>We designed and developed a completely new e-commerce platform with modern technologies and best practices:</p>
      <ul>
        <li>Server-side rendered Next.js application for optimal performance</li>
        <li>Mobile-first responsive design with intuitive navigation</li>
        <li>One-click checkout with multiple payment options</li>
        <li>Advanced search and filtering capabilities</li>
        <li>Personalized product recommendations</li>
        <li>Real-time inventory management</li>
      </ul>
      
      <h2>Results</h2>
      <p>The transformation delivered outstanding results that exceeded all expectations. The new platform not only improved user experience but also significantly boosted business metrics across all key performance indicators.</p>
    `,
    testimonial: {
      text: "TechUnique transformed our online business completely. The new platform is not just beautiful, it's incredibly fast and user-friendly. Our sales have tripled since the launch!",
      author: "Sarah Johnson",
      position: "CEO",
      company: "RetailMax Solutions"
    }
  },
  {
    _id: 'fallback-cs-2',
    title: 'FinTech Mobile Banking Application',
    slug: 'fintech-mobile-banking-app',
    category: 'Mobile Development',
    description: 'Developed a secure, feature-rich mobile banking application with biometric authentication, real-time transactions, and AI-powered financial insights.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    client: 'NextGen Bank',
    duration: '6 months',
    year: '2024',
    stats: [
      { label: 'User Adoption', value: '92%' },
      { label: 'App Store Rating', value: '4.9/5' },
      { label: 'Daily Transactions', value: '50K+' },
      { label: 'Security Score', value: '99.8%' }
    ],
    tags: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Biometrics'],
    featured: true,
    status: 'published',
    challenge: 'NextGen Bank needed a modern mobile banking solution that could compete with established players while ensuring top-tier security and user experience.',
    solution: 'We developed a comprehensive mobile banking app with advanced security features, intuitive UI/UX, and AI-powered financial insights to help users manage their finances better.',
    results: 'The app achieved remarkable user adoption rates and became the highest-rated banking app in the region, significantly increasing customer engagement and satisfaction.',
    technologies: ['React Native', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'AWS Lambda', 'AWS Cognito', 'Plaid API', 'Biometric APIs'],
    content: `
      <h2>Project Overview</h2>
      <p>NextGen Bank wanted to revolutionize their digital banking experience with a mobile-first approach. They needed a secure, user-friendly application that could handle complex financial operations while maintaining the highest security standards.</p>
      
      <h2>Key Features Implemented</h2>
      <ul>
        <li>Biometric authentication (fingerprint, face recognition)</li>
        <li>Real-time transaction processing and notifications</li>
        <li>AI-powered spending insights and budgeting tools</li>
        <li>Peer-to-peer payments and money transfers</li>
        <li>Investment portfolio management</li>
        <li>24/7 AI chatbot for customer support</li>
        <li>Multi-language support</li>
      </ul>
      
      <h2>Security Measures</h2>
      <p>Security was paramount in this project. We implemented multiple layers of protection including end-to-end encryption, fraud detection algorithms, and compliance with banking regulations.</p>
      
      <h2>Impact</h2>
      <p>The application transformed NextGen Bank's digital presence and significantly improved customer satisfaction and engagement metrics.</p>
    `,
    testimonial: {
      text: "The mobile banking app exceeded our expectations. Our customers love the intuitive design and advanced features. It's helped us attract a younger demographic and increase digital engagement.",
      author: "Michael Chen",
      position: "CTO",
      company: "NextGen Bank"
    }
  },
  {
    _id: 'fallback-cs-3',
    title: 'AI-Powered Healthcare Platform',
    slug: 'ai-healthcare-platform',
    category: 'AI/ML',
    description: 'Built an intelligent healthcare platform using machine learning for patient diagnosis assistance, appointment scheduling, and health monitoring.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    client: 'MediCare Plus',
    duration: '8 months',
    year: '2024',
    stats: [
      { label: 'Diagnostic Accuracy', value: '94%' },
      { label: 'Patient Satisfaction', value: '96%' },
      { label: 'Processing Time', value: '-70%' },
      { label: 'Cost Reduction', value: '45%' }
    ],
    tags: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'Docker'],
    featured: true,
    status: 'published',
    challenge: 'MediCare Plus needed to streamline their healthcare operations while improving diagnostic accuracy and patient care quality through technology.',
    solution: 'We developed an AI-powered platform that assists healthcare professionals with diagnosis, automates administrative tasks, and provides patients with better access to healthcare services.',
    results: 'The platform significantly improved diagnostic accuracy, reduced processing times, and enhanced overall patient satisfaction while reducing operational costs.',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS'],
    content: `
      <h2>Healthcare Innovation</h2>
      <p>MediCare Plus partnered with us to create a revolutionary healthcare platform that leverages artificial intelligence to improve patient outcomes and streamline healthcare operations.</p>
      
      <h2>AI-Powered Features</h2>
      <ul>
        <li>Medical image analysis for early disease detection</li>
        <li>Symptom checker with 94% diagnostic accuracy</li>
        <li>Predictive analytics for patient risk assessment</li>
        <li>Automated appointment scheduling and reminders</li>
        <li>Electronic health records with smart insights</li>
        <li>Drug interaction and allergy warnings</li>
      </ul>
      
      <h2>Technology Stack</h2>
      <p>We used cutting-edge machine learning technologies combined with modern web development frameworks to create a robust, scalable platform that can handle complex healthcare data and provide real-time insights.</p>
      
      <h2>Compliance & Security</h2>
      <p>The platform is fully HIPAA compliant with enterprise-grade security measures to protect sensitive patient data.</p>
    `,
    testimonial: {
      text: "This AI platform has transformed how we deliver healthcare. The diagnostic assistance has improved our accuracy significantly, and patients love the streamlined experience.",
      author: "Dr. Emily Rodriguez",
      position: "Chief Medical Officer",
      company: "MediCare Plus"
    }
  },
  {
    _id: 'fallback-cs-4',
    title: 'Cloud Infrastructure Modernization',
    slug: 'cloud-infrastructure-modernization',
    category: 'Cloud Computing',
    description: 'Migrated legacy systems to modern cloud infrastructure using microservices architecture, resulting in improved scalability and reduced costs.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    client: 'TechCorp Industries',
    duration: '5 months',
    year: '2024',
    stats: [
      { label: 'Cost Reduction', value: '60%' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Deployment Speed', value: '+400%' },
      { label: 'Scalability', value: '10x' }
    ],
    tags: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Microservices'],
    featured: false,
    status: 'published',
    challenge: 'TechCorp Industries was struggling with outdated infrastructure that was expensive to maintain, difficult to scale, and prone to downtime.',
    solution: 'We designed and implemented a modern cloud-native architecture using microservices, containerization, and automated deployment pipelines.',
    results: 'The modernization resulted in significant cost savings, improved reliability, and the ability to scale rapidly to meet business demands.',
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana', 'ELK Stack', 'Redis', 'PostgreSQL'],
    content: `
      <h2>Infrastructure Transformation</h2>
      <p>TechCorp Industries needed to modernize their legacy infrastructure to support rapid business growth and improve operational efficiency.</p>
      
      <h2>Migration Strategy</h2>
      <ul>
        <li>Assessment of existing systems and dependencies</li>
        <li>Phased migration approach to minimize downtime</li>
        <li>Containerization of applications using Docker</li>
        <li>Implementation of Kubernetes for orchestration</li>
        <li>Setup of CI/CD pipelines for automated deployments</li>
        <li>Monitoring and logging infrastructure</li>
      </ul>
      
      <h2>Benefits Achieved</h2>
      <p>The cloud modernization delivered substantial improvements in cost efficiency, system reliability, and development velocity.</p>
    `,
    testimonial: {
      text: "The cloud migration was seamless and the results speak for themselves. We're now more agile, cost-effective, and can scale our operations effortlessly.",
      author: "David Kim",
      position: "VP of Engineering",
      company: "TechCorp Industries"
    }
  },
  {
    _id: 'fallback-cs-5',
    title: 'EdTech Learning Management System',
    slug: 'edtech-learning-management-system',
    category: 'Web Development',
    description: 'Created a comprehensive learning management system with interactive courses, real-time collaboration, and advanced analytics for educational institutions.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    client: 'EduFuture Academy',
    duration: '7 months',
    year: '2023',
    stats: [
      { label: 'Student Engagement', value: '+85%' },
      { label: 'Course Completion', value: '+120%' },
      { label: 'Teacher Efficiency', value: '+200%' },
      { label: 'Platform Uptime', value: '99.8%' }
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS', 'WebRTC'],
    featured: false,
    status: 'published',
    challenge: 'EduFuture Academy needed a modern LMS that could support remote learning, interactive content, and provide detailed analytics for educators.',
    solution: 'We built a comprehensive learning platform with video conferencing, interactive assignments, progress tracking, and collaborative tools.',
    results: 'The platform significantly improved student engagement and learning outcomes while providing educators with powerful tools to enhance their teaching.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'WebRTC', 'AWS S3', 'CloudFront', 'Elasticsearch'],
    content: `
      <h2>Educational Innovation</h2>
      <p>EduFuture Academy wanted to create a next-generation learning experience that would engage students and empower educators with modern tools.</p>
      
      <h2>Platform Features</h2>
      <ul>
        <li>Interactive video lessons with quizzes and assessments</li>
        <li>Real-time collaboration tools and discussion forums</li>
        <li>Advanced analytics and progress tracking</li>
        <li>Mobile-responsive design for learning on any device</li>
        <li>Integration with popular educational tools</li>
        <li>Automated grading and feedback systems</li>
      </ul>
      
      <h2>Impact on Education</h2>
      <p>The platform revolutionized how EduFuture Academy delivers education, making learning more engaging and accessible for students while providing educators with powerful insights.</p>
    `,
    testimonial: {
      text: "This LMS has completely transformed our teaching approach. Students are more engaged, and we have better insights into their learning progress than ever before.",
      author: "Prof. Lisa Thompson",
      position: "Academic Director",
      company: "EduFuture Academy"
    }
  },
  {
    _id: 'fallback-cs-6',
    title: 'Cybersecurity Dashboard & Monitoring',
    slug: 'cybersecurity-dashboard-monitoring',
    category: 'Cyber Security',
    description: 'Developed a comprehensive cybersecurity monitoring dashboard with real-time threat detection, incident response, and compliance reporting.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    client: 'SecureNet Solutions',
    duration: '4 months',
    year: '2023',
    stats: [
      { label: 'Threat Detection', value: '+300%' },
      { label: 'Response Time', value: '-80%' },
      { label: 'False Positives', value: '-65%' },
      { label: 'Compliance Score', value: '98%' }
    ],
    tags: ['React', 'Python', 'Django', 'PostgreSQL', 'Redis', 'Elasticsearch'],
    featured: false,
    status: 'published',
    challenge: 'SecureNet Solutions needed a centralized security monitoring solution that could detect threats in real-time and provide actionable insights.',
    solution: 'We created an advanced cybersecurity dashboard with machine learning-powered threat detection, automated incident response, and comprehensive reporting.',
    results: 'The solution dramatically improved threat detection capabilities and reduced response times, enhancing overall security posture.',
    technologies: ['React', 'TypeScript', 'Python', 'Django', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Kibana', 'Docker', 'AWS'],
    content: `
      <h2>Security Operations Center</h2>
      <p>SecureNet Solutions required a sophisticated security monitoring platform to protect their clients from evolving cyber threats.</p>
      
      <h2>Key Security Features</h2>
      <ul>
        <li>Real-time threat monitoring and alerting</li>
        <li>Machine learning-based anomaly detection</li>
        <li>Automated incident response workflows</li>
        <li>Compliance reporting and audit trails</li>
        <li>Integration with popular security tools</li>
        <li>Custom dashboards for different stakeholders</li>
      </ul>
      
      <h2>Enhanced Security Posture</h2>
      <p>The platform provides comprehensive visibility into security events and enables rapid response to potential threats.</p>
    `,
    testimonial: {
      text: "The cybersecurity dashboard has revolutionized our security operations. We can now detect and respond to threats much faster and more effectively.",
      author: "James Wilson",
      position: "CISO",
      company: "SecureNet Solutions"
    }
  }
];

// Featured case studies (subset of all case studies)
export const featuredCaseStudies = fallbackCaseStudies.filter(cs => cs.featured);

// Function to get case studies by category
export const getCaseStudiesByCategory = (category: string): FallbackCaseStudy[] => {
  if (!category || category === 'All') {
    return fallbackCaseStudies;
  }
  return fallbackCaseStudies.filter(cs => cs.category === category);
};

// Function to get case study by slug
export const getCaseStudyBySlug = (slug: string): FallbackCaseStudy | undefined => {
  return fallbackCaseStudies.find(cs => cs.slug === slug);
};

// Available categories
export const caseStudyCategories = [
  'All',
  'Web Development',
  'Mobile Development',
  'AI/ML',
  'Cloud Computing',
  'Cyber Security'
];
