const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging line
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;