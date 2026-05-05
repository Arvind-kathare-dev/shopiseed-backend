const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = db.connections[0].readyState;
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // In serverless, we don't want to exit the process
  }
};

module.exports = connectDB;
