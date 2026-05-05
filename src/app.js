const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'], // Added 8080 for admin panel
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
