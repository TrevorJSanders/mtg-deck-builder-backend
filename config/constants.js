const dotenv = require('dotenv');

dotenv.config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
});

const {
    PORT = 5000,
    MONGODB_URI = 'mongodb+srv://trevorjsanders:nuPjiz-tachyj-fehgy3@mtg-deck-builder-db.uoc9h.mongodb.net/MTG?retryWrites=true&w=majority&appName=mtg-deck-builder-db',
    JWT_SECRET = '',
    ALLOWED_ORIGINS = 'http://localhost:3000'
} = process.env

// Validate essential environment variables
if (!MONGODB_URI) {
    console.error('MONGODB_URI is required');
    process.exit(1);
  }

module.exports = {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    ALLOWED_ORIGINS,
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
}