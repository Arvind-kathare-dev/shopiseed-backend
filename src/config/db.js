const mongoose = require('mongoose');

let isConnected = false;

// Disable buffering for all models
// This prevents Mongoose from waiting for a connection that isn't established
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    
    isConnected = db.connections[0].readyState;
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    isConnected = false;
    throw error; // Throwing error so the caller knows it failed
  }
};

module.exports = connectDB;
