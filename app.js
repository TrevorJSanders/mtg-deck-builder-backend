const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
//const {downloadBulkImgFile} = require('./services/mtgBulkImgService');
//const {downloadBulkOracleFile} = require('./services/mtgBulkOracleService');
const helloRoutes = require('./routes/hello');
const getImgMTG = require('./routes/CardMTG');
const fullLoadMTG = require('./routes/fullLoadMTG');
const {PORT, ALLOWED_ORIGINS} = require('./config/constants')

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = ALLOWED_ORIGINS ? ALLOWED_ORIGINS.split(',') : [];
    if(!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Setup routes
app.use('/api/', helloRoutes);
app.use('/api/', fullLoadMTG);
app.use('/api/', getImgMTG);

// Schedule the cron jobs
//downloadBulkImgFile();
//downloadBulkOracleFile();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
