const asyncHandler = require("express-async-handler");

const getJobList = asyncHandler(async (req, res) => {
    const {keyword, location, query_length} = req.body;
    if (!keyword || !location || !query_length) {
        res.status(400);
        throw new Error("Invalid request");
    }
    else if (query_length > 100) {
        res.status(400);
        throw new Error("Too many results requested");
    }
    else {
        res.status(200).json("YOOOOOO YOU ARE GAY");
    }
});

module.exports = {getJobList};