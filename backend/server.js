const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/errorMiddleware');

// Load env vars
const isLocalDev =
  process.env.LOCAL_DEV === 'true' || process.env.npm_lifecycle_event === 'dev';

if (isLocalDev) {
  process.env.NODE_ENV = 'development';
}

dotenv.config({ path: path.resolve(__dirname, '.env') });

if (isLocalDev) {
  dotenv.config({
    path: path.resolve(__dirname, '.env.development.local'),
    override: true,
  });
  process.env.NODE_ENV = 'development';
}

// Create Express app
const app = express();

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Enable CORS with more permissive options
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// File upload
app.use(
  fileUpload({
    useTempFiles: false,
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    safeFileNames: true,
    preserveExtension: true,
  })
);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

let dbConnected = false;
let routesMounted = false;
let errorHandlerRegistered = false;
let initializationPromise = null;

const registerErrorHandler = () => {
  if (!errorHandlerRegistered) {
    app.use(errorHandler);
    errorHandlerRegistered = true;
  }
};

const mountLimitedRoutes = () => {
  app.use('/api/contact', require('./routes/contactRoutes'));
  app.use('/api/upload', require('./routes/uploadRoutes'));
};

const mountAllRoutes = () => {
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/contact', require('./routes/contactRoutes'));
  app.use('/api/upload', require('./routes/uploadRoutes'));
  app.use('/api/blogs', require('./routes/blogRoutes'));
  app.use('/api/jobs', require('./routes/jobRoutes'));
  app.use('/api/analytics', require('./routes/analyticsRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
};

const initializeApp = async () => {
  if (routesMounted) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = connectDB()
    .then(async (connected) => {
      dbConnected = connected;
      console.log(
        'Database connection result:',
        connected ? 'Connected' : 'Failed'
      );

      if (connected) {
        console.log('MongoDB connected successfully');

        if (process.env.NODE_ENV === 'development') {
          const Blog = require('./models/blogModel');
          try {
            const count = await Blog.countDocuments();
            if (count === 0) {
              console.log('No blogs found in database. Running seed script...');
              require('./seed');
            } else {
              console.log(`${count} blogs found in database. Skipping seed.`);
            }
          } catch (err) {
            console.error('Error checking blog count:', err);
          }
        }

        mountAllRoutes();
      } else {
        mountLimitedRoutes();
      }

      routesMounted = true;
      registerErrorHandler();
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB.');
      console.error('Server will continue without database connection.');
      console.error('Error details:', err);

      mountLimitedRoutes();
      routesMounted = true;
      registerErrorHandler();
    });

  return initializationPromise;
};


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initializeApp();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(
      `Database: ${dbConnected ? 'Connected' : 'Not connected - some features will be unavailable'}`
    );
    console.log('Image Upload API available at: /api/upload');
    console.log('Contact API available at: /api/contact');
    if (dbConnected) {
      console.log('Authentication API available at: /api/auth');
      console.log('Blogs API available at: /api/blogs');
      console.log('Jobs API available at: /api/jobs');
      console.log('Analytics API available at: /api/analytics');
    }
  });

  process.on('unhandledRejection', (unhandledError) => {
    console.log('Unhandled Rejection:', unhandledError.message);
    if (process.env.NODE_ENV === 'development') {
      server.close(() => process.exit(1));
    }
  });

  return server;
};

if (require.main === module) {
  startServer();
}

module.exports = app;
module.exports.initializeApp = initializeApp;
