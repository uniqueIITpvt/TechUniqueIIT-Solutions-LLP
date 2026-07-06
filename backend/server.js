const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/errorMiddleware');
const path = require('path');
const fs = require('fs');

// Load env vars
dotenv.config();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created uploads directory');
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
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

// Serve uploaded files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
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

app.use(async (req, res, next) => {
  try {
    await initializeApp();
    next();
  } catch (err) {
    next(err);
  }
});

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