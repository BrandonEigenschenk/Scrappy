const express = require("express");

const {
    getJobList,
} = require("../controllers/controller");

const router = express.Router();

router.get("/", getJobList);

module.exports = router;