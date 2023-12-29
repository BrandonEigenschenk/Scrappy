const asyncHandler = require("express-async-handler");
const JobListings = require("../models/jobModels");

const getJobList = asyncHandler(async (req, res) => {
    try {
        const data = await JobListings.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = {getJobList};