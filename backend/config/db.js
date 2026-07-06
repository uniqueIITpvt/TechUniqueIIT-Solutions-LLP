const mongoose = require('mongoose');

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri && isProduction) {
    console.warn('MONGO_URI is not configured. Database-backed routes will be unavailable.');
    return false;
  }

  const resolvedMongoUri = mongoUri || 'mongodb://127.0.0.1:27017/techuniqueiit';
  const maxRetries = isProduction ? 1 : 3;
  let retries = 0;

  const connectWithRetry = async () => {
    try {
      console.log(`MongoDB connection attempt ${retries + 1}/${maxRetries + 1} to ${resolvedMongoUri}...`);

      const conn = await mongoose.connect(resolvedMongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: isProduction ? 5000 : 30000,
        socketTimeoutMS: isProduction ? 10000 : 60000,
        connectTimeoutMS: isProduction ? 5000 : 30000,
        heartbeatFrequencyMS: 10000,
        retryWrites: true,
        maxPoolSize: 50,
      });

      console.log(`MongoDB Connected: ${conn.connection.host}`);

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        if (process.env.NODE_ENV === 'development') {
          setTimeout(() => connectWithRetry(), 5000);
        }
      });

      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Attempting to reconnect...');
        if (process.env.NODE_ENV === 'development') {
          setTimeout(() => connectWithRetry(), 5000);
        }
      });

      return true;
    } catch (error) {
      retries++;
      console.error(`MongoDB connection error: ${error.message}`);

      if (retries < maxRetries) {
        console.log(`Retrying connection (${retries}/${maxRetries}) in 5 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return connectWithRetry();
      }

      console.error(`Failed to connect to MongoDB after ${maxRetries} attempts`);

      if (process.env.NODE_ENV === 'development') {
        throw error;
      }

      return false;
    }
  };

  return connectWithRetry();
};

module.exports = connectDB;