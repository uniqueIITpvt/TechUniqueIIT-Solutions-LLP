const mongoose = require('mongoose');
const Blog = require('./models/blogModel');
const User = require('./models/userModel');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

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

    // Create admin user if it doesn't exist
    let adminUser = await User.findOne({ email: 'admin@techuniqueIIT.com' });
    
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@techuniqueIIT.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
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
            <li>Client-side injection</li>
          </ul>
          
          <h2>Best Practices</h2>
          <p>Follow these best practices to ensure your mobile applications remain secure:</p>
          <ol>
            <li>Implement proper authentication</li>
            <li>Encrypt sensitive data</li>
            <li>Use secure communication</li>
            <li>Validate input</li>
            <li>Keep dependencies updated</li>
          </ol>
          
          <h2>Conclusion</h2>
          <p>Security should never be an afterthought. By implementing these practices from the beginning, you can build mobile applications that users can trust.</p>
        `,
        summary: 'Learn the essential security practices for developing mobile applications that protect user data and privacy.',
        featuredImage: 'default-blog.jpg',
        author: adminUser._id,
        tags: ['Mobile Development', 'Security', 'Best Practices'],
        category: 'Mobile Development',
        status: 'published',
        readTime: 8,
        viewCount: 85
      },
      {
        title: 'Getting Started with Cloud Computing',
        slug: 'getting-started-with-cloud-computing',
        content: `
          <h2>Introduction to Cloud Computing</h2>
          <p>Cloud computing has transformed how businesses operate, allowing them to scale resources on demand without massive upfront investments.</p>
          
          <h2>Types of Cloud Services</h2>
          <h3>Infrastructure as a Service (IaaS)</h3>
          <p>IaaS provides virtualized computing resources over the internet. Examples include AWS EC2, Google Compute Engine, and Azure VMs.</p>
          
          <h3>Platform as a Service (PaaS)</h3>
          <p>PaaS provides a platform allowing customers to develop, run, and manage applications without dealing with infrastructure complexity. Examples include Heroku, Google App Engine, and Azure App Service.</p>
          
          <h3>Software as a Service (SaaS)</h3>
          <p>SaaS delivers software applications over the internet, on a subscription basis. Examples include Salesforce, Google Workspace, and Microsoft 365.</p>
          
          <h2>Getting Started</h2>
          <p>To begin your cloud journey:</p>
          <ol>
            <li>Identify your business needs</li>
            <li>Compare cloud providers</li>
            <li>Start with a small project</li>
            <li>Monitor costs closely</li>
            <li>Implement proper security practices</li>
          </ol>
          
          <h2>Conclusion</h2>
          <p>Cloud computing offers tremendous opportunities for businesses of all sizes. By understanding the basics, you can make informed decisions about how to leverage cloud services effectively.</p>
        `,
        summary: 'An introduction to cloud computing concepts and how businesses can leverage cloud technologies effectively.',
        featuredImage: 'default-blog.jpg',
        author: adminUser._id,
        tags: ['Cloud Computing', 'AWS', 'Azure', 'GCP'],
        category: 'Cloud Computing',
        status: 'published',
        readTime: 10,
        viewCount: 150
      },
      {
        title: 'Introduction to Artificial Intelligence and Machine Learning',
        slug: 'introduction-to-ai-and-machine-learning',
        content: `
          <h2>What is Artificial Intelligence?</h2>
          <p>Artificial Intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect.</p>
          
          <h2>Machine Learning: A Subset of AI</h2>
          <p>Machine Learning (ML) is a subset of AI that focuses on the development of algorithms that allow computers to learn from and make decisions or predictions based on data.</p>
          
          <h3>Types of Machine Learning</h3>
          <ul>
            <li><strong>Supervised Learning</strong>: Training a model on labeled data</li>
            <li><strong>Unsupervised Learning</strong>: Finding patterns in unlabeled data</li>
            <li><strong>Reinforcement Learning</strong>: Learning through trial and error</li>
          </ul>
          
          <h2>Applications of AI/ML</h2>
          <p>AI and ML are transforming various industries:</p>
          <ul>
            <li>Healthcare: Disease diagnosis and drug discovery</li>
            <li>Finance: Fraud detection and algorithmic trading</li>
            <li>Retail: Personalized recommendations</li>
            <li>Manufacturing: Predictive maintenance</li>
            <li>Transportation: Autonomous vehicles</li>
          </ul>
          
          <h2>Getting Started with ML</h2>
          <p>To begin your ML journey:</p>
          <ol>
            <li>Learn programming (Python is recommended)</li>
            <li>Study statistics and linear algebra</li>
            <li>Explore ML frameworks like TensorFlow or PyTorch</li>
            <li>Practice with open datasets</li>
            <li>Join ML communities</li>
          </ol>
          
          <h2>Conclusion</h2>
          <p>AI and ML are no longer futuristic concepts but practical tools that can solve real-world problems. As these technologies continue to evolve, they will create new opportunities for innovation across industries.</p>
        `,
        summary: 'Learn the fundamentals of AI and machine learning and how these technologies are transforming industries.',
        featuredImage: 'default-blog.jpg',
        author: adminUser._id,
        tags: ['AI', 'Machine Learning', 'Data Science'],
        category: 'AI/ML',
        status: 'published',
        readTime: 12,
        viewCount: 200
      }
    ];

    // Insert sample blog posts
    await Blog.insertMany(blogs);
    console.log(`${blogs.length} blog posts seeded`);
    
    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding
seedDatabase(); 