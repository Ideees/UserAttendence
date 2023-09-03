const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");
const attendenceSchema = require("../models/attendenceSchema");
const leaveSchema =require("../models/leaveSchema")
Router.get("/", (err, res) => {
  res.render("devil", {
    title: "",
    password: "",
    email: "",
  });
});

Router.post("/register", async (req, res) => {
  try {
    const { name, namelast, email, tel, password, Cpassword } = req.body;

    if (password === Cpassword) {
      const userData = new homeSchema({
        name,
        namelast,
        email,
        tel,
        password,
      })
      userData.save(err => {
        if (err) {
          res.render("devil", {
            title: "email already exist",
            password: " ",
            email: "",
          });
          
        } else {
          res.render("devil", {
            title: "foam submit ",
            password: " ",
            email: "",
          });
        }
            const useremail =  homeSchema.findOne({ email: email });
       if (email === useremail.email) {
         res.render("devil", {
           title: "",
           password: "email already exist",
           email: "",
         });
       }
        
      });
   

    } else {
      res.render("devil", {
        title: "",
        password: "Not match password",
        email: "",
      });
    }
  } catch (error) {
    res.render("devil", { title: "error", password: "", email: "" });
    console.log("yaha error ha catch ma");
  }
});

// login

Router.post("/login", (req, res) => {
  const { email, password } = req.body;
  homeSchema.findOne({ email: email }, (err, result) => {
    if (email === result.email && password === result.password) {
      res.render("home", { title: result.name });
    } else {
      console.log(err);
    }
    
  });
});

// attendence
Router.post("/attendance", async (req, res) => {
  try {
    const { name, email,date } = req.body;
    const attendenceUser = new attendenceSchema({
      name,
      email,
      date
    });
    attendenceUser.save();
    res.render("home", {
      title: "",
      password: "attendence Successfully",
      email: "",
      att: "",
    });
  } catch (error) {
    console.log("error");
  }
});

// leave request
Router.post("/leave", async (req, res) => {
  try {
    const { name, email, date,message } = req.body;
    const  leaveUser = new  leaveSchema({
      name,
      email,
      date,
      message
    });
     leaveUser.save();
    res.render("home", {
      title: "",
      password: "attendence Successfully",
      email: "",
      att: "",
    });
  } catch (error) {
    console.log("error");
  }
});




//admin
Router.post("/admin", (req, res) => {
  const {  username, password, } = req.body;
    if (username === "admin@gmail.com" && password === "admin@123") {
     res.render("adminHome");
     console.log("login")
   } else {
     res.send("Invalid username or password");
     console.log("fail")
   }
  });

module.exports = Router;
