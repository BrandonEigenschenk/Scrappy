// server.js

const express = require("express");
const connectDB = require("./config/dbConnection");
const JobListings = require("./models/jobModels");

const app = express();
const port = process.env.PORT || 3000;

connectDB(); // Ensure database connection is established

app.get("/getData", async (req, res) => {
    try {
        const data = await JobListings.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
