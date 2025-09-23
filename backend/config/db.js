const mongoose = require('mongoose');

const connectDB = async () => {
    const maxRetries = 3;
    let retries = 0;
    
    // Use a default MongoDB URI for local development if not provided
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techuniqueiit';
    
    const connectWithRetry = async () => {
        try {
            console.log(`MongoDB connection attempt ${retries + 1}/${maxRetries + 1} to ${mongoUri}...`);
            
            const conn = await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000, // Increased from 5000ms to 30000ms
                socketTimeoutMS: 60000, // Increased from 45000ms to 60000ms
                connectTimeoutMS: 30000, // Added explicit connect timeout
                heartbeatFrequencyMS: 10000, // Added heartbeat frequency
                retryWrites: true,
                maxPoolSize: 50 // Increase connection pool size
            });

            console.log(`MongoDB Connected: ${conn.connection.host}`);
            
            // Add connection error handler
            mongoose.connection.on('error', (err) => {
                console.error('MongoDB connection error:', err);
                if (process.env.NODE_ENV === 'development') {
                    setTimeout(() => connectWithRetry(), 5000);
                }
            });
            
            // Add disconnection handler
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
                await new Promise(resolve => setTimeout(resolve, 5000));
                return await connectWithRetry();
            } else {
                console.error(`Failed to connect to MongoDB after ${maxRetries} attempts`);
                
                // In development, throw the error to exit the process
                if (process.env.NODE_ENV === 'development') {
                    throw error;
                }
                
                // In production, return false but don't crash the server
                return false;
            }
        }
    };
    
    return await connectWithRetry();
};

module.exports = connectDB; 