const express = require('express');
const cors = require('cors');
const { ALLOWED_ORIGINS, PORT, IS_PRODUCTION } = require('./config/constants');
const connectDB = require('./config/db');

//const {downloadBulkImgFile} = require('./services/mtgBulkImgService');
//const {downloadBulkOracleFile} = require('./services/mtgBulkOracleService');
const helloRoutes = require('./routes/hello');
const getImgMTG = require('./routes/CardMTG');
const fullLoadMTG = require('./routes/fullLoadMTG');

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
      if (IS_PRODUCTION) {
        console.error(`CORS block: ${origin} not in allowed list: ${allowedOrigins.join(', ')}`);
      } else {
        console.log(`CORS notice: ${origin} not in allowed list: ${allowedOrigins.join(', ')}`);
      }
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
  console.log(`Server running in ${IS_PRODUCTION ? 'production' : 'development'} mode on port ${PORT}`);
});
