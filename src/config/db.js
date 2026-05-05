const mongoose = require('mongoose');

// Disable buffering globally so we get immediate errors if not connected
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Don't exit process in some environments (like serverless), but for now we keep it
    // process.exit(1);
    throw error; // Throw so caller can handle it
  }
};

module.exports = connectDB;
