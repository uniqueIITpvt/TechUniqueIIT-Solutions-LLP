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
let errorHandlerRegistered = false;

const registerErrorHandler = () => {
  if (!errorHandlerRegistered) {
    app.use(errorHandler);
    errorHandlerRegistered = true;
  }
};

// Connect to database
connectDB()
  .then((connected) => {
    dbConnected = connected;
    console.log(
      'Database connection result:',
      connected ? 'Connected' : 'Failed'
    );

    if (connected) {
      console.log('MongoDB connected successfully');

      if (process.env.NODE_ENV === 'development') {
        const Blog = require('./models/blogModel');
        Blog.countDocuments()
          .then((count) => {
            if (count === 0) {
              console.log('No blogs found in database. Running seed script...');
              require('./seed');
            } else {
              console.log(`${count} blogs found in database. Skipping seed.`);
              mountRoutesAndStartServer();
            }
          })
          .catch((err) => {
            console.error('Error checking blog count:', err);
            mountRoutesAndStartServer();
          });
      } else {
        mountRoutesAndStartServer();
      }
    } else {
      app.use('/api/contact', require('./routes/contactRoutes'));
      app.use('/api/upload', require('./routes/uploadRoutes'));
      registerErrorHandler();
      startServer();
    }
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB.');
    console.error('Server will continue without database connection.');
    console.error('Error details:', err);

    app.use('/api/contact', require('./routes/contactRoutes'));
    app.use('/api/upload', require('./routes/uploadRoutes'));
    registerErrorHandler();
    startServer();
  });

function mountRoutesAndStartServer() {
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/contact', require('./routes/contactRoutes'));
  app.use('/api/upload', require('./routes/uploadRoutes'));
  app.use('/api/blogs', require('./routes/blogRoutes'));
  registerErrorHandler();
  startServer();
}

const PORT = process.env.PORT || 5000;

const startServer = () => {
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

module.exports = app;
