const mongoose = require('mongoose');

const {MONGO_URI_MTG} = require('./constants');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI_MTG);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;