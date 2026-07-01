const mongoose = require('mongoose');
const Blog = require('./models/blogModel');
const User = require('./models/userModel');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techuniqueIIT');

const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    // Clear existing data
    await Blog.deleteMany({});
    console.log('Blogs cleared');

    // Create or reset admin user
    const adminEmail = 'admin@techuniqueiit.com';
    const adminPassword = 'password123';
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      adminUser = await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    } else {
      adminUser.password = adminPassword;
      adminUser.role = 'admin';
      await adminUser.save();
      console.log('Admin user already exists, password reset');
    }

    // Sample blog posts
    const blogs = [
      {
        title: 'The Future of Web Development in 2023',
        slug: 'future-of-web-development-2023',
        content: `
          <h2>Introduction</h2>
          <p>Web development continues to evolve at a rapid pace. In this article, we'll explore the most important trends that will shape web development in 2023.</p>
          
          <h2>1. Rise of Web Assembly</h2>
          <p>WebAssembly (Wasm) is becoming increasingly important for performance-critical applications on the web. It allows code written in languages like C, C++, and Rust to run in the browser at near-native speed.</p>
          
          <h2>2. AI-Powered Development Tools</h2>
          <p>Artificial intelligence is revolutionizing how we build websites. From code completion to automated testing, AI tools are making developers more productive than ever before.</p>
          
          <h2>3. Serverless Architecture</h2>
          <p>Serverless continues to gain traction as companies seek to reduce infrastructure overhead and scale efficiently.</p>
          
          <h2>Conclusion</h2>
          <p>Staying updated with these trends will be crucial for developers looking to remain competitive in the ever-changing landscape of web development.</p>
        `,
        summary: 'Discover the most important web development trends that will dominate the industry in 2023.',
        featuredImage: 'default-blog.jpg',
        author: adminUser._id,
        tags: ['Web Development', 'Technology', 'Trends'],
        category: 'Web Development',
        status: 'published',
        readTime: 5,
        viewCount: 120
      },
      {
        title: 'Building Secure Mobile Applications',
        slug: 'building-secure-mobile-applications',
        content: `
          <h2>Why Mobile Security Matters</h2>
          <p>With mobile devices becoming the primary way people access digital services, ensuring mobile app security is more important than ever.</p>
          
          <h2>Common Security Vulnerabilities</h2>
          <p>Mobile applications often suffer from these common security issues:</p>
          <ul>
            <li>Insecure data storage</li>
            <li>Weak server-side controls</li>
            <li>Insufficient transport layer protection</li>
            <li>Poor authentication and authorization</li>
          </ul>
          
          <h2>Best Practices for Secure Mobile Development</h2>
          <p>To build secure mobile applications, developers should implement strong encryption, secure authentication, regular security testing, and keep third-party dependencies updated.</p>
        `,
        summary: 'Learn essential security practices for developing mobile applications that protect user data and resist common attacks.',
        featuredImage: 'default-blog.jpg',
        author: adminUser._id,
        tags: ['Mobile Development', 'Security', 'Best Practices'],
        category: 'Mobile Development',
        status: 'published',
        readTime: 6,
        viewCount: 95
      },
      {
        title: 'Cloud Computing Solutions for Modern Businesses',
        slug: 'cloud-computing-solutions-modern-businesses',
        content: `
          <h2>Introduction to Cloud Computing</h2>
          <p>Cloud computing has transformed how businesses operate by providing scalable, flexible, and cost-effective IT resources over the internet.</p>
          
          <h2>Types of Cloud Services</h2>
          <p>Businesses can choose from various cloud service models:</p>
          <ul>
            <li>Infrastructure as a Service (IaaS)</li>
            <li>Platform as a Service (PaaS)</li>
            <li>Software as a Service (SaaS)</li>
          </ul>
          
          <h2>Benefits for Businesses</h2>
          <p>Cloud solutions offer numerous advantages including reduced capital expenditure, improved collaboration, enhanced disaster recovery, and the ability to scale resources based on demand.</p>
        `,
        summary: 'Explore how cloud computing solutions can help modern businesses improve efficiency, reduce costs, and scale operations.',
        featuredImage: 'default-blog.jpg',
        author: adminUser._id,
        tags: ['Cloud Computing', 'Business', 'Technology'],
        category: 'Cloud Computing',
        status: 'published',
        readTime: 7,
        viewCount: 85
      },
      {
        title: 'The Importance of UI/UX Design in Digital Products',
        slug: 'importance-ui-ux-design-digital-products',
        content: `
          <h2>First Impressions Matter</h2>
          <p>User interface and user experience design are crucial factors in determining the success of digital products. A well-designed interface can significantly impact user satisfaction and conversion rates.</p>
          
          <h2>Key Elements of Effective UI/UX Design</h2>
          <p>Successful UI/UX design encompasses intuitive navigation, responsive layouts, accessible design, consistent branding, and thoughtful interaction patterns.</p>
          
          <h2>Business Impact</h2>
          <p>Investing in quality UI/UX design can lead to higher user engagement, lower bounce rates, increased customer loyalty, and ultimately better business outcomes.</p>
        `,
        summary: 'Understand why investing in quality UI/UX design is essential for creating successful digital products that users love.',
        featuredImage: 'default-blog.jpg',
        author: adminUser._id,
        tags: ['UI/UX Design', 'Digital Products', 'User Experience'],
        category: 'UI/UX',
        status: 'published',
        readTime: 4,
        viewCount: 110
      }
    ];

    await Blog.insertMany(blogs);
    console.log(`${blogs.length} blog posts seeded`);
    console.log('Database seeding completed successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

