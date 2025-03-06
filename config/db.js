const mongoose = require('mongoose');

const {MONGODB_URI} = require('./constants');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;