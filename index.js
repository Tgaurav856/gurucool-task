require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const {db} = require("./config/db");
const { router } = require("./routes/Routes");

db();
const app = express();
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing
setInterval(processQueue, 5000);

app.use("/api/v1",router)

app.listen(4000, () => console.log("Server running on port 5000"));