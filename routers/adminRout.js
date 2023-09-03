const mongoose = require("mongoose");
const express = require("express");
const Router = express.Router();

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);
mongoose
  .connect("mongodb://localhost:27017/idrees", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the database");

    const newAdmin = new Admin({
      username: "admin@gmail.com",
      password: "admin@123",
    });

    newAdmin
      .save()
      .then(() => {
        console.log("Admin created successfully");
      })
      .catch((err) => {
        console.log("Error creating admin:", err);
      })
      .finally(() => {
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });

Router.post("/admin", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin@gmail.com" && password === "admin@123") {
    res.render("adminHome");
  } else {
    res.send("Invalid username or password");
  }
});

module.exports = Router;
