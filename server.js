const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');

//login requirements
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override') 
 
//Schema's
const User = require('./models/User');
const Food = require('./models/Food');


const app = express();

dotenv.config({path: './config/config.env'});

// connect to db
connectDB();


// Middlewares
const initializePassport = require('./passport-config') 
initializePassport(passport);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// User Registration
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('User/login')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('User/register')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))


app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.number
    });
    const user = await newUser.save(); 
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
      }
    res.redirect('/login');
  });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}


// Protected Routes
app.get('/createFood', checkAuthenticated, async(req, res) => {
  res.render('foods/createFood', { name: req.user.name, email: req.user.email })
})

app.post('/createFood', checkAuthenticated, async(req, res) => {
  try {
  const food = new Food(req.body.food);
  const{image} = food;
  
  await food.save(); 
  res.redirect(`/foods/${food._id}`);
  } catch (error) {
    res.redirect('/createFood');
  }
})
app.get('/foods', checkAuthenticated, async(req, res)=>{
  const foods = await Food.find({});
  res.render("foods/allFoods", {foods});
})

app.get("/foods/:id", checkAuthenticated, async (req, res) => {
  const food = await Food.findById(req.params.id);
  res.render("foods/foodItem", { food });
});

//  All the get api's
app.get("/", checkAuthenticated, async(req, res)=>{ 
  res.render('main/index', { name: req.user.username })
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
