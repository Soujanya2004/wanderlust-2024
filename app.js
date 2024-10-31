if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const port = 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const reviews = require("./models/reviews.js");
const asyncwrap = require("./utils/error.js");
const expressError = require("./utils/expressError.js");
const multer = require('multer');
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });
const cookieparser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");
const { isLoggedIn, isAdmin } = require("./middlewares/middleware.js");
const {saveRedirectUrl}=require("./middlewares/middleware.js");
const {isOwner,isAuthor}=require("./middlewares/middleware.js");
const {index, newpost, createpost, editpost, saveEditpost,search, deletepost, showPost, signup}=require("./controllers/listing.js");
const { deleteReview, reviewPost } = require("./controllers/reviews.js");
const cors = require('cors');
const fs = require('fs');
const { promisify } = require('util');
const { contactUsController } = require("./controllers/contactUs.js");


app.use(cors({
  origin: 'http://your-frontend-domain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cookieparser());

const dbUrl = process.env.ATLAS_DB_TOKEN;

async function main() {
  await mongoose.connect(dbUrl);
  console.log("database connected");
}

main().catch(err => console.log(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.json());


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600,
});

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

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user;

  //Customize the profile image and make it available for front end.
  let originalUrl = req.user.profilePicture.purl;
  modifiedProfilePic = originalUrl.replace("/upload", "/upload/q_auto,e_blur:50,w_250,h_250");
  res.locals.profilePic = modifiedProfilePic;
  // ,c_fill,r_max
  next();
});


// ADMIN
// ADMIN


app.get('/admin/dashboard',isLoggedIn ,isAdmin, async (req, res) => {
  try {
    const listings = await listing.find();
    // console.log(listings);
    res.render('adminDashboard', { listings });
  } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).send('Internal Server Error');
  }
});


//manage users
app.get('/admin/users',isLoggedIn ,isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.render('manageUser', { users });
  } catch (error) {
      console.error('Error fetching Users:', error);
      res.status(500).send('Internal Server Error');
  }
});

//route to delete users
app.delete('/admin/user/:id',isLoggedIn, isAdmin, async (req, res) => {
  try {
    console.log("Deleting user with ID:", req.params.id);
      await User.findByIdAndDelete(req.params.id);
      req.flash('success', 'User deleted!');
      res.redirect('/admin/users');
  } catch (error) {
      res.status(500).send('Error deleting user: ' + error.message);
  }
});

// Route to DELETE listings
app.delete('/admin/listing/:id',isLoggedIn, isAdmin, async (req, res) => {
  try {
    console.log("Deleting listing with ID:", req.params.id);
      await listing.findByIdAndDelete(req.params.id);
      req.flash('success', 'Listing deleted!');
      res.redirect('/admin/dashboard');
  } catch (error) {
      res.status(500).send('Error deleting listing: ' + error.message);
  }
});

// ADMIN
// ADMIN


// Default route for '/' path
app.get("/", asyncwrap(async (req,res) => {

    const listings = await listing.find();
    res.render("index.ejs", { listings });
  
})); 

