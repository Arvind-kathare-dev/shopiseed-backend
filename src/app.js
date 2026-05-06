const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

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

// Health check
app.get('/', (req, res) => {
  const dbStatus = require('mongoose').connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({
    status: 'API is running...',
    database: dbStatus,
    environment: process.env.NODE_ENV
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
