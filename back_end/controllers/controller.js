const asyncHandler = require("express-async-handler");
const monmodel = require("../models/jobModels")

const getJobList = asyncHandler(async (req, res) => {
    const {keyword, location, query_length} = req.body;
    try {
        const data = await YourModel.find({});
        res.status(200).json(data);
    }
    catch (err) {
        console.error(`An error has occuerd: ${err}`);

    }
});

module.exports = {getJobList};