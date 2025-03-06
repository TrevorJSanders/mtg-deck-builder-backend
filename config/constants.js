const {
    PORT = PORT || 3000,
    MONGODB_URI,
    JWT_SECRET,
    ALLOWED_ORIGINS
} = process.env

module.exports = {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    ALLOWED_ORIGINS
}