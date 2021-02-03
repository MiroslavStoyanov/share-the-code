require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        if(process.env.NODE_ENV === "development") {
            console.log("Connected to %s", MONGODB_URL);
            console.log("App is running ... \n");
            console.log("Press CTRL + C to stop the process. \n");
    }})
    .catch(err => {
        console.error("App starting error:", err.message);
        process.exit(1);
    });

const db = mongoose.connection;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const port = process.env.NODE_ENV === "production" ? (process.env.PORT || 80) : 3000;
app.listen(port, () => {
	console.log("Server listening on port " + port);
});

app.all("*", function(req, res) {
	throw new Error("Page not found.");
});