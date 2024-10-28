if(process.env.NODE_ENV!="production") { //not to deploy .env file while uploading to git
  require('dotenv').config();
}

const port = 8000;
const express =require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const reviews=require("./models/reviews.js");
const asyncwrap=require("./utils/error.js");
const expressError=require("./utils/expressError.js");
const multer  = require('multer')
const {storage}=require("./cloudConfig.js")
const upload = multer({storage});  //destination =cloud storage
const cookieparser=require("cookie-parser");
const session=require("express-session");
const MongoStore = require('connect-mongo'); //to connect mongo to cloud database
const flash = require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");
const { isLoggedIn } = require("./middlewares/middleware.js");
const {saveRedirectUrl}=require("./middlewares/middleware.js");
const {isOwner,isAuthor}=require("./middlewares/middleware.js");
const {index, newpost, createpost, editpost, saveEditpost,search, deletepost, showPost, signup}=require("./controllers/listing.js");
const { deleteReview, reviewPost } = require("./controllers/reviews.js");
const cors = require('cors'); // CORS added

//delte old profile pics and to avoid ERR_HTTP_HEADERS_SENT Error
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink); // Promisify fs.unlink


// Use CORS for all routes
app.use(cors({
  origin: 'http://your-frontend-domain.com', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cookieparser());

const dbUrl=process.env.ATLAS_DB_TOKEN;

async function main() {
  await mongoose.connect(dbUrl);
  console.log("database connected");
}

main().catch(err => console.log(err));


app.set("views", path.join(__dirname, "views"));  //to run file from everywhere
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "/public"))); //to use files in public folder
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));  //for parsing the data
app.engine('ejs', ejsMate); //to create ejs template for every page ex. footer,navbar
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



const store =MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter:24*3600,
});//to store info of session even after refresh


store.on("error", ()=>{
  console.log("error in mongo session store", err);
})

const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized: true,
  cookie:{
    expires:Date.now() +7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly : true,
  },
};



app.use(session(sessionOptions)); //used to save users login in ame browser always, has session id
app.use(flash());


app.use(passport.initialize());
app.use(passport.session()); //to identify users from page to page
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //used in login
passport.deserializeUser(User.deserializeUser()); //used for logout

//flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser=req.user; //storecurrent session user info in currUser
  // console.log(res.locals);
  next();
});

//About us page
app.get('/about',asyncwrap ( async (req, res) => {
  try {
      res.render('about');
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
}));

//terms and conditions page
app.get('/terms',asyncwrap ( async (req, res) => {
  try {
      res.render('terms');
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
}));

//Privacy policy page
app.get('/privacy',asyncwrap ( async (req, res) => {
  try {
      res.render('privacy');
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
}));

//CONTRIBUTORS
app.get('/contributors',asyncwrap(async (req, res) => {
  try {
      res.render("contributors.ejs");
  } catch (err) {
      console.error("Error fetching contributors:", err);
      req.flash("error", err);
      return res.redirect("/listing");
  }
}));

  //API
  //signup
  app.get("/signup",asyncwrap (async(req,res) => {
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
      req.flash('success', 'Welcome! Account created successfully.');
      res.redirect('/listing');
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/signup');
  }
}));

//login
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
  let redirect=res.locals.redirectUrl||"/listing";  
  res.redirect(redirect); // Redirect to a route that will display the message
});
  
  //logout
  app.get("/logout",(req,res,next) =>{
    req.logout((err) =>{
      if(err) {
       return  next(err);
      }
        req.flash("success","You logged out successfuly!");
        res.redirect("/listing");
      
    })
});

//profile page
// GET: Display Profile Page
app.get('/profile', isLoggedIn,asyncwrap( async (req, res) => {
  const user = await User.findById(req.user._id);
  res.render('profile', { user });
}));

// GET: Render Edit Profile Form
app.get("/profile/edit", isLoggedIn, async (req, res) => {
  try {
      const user = await User.findById(req.user._id);
      res.render('editprofile', { user });
  } catch (err) {
      console.error("Error loading profile edit form:", err);
      res.status(500).send("Error loading profile edit form.");
  }
});

// POST: Update Profile Details
app.post('/profile/edit', isLoggedIn, async (req, res) => {
  try {
      const { username, email } = req.body;
      if (!email) throw new Error("Email is required.");

      const user = await User.findById(req.user._id);
      user.username = username;
      user.email = email;

      await user.save();
      res.redirect('/listing');
  } catch (err) {
      console.error("Error updating profile:", err);
      res.status(400).send("Profile update failed. Make sure all required fields are filled.");
  }
});


//define listing conroller
//BUG FIX
const listingController = require('./controllers/listing.js');

// Create new listing form route
// app.get("/new",isLoggedIn, asyncwrap(newpost));
app.get("/listing/new", isLoggedIn, asyncwrap(listingController.newpost));



// Configure separate multer storage for profile uploads if using local storage
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
  }
});
const profileUpload = multer({ storage: profileStorage });


// Route for handling profile image upload
app.post("/profile/upload", isLoggedIn, profileUpload.single("profilePic"), async (req, res) => {
  try {
      if (!req.file) {
          req.flash("error", "No file uploaded.");
          return res.redirect("/profile");
      }

      const userId = req.user._id; // Ensure user is logged in
      const user = await User.findById(userId);

      if (user.profileImage) {
        const oldImagePath = path.join(__dirname, user.profileImage);
        
        // Check if file exists before deleting
        if (fs.existsSync(oldImagePath)) {
          try {
            await unlinkAsync(oldImagePath);
            console.log("Old profile image deleted successfully.");
        } catch (err) {
            console.error("Error deleting old image:", err);
        }
        } else {
            console.log("Old image file not found, skipping deletion.");
        }
    }

      const imagePath = `/uploads/${req.file.filename}`;

      // Update the user's profile image path in the database
      await User.findByIdAndUpdate(userId, { profileImage: imagePath });
      
      req.flash("success", "Profile image uploaded successfully.");
      res.redirect("/profile");
  } catch (err) {
      console.error("Error uploading profile image:", err);
      req.flash("error", "Error uploading profile image.");
      res.status(500).redirect("/profile");
  }
});


//index route
app.get("/listing",asyncwrap(index));

//create post
app.post("/listing", upload.array('listing[image]', 10), isLoggedIn, asyncwrap(createpost));

//search the listings
app.post("/listing/search",asyncwrap(search)); 

//edit the listings
app.get("/listing/:id/edit",isLoggedIn,isOwner,asyncwrap(editpost));

//save the updated listing
app.put('/listing/:id', isLoggedIn,isOwner,upload.array('listing[image]'), asyncwrap(saveEditpost));

//delete listing
app.delete("/listing/:id",isLoggedIn,isOwner,asyncwrap(deletepost));

app.get('/listing/:id', asyncwrap(showPost));

//review submit route
app.post("/listing/:id/review", isLoggedIn, asyncwrap(reviewPost));
 
//delete reviews
app.delete("/listing/:id/review/:rid",isLoggedIn,isAuthor,asyncwrap(deleteReview));

//for all invalid route error
app.use("*",(req,res,next) =>{
  res.render("not_found.ejs");
// next(new expressError(404,"page not found"));
})

  //error handling
  app.use((err,req,res,next) =>{
  
  let{status=500,msg="Something went wrong"}=err;
  res.render("error.ejs",{msg,status});
})

app.listen(port, () =>{
    console.log("server is listening on port", port);
});