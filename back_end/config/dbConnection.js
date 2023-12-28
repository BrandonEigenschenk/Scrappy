// dbConnection.js

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONN_STR, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Database connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
