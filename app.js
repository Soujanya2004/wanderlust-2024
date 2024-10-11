if (process.env.NODE_ENV != "production") { // not to deploy .env file while uploading to git
  require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const multer = require('multer');
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage }); // destination = cloud storage
const cookieparser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo'); // to connect mongo to cloud database
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const { isLoggedIn, saveRedirectUrl, isOwner, isAuthor } = require("./middlewares/middleware.js");
const { index, newpost, createpost, editpost, saveEditpost,search, deletepost, showPost, signup } = require("./controllers/listing.js");
const { deleteReview, reviewPost } = require("./controllers/reviews.js");

const app = express();
app.use(flash());
app.use(cookieparser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // to run file from everywhere
app.use(express.urlencoded({ extended: true })); // for parsing the data
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate); // to create ejs template for every page ex. footer, navbar
app.use(express.static(path.join(__dirname, "/public"))); // to use files in public folder

const dbUrl = process.env.ATLAS_DB_TOKEN;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
  console.log("database connected");
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600,
}); // to store info of session even after refresh

store.on("error", (err) => {
  console.log("error in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions)); // used to save users login in same browser always, has session id

app.use(passport.initialize());
app.use(passport.session()); // to identify users from page to page
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // used in login
passport.deserializeUser(User.deserializeUser()); // used for logout

// Flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user; // store current session user info in currUser
  console.log("Current User: ", res.locals.currUser); // Debug log
  next();
});

// API routes
// Signup
app.get("/signup", asyncwrap(async (req, res) => {
  res.render("signup.ejs");
}));

app.post('/signup', asyncwrap(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check for missing fields
  if (!username || !password) {
    req.flash('error', 'Username and password are required');
    return res.redirect('/signup');
  }
  try {
    const newUser = new User({ username, email });
    await User.register(newUser, password);
    req.login(newUser, (err) => {
      req.flash('success', 'Welcome! You have successfully signed up.');
      res.redirect('/listing');
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/signup');
  }
}));

// Login
app.route("/login")
  .get(asyncwrap((req, res) => {
    res.render("login.ejs");
  }))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true
    }), (req, res) => {
      req.flash("success", "Welcome back!");
      let redirect = res.locals.redirectUrl || "/listing";
      res.redirect(redirect); // Redirect to a route that will display the message
    });

// Logout
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "Logged out successfully");
      res.redirect("/listing");
    }
  });
});

// Create new listing
app.get("/new", isLoggedIn, asyncwrap(newpost));

// Index route
app.get("/listing", asyncwrap(index));

// Create post
app.post("/listing", upload.single('listing[image]'), isLoggedIn, asyncwrap(createpost));

//search the listings
app.post("/listing/search",asyncwrap(search)); 

// Edit the listings
app.get("/listing/:id/edit", isLoggedIn, isOwner, asyncwrap(editpost));

// Save the updated listing
app.put('/listing/:id', isLoggedIn, isOwner, upload.single('listing[image]'), asyncwrap(saveEditpost));

// Delete listing
app.delete("/listing/:id", isLoggedIn, isOwner, asyncwrap(deletepost));

// Show listing in detail
app.get('/listing/:id', asyncwrap(showPost));

// Review submit route
app.post("/listing/:id/review", isLoggedIn, asyncwrap(reviewPost));

// Delete reviews
app.delete("/listing/:id/review/:rid", isLoggedIn, isAuthor, asyncwrap(deleteReview));

// For all invalid route error
app.use("*", (req, res, next) => {
  next(new expressError(404, "Page not found"));
});

// Error handling
app.use((err, req, res, next) => {
  let { status = 500, msg = "Something went wrong" } = err;
  res.render("error.ejs", { msg, status });
});

app.listen(8080, () => {
  console.log("Server is listening");
});
