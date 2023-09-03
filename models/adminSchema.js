 const mongoose = require("mongoose");
const express = require("express");
const Router = express.Router();
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
  
module.exports = Router;
