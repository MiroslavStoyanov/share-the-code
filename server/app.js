require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("./helpers/jwt");
const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.Promise = global.Promise;
mongoose
    .connect(MONGODB_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(jwt());

module.exports = app;