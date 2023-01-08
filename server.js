const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
 
const app = express();

dotenv.config({path: './config/config.env'});

// connect to db
connectDB();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));




//  All the get api's
app.get("/", async(req, res)=>{
  res.render("main/index");
})
app.get("/about", async(req, res)=>{
  res.render("main/about");
})
app.get("/contact", async(req, res)=>{
  res.render("main/contact");
})
app.get("/give-get", async(req, res)=>{
  res.render("main/give-get");
})
 
// All the post api's




const PORT = process.env.PORT || 8000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
