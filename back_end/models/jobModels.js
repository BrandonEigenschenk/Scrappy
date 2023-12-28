// jobModels.js

const mongoose = require("mongoose");

let JobListings;

try {
    // Try to retrieve the existing model
    JobListings = mongoose.model("JobListings");
} catch (error) {
    // If the model doesn't exist, define it
    JobListings = mongoose.model("JobListings", mongoose.Schema({
        // ... your schema fields
    }));
}

module.exports = JobListings;
