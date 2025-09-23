const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(`Error Type: ${err.name}`);
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = { message, status: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, status: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, status: 400 };
  }

  // MongoDB connection error
  if (err.name === 'MongooseServerSelectionError' || 
      err.name === 'MongooseError' && err.message.includes('buffering timed out')) {
    const message = 'Database connection issue. Please try again later.';
    error = { message, status: 503 };
    console.error('Database connection error:', err);
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler; 