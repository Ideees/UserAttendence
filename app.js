const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRout");

const port = process.env.port || 8080;
const app = express();

app.use(express.static("design"));
app.use("/images", express.static("photos"));

const url = "mongodb://localhost:27017/";
mongoose.connect("mongodb://localhost:27017/idrees", {
  useNewUrlParser: true,
  useUnifiedTopology: true, //
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("error this file");
});
db.once("open", () => {
  console.log("connected");
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", homeRouter);

app.get("/leave", (req, res) => {
  res.render("leave.ejs");
});
app.get("/attendence", (req, res) => {
  res.render("attendence.ejs");
});
app.get("/register", (req, res) => {
  res.render("adminHome.ejs");
});

// fetch data mongodb

app.get("/registerDB", async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection("registerusers");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});

app.get("/leaveDB", async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection("leaveusers");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});

app.get("/attandenceDB", async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection("attandenceusers");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data", error: err });
  }
});

app.listen(port);
