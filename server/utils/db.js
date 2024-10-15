require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI

const connectDb = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewURLParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

// Helper for ensuring connection is open
const ensureConnection = async () => {
    if (mongoose.connection.readyState === 0) {
      await connectDb();
    }
  };

module.exports = { connectDb, ensureConnection };