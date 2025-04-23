const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("database is connected"))
    .catch((err) => console.log(err.message));
};

module.exports = connectDB;
