const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const connectDB = require('./config/db');

const app = express();

// Database Connection Middleware (Ensures DB is connected before processing requests)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Database connection failed. Please check if your IP is whitelisted in MongoDB Atlas.',
      error: error.message
    });
  }
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:8080',
      'http://localhost:3000',
      'https://shopify-store-murex-zeta.vercel.app',
      'https://shopiseed-admin.vercel.app',
    ],
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

// Health check
app.get('/', (req, res) => {
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };
  const readyState = require('mongoose').connection.readyState;
  res.json({
    status: 'API is running...',
    database: states[readyState] || 'Unknown',
    environment: process.env.NODE_ENV
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
