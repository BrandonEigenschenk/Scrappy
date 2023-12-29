const express = require("express");
const connectDB = require("./config/dbConnection");
// const JobListings = require("./models/jobModels");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

connectDB(); 
app.use(cors());
const corsOptions = {
    origin: "http://localhost:5173"
}

app.use("/getData", cors(corsOptions), require("./routes/routes.js"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
