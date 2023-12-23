const express = require("express");
const connectDB = require("./config/dbConnection");

const app = express();
const port = 3000

connectDB();

app.use(express.json());
app.use("/api/getlist", require("./routes/routes"));

app.listen(port, () => console.log(`Server is running on port ${port}`));