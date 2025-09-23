export interface FallbackBlog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  readTime: number;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  author: {
    name: string;
    email: string;
  };
  status: 'published';
}

export const fallbackBlogs: FallbackBlog[] = [
  {
    _id: 'fallback-1',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-web-development-trends-2024',
    summary: 'Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to advanced frameworks.',
    content: `
      <h2>Introduction</h2>
      <p>Web development continues to evolve at a rapid pace. As we move through 2024, several key trends are emerging that will define how we build and interact with web applications.</p>
      
      <h2>1. AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing how developers write code. From GitHub Copilot to ChatGPT, AI assistants are becoming indispensable tools for modern developers, helping with code generation, debugging, and optimization.</p>
      
      <h2>2. Server Components and Edge Computing</h2>
      <p>React Server Components and edge computing are changing how we think about rendering and data fetching. These technologies enable faster, more efficient web applications by processing data closer to users.</p>
      
      <h2>3. WebAssembly (WASM) Adoption</h2>
      <p>WebAssembly is gaining traction for performance-critical applications, allowing languages like Rust, C++, and Go to run in browsers at near-native speeds.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting, with new technologies enabling more powerful, efficient, and user-friendly applications. Staying updated with these trends is crucial for any developer looking to remain competitive.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    category: 'Web Development',
    tags: ['React', 'AI', 'WebAssembly', 'Edge Computing'],
    readTime: 8,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
    viewCount: 1250,
    author: {
      name: 'TechUnique Team',
      email: 'team@techunique.com'
    },
    status: 'published'
  },
  {
    _id: 'fallback-2',
    title: 'Building Scalable Mobile Apps with React Native',
    slug: 'scalable-mobile-apps-react-native',
    summary: 'Learn best practices for developing scalable, maintainable mobile applications using React Native, including architecture patterns and performance optimization.',
    content: `
      <h2>Why React Native?</h2>
      <p>React Native has become the go-to framework for cross-platform mobile development, offering the perfect balance between performance and development efficiency.</p>
      
      <h2>Architecture Patterns</h2>
      <p>Implementing proper architecture patterns like Redux, Context API, or Zustand is crucial for maintaining state in large applications.</p>
      
      <h2>Performance Optimization</h2>
      <p>Key strategies include optimizing images, using FlatList for large datasets, and implementing proper navigation patterns.</p>
      
      <h2>Testing Strategies</h2>
      <p>Comprehensive testing with Jest, Detox, and React Native Testing Library ensures your app works reliably across different devices.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    category: 'Mobile Development',
    tags: ['React Native', 'Mobile', 'Performance', 'Architecture'],
    readTime: 12,
    createdAt: '2024-01-10T14:30:00.000Z',
    updatedAt: '2024-01-10T14:30:00.000Z',
    viewCount: 890,
    author: {
      name: 'TechUnique Team',
      email: 'team@techunique.com'
    },
    status: 'published'
  },
  {
    _id: 'fallback-3',
    title: 'Machine Learning in Web Applications: A Practical Guide',
    slug: 'machine-learning-web-applications-guide',
    summary: 'Discover how to integrate machine learning capabilities into your web applications using TensorFlow.js, Python APIs, and cloud services.',
    content: `
      <h2>Introduction to ML in Web Apps</h2>
      <p>Machine learning is no longer confined to data science labs. Modern web applications can leverage ML for enhanced user experiences and intelligent features.</p>
      
      <h2>TensorFlow.js: ML in the Browser</h2>
      <p>TensorFlow.js enables running machine learning models directly in web browsers, providing real-time predictions without server round-trips.</p>
      
      <h2>Backend ML APIs</h2>
      <p>Python-based APIs using Flask or FastAPI can serve complex ML models, while cloud services like AWS SageMaker provide scalable solutions.</p>
      
      <h2>Real-world Applications</h2>
      <p>From image recognition to natural language processing, ML can enhance user interfaces, automate content moderation, and provide personalized experiences.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
    category: 'AI/ML',
    tags: ['Machine Learning', 'TensorFlow.js', 'Python', 'AI'],
    readTime: 15,
    createdAt: '2024-01-08T09:15:00.000Z',
    updatedAt: '2024-01-08T09:15:00.000Z',
    viewCount: 2100,
    author: {
      name: 'TechUnique Team',
      email: 'team@techunique.com'
    },
    status: 'published'
  },
  {
    _id: 'fallback-4',
    title: 'Cloud-Native Development with Kubernetes and Docker',
    slug: 'cloud-native-development-kubernetes-docker',
    summary: 'Master containerization and orchestration for modern cloud applications using Docker and Kubernetes in production environments.',
    content: `
      <h2>Understanding Cloud-Native Architecture</h2>
      <p>Cloud-native development emphasizes building applications specifically for cloud environments, leveraging microservices, containers, and orchestration.</p>
      
      <h2>Docker Fundamentals</h2>
      <p>Containerization with Docker ensures consistent environments across development, testing, and production, eliminating "it works on my machine" issues.</p>
      
      <h2>Kubernetes Orchestration</h2>
      <p>Kubernetes provides powerful orchestration capabilities, handling scaling, load balancing, and service discovery automatically.</p>
      
      <h2>Best Practices</h2>
      <p>Implementing proper health checks, resource limits, and monitoring ensures robust, scalable applications in production.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
    category: 'Cloud Computing',
    tags: ['Kubernetes', 'Docker', 'DevOps', 'Microservices'],
    readTime: 10,
    createdAt: '2024-01-05T16:45:00.000Z',
    updatedAt: '2024-01-05T16:45:00.000Z',
    viewCount: 1560,
    author: {
      name: 'TechUnique Team',
      email: 'team@techunique.com'
    },
    status: 'published'
  },
  {
    _id: 'fallback-5',
    title: 'Modern UI/UX Design Principles for Web Applications',
    slug: 'modern-ui-ux-design-principles-web',
    summary: 'Explore contemporary design principles that create intuitive, accessible, and visually appealing user interfaces for modern web applications.',
    content: `
      <h2>Design System Fundamentals</h2>
      <p>A well-structured design system ensures consistency across your application while enabling rapid development and easy maintenance.</p>
      
      <h2>Accessibility First</h2>
      <p>Designing with accessibility in mind from the start creates inclusive experiences that work for all users, regardless of their abilities.</p>
      
      <h2>Mobile-First Approach</h2>
      <p>Starting with mobile constraints forces you to prioritize content and functionality, resulting in cleaner, more focused designs.</p>
      
      <h2>Performance and Aesthetics</h2>
      <p>Beautiful designs mean nothing if they don't load quickly. Optimizing images, animations, and interactions is crucial for user satisfaction.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    category: 'UI/UX',
    tags: ['Design Systems', 'Accessibility', 'Mobile-First', 'User Experience'],
    readTime: 7,
    createdAt: '2024-01-03T11:20:00.000Z',
    updatedAt: '2024-01-03T11:20:00.000Z',
    viewCount: 980,
    author: {
      name: 'TechUnique Team',
      email: 'team@techunique.com'
    },
    status: 'published'
  },
  {
    _id: 'fallback-6',
    title: 'Cybersecurity Best Practices for Modern Web Applications',
    slug: 'cybersecurity-best-practices-web-applications',
    summary: 'Essential security measures every developer should implement to protect web applications from common vulnerabilities and attacks.',
    content: `
      <h2>The Security Landscape</h2>
      <p>As web applications become more complex, the attack surface grows. Understanding common vulnerabilities is the first step in building secure applications.</p>
      
      <h2>Authentication and Authorization</h2>
      <p>Implementing robust authentication mechanisms, including multi-factor authentication and proper session management, is crucial for application security.</p>
      
      <h2>Data Protection</h2>
      <p>Encrypting sensitive data both in transit and at rest, along with proper input validation, prevents data breaches and injection attacks.</p>
      
      <h2>Security Testing</h2>
      <p>Regular security audits, penetration testing, and automated vulnerability scanning help identify and fix security issues before they're exploited.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    category: 'Cyber Security',
    tags: ['Security', 'Authentication', 'Encryption', 'Vulnerability Testing'],
    readTime: 11,
    createdAt: '2024-01-01T08:00:00.000Z',
    updatedAt: '2024-01-01T08:00:00.000Z',
    viewCount: 1780,
    author: {
      name: 'TechUnique Team',
      email: 'team@techunique.com'
    },
    status: 'published'
  },
  {
    _id: 'fallback-7',
    title: 'Digital Marketing Strategies for Tech Companies',
    slug: 'digital-marketing-strategies-tech-companies',
    summary: 'Effective digital marketing approaches specifically tailored for technology companies, from content marketing to social media engagement.',
    content: `
      <h2>Understanding Your Tech Audience</h2>
      <p>Tech audiences are often more informed and skeptical. Your marketing needs to be educational, authentic, and value-driven rather than purely promotional.</p>
      
      <h2>Content Marketing Excellence</h2>
      <p>Technical blogs, whitepapers, and case studies establish thought leadership and provide genuine value to your audience while improving SEO.</p>
      
      <h2>Social Media for B2B Tech</h2>
      <p>LinkedIn, Twitter, and GitHub are crucial platforms for tech companies to share insights, engage with developers, and build community.</p>
      
      <h2>Measuring Success</h2>
      <p>Track meaningful metrics like engagement quality, lead generation, and customer acquisition cost rather than just vanity metrics.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    category: 'Digital Marketing',
    tags: ['Content Marketing', 'B2B Marketing', 'Social Media', 'Lead Generation'],
    readTime: 9,
    createdAt: '2023-12-28T13:30:00.000Z',
    updatedAt: '2023-12-28T13:30:00.000Z',
    viewCount: 720,
    author: {
      name: 'TechUnique Team',
      email: 'team@techunique.com'
    },
    status: 'published'
  },
  {
    _id: 'fallback-8',
    title: 'Building High-Performance APIs with Node.js and Express',
    slug: 'high-performance-apis-nodejs-express',
    summary: 'Learn advanced techniques for creating fast, scalable APIs using Node.js and Express, including caching, optimization, and monitoring.',
    content: `
      <h2>API Performance Fundamentals</h2>
      <p>Understanding the bottlenecks in API performance is crucial for building systems that can handle high traffic and provide excellent user experiences.</p>
      
      <h2>Caching Strategies</h2>
      <p>Implementing Redis for caching, using CDNs for static content, and leveraging HTTP caching headers can dramatically improve API response times.</p>
      
      <h2>Database Optimization</h2>
      <p>Proper indexing, query optimization, and connection pooling are essential for maintaining fast database operations as your application scales.</p>
      
      <h2>Monitoring and Observability</h2>
      <p>Tools like New Relic, DataDog, or custom monitoring solutions help identify performance issues before they impact users.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    category: 'Technology',
    tags: ['Node.js', 'Express', 'API', 'Performance', 'Caching'],
    readTime: 13,
    createdAt: '2023-12-25T15:45:00.000Z',
    updatedAt: '2023-12-25T15:45:00.000Z',
    viewCount: 1340,
    author: {
      name: 'TechUnique Team',
      email: 'team@techunique.com'
    },
    status: 'published'
  }
];

// Featured blogs (subset of all blogs)
export const featuredBlogs = fallbackBlogs.slice(0, 3);

// Function to get blogs by category
export const getBlogsByCategory = (category: string): FallbackBlog[] => {
  if (!category || category === 'All') {
    return fallbackBlogs;
  }
  return fallbackBlogs.filter(blog => blog.category === category);
};

// Function to get paginated blogs
export const getPaginatedBlogs = (page: number = 1, limit: number = 6, category?: string): {
  blogs: FallbackBlog[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
} => {
  const filteredBlogs = category ? getBlogsByCategory(category) : fallbackBlogs;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
  
  return {
    blogs: paginatedBlogs,
    totalPages: Math.ceil(filteredBlogs.length / limit),
    totalCount: filteredBlogs.length,
    currentPage: page
  };
};

// Function to get blog by slug
export const getBlogBySlug = (slug: string): FallbackBlog | undefined => {
  return fallbackBlogs.find(blog => blog.slug === slug);
};
