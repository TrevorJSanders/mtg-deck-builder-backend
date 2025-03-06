const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const {downloadBulkImgFile} = require('./services/mtgBulkImgService');
const {downloadBulkOracleFile} = require('./services/mtgBulkOracleService');
const helloRoutes = require('./routes/hello');
const getImgMTG = require('./routes/CardMTG');
const fullLoadMTG = require('./routes/fullLoadMTG');
const {PORT} = require('./config/constants')

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Use CORS middleware
app.use(cors({
  origin: ['http://127.0.0.1:5173','http://localhost:5173', 'http://localhost']
}));

// Setup routes
app.use('/api/', helloRoutes);
app.use('/api/', fullLoadMTG);
app.use('/api/', getImgMTG);

// Schedule the cron jobs
//downloadBulkImgFile();
//downloadBulkOracleFile();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