app.get("/contact",  (req, res) => {
	try {
		res.render("contact");
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
}); 

app.post("/contact", asyncwrap(contactUsController));

//About us page
app.get('/about',asyncwrap ( async (req, res) => {
  try {
    res.render('about');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}));

// Terms and conditions page
app.get('/terms', asyncwrap(async (req, res) => {
  try {
    res.render('terms');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}));

// Privacy policy page
app.get('/privacy', asyncwrap(async (req, res) => {
  try {
    res.render('privacy');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}));

// CONTRIBUTORS
app.get('/contributors', asyncwrap(async (req, res) => {
  try {
    res.render("contributors.ejs");
  } catch (err) {
    console.error("Error fetching contributors:", err);
    req.flash("error", err);
    return res.redirect("/listing");
  }
}));

// API
// Signup
app.get("/signup", asyncwrap(async (req, res) => {
  res.render("signup.ejs");
}));

app.post('/signup', asyncwrap(async (req, res, next) => {
  const { username, email, password, cnfPassword } = req.body;

  if (!username || !password || !cnfPassword ) {
    req.flash('error', 'All the fields are required');
    return res.redirect('/signup'); // Return to ensure single response
  }

  if(password !== cnfPassword){
    req.flash('error', 'Both password value should be same!');
    return res.redirect('/signup');
  }

  try {
    const newUser = new User({ username, email });
    await User.register(newUser, password); 
    req.login(newUser, (err) => {
      if (err) {
        req.flash('error', 'Login failed.');
        return res.redirect('/signup'); // Return here to prevent further execution
      }
      req.flash('success', 'Welcome! Account created successfully.');
      return res.redirect('/listing'); // Return here for single response
    });
  } catch (err) {
    req.flash('error', err.message);
    return res.redirect('/signup'); // Return to ensure single response
  }
}));

// Login Route: Ensure return after authentication
app.route("/login")
.get( asyncwrap ((req,res) =>{
  res.render("login.ejs");
}))
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true
}), (req, res) => {
  req.flash("success", "Welcome back to wanderlust!");
  //admin login
  if(req.user.isAdmin) {
    req.flash("success","Welcome back to wanderlust! You are an admin.");
    res.redirect("/admin/dashboard");
  }
  let redirect=res.locals.redirectUrl||"/listing";  
  res.redirect(redirect); // Redirect to a route that will display the message
});
  
 
  app.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err); // Passes error to next middleware if logout fails
      }
      req.flash("success", "You logged out successfully!");
      return res.redirect("/listing"); // Return to ensure single response
    });
  });

// Profile page
app.get('/profile', isLoggedIn, asyncwrap(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render('profile', { user });
}));

app.get("/profile/edit", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render('editprofile', { user });
  } catch (err) {
    console.error("Error loading profile edit form:", err);
    res.status(500).send("Error loading profile edit form.");
  }
});

app.post('/profile/edit', isLoggedIn, upload.single("profileimage"), async (req, res) => {
  try {
    const { username, email } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user._id);

    // Update fields only if they are provided in the request
    if (username) user.username = username;
    if (email) user.email = email;

    // Update profile picture only if a new file is uploaded
    if (req.file) {
      user.profilePicture = {
        purl: req.file.path,
        pfilename: req.file.filename
      };
    }

    // Save the updated user document
    await user.save();
    req.flash("success", "Profile updated successfully!");
    return res.redirect('/profile'); // Redirect after successful update

  } catch (err) {
    console.error("Error updating profile:", err);
    req.flash("error", "Something went wrong! Maybe this username or email already exists!");
    return res.redirect('/profile/edit');
  }
});


// Listing controller
const listingController = require('./controllers/listing.js');
// Create new listing form route
app.get("/listing/new", isLoggedIn, asyncwrap(listingController.newpost));
// Listing routes
app.get("/listing", asyncwrap(index));
app.post("/listing", upload.array('listing[image]', 10), isLoggedIn, asyncwrap(createpost));
app.post("/listing/search", asyncwrap(search));
app.get("/listing/:id/edit", isLoggedIn, isOwner, asyncwrap(editpost));
app.put('/listing/:id', isLoggedIn, isOwner, upload.array('listing[image]', 10), asyncwrap(saveEditpost));
app.delete("/listing/:id", isLoggedIn, isOwner, asyncwrap(deletepost));
app.get("/listing/:id", asyncwrap(showPost));

// Reviews
app.post("/listing/:id/review", isLoggedIn, asyncwrap(reviewPost));
app.delete("/listing/:id/review/:reviewId", isLoggedIn, isAuthor, asyncwrap(deleteReview));

// Catch-all for invalid routes
app.use("*", (req, res) => {
  res.render("not_found.ejs");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, msg = "Something went wrong" } = err;
  if (res.headersSent) {
    return next(err); // Exit if headers already sent
  }
  res.status(status);
  res.render("error.ejs", { msg, status });
});

app.listen(port, () =>{
    console.log("server is listening on port", port);
});
