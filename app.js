if (process.env.NODE_ENV != "production") { 
  require('dotenv').config();
}

const port = 8080;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const asyncwrap = require("./utils/error.js");
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
const {index, newpost, createpost, editpost, saveEditpost,search, deletepost, showPost, bookinfFt, signup, likeListing, topListings }=require("./controllers/listing.js");
const { dashboard, showuser, deleteUser, deleteListing, viewIndividualListing, viewListingReview, adminListEditRender, adminSaveEditList, showFeedbacks, deleteFeedback, displayFeedback } = require("./controllers/admin.js");
const { signupRender, siggnedUp, logout, forgotPassword, passwordResetLink, resetPasswordTokenGet, resetPasswordTokenPatch, updatePasswordGet, updatePasswordPost } = require("./controllers/user.js")
const { viewProfile, profileGet, profilePost } = require("./controllers/profile.js");
const { contactPage, aboutPage, termsPage, privacyPage, contributors } = require("./controllers/others.js");
const { deleteReview, reviewPost } = require("./controllers/reviews.js");
const feedbackController = require('./controllers/feedback');

// const { feedbackPost } = require("./controllers/feedback.js");

const cors = require('cors');
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
  res.locals.currUser = req.user || null;

  // Check if profile picture exists; if not, use a default URL
  if (req.user && req.user.profilePicture && req.user.profilePicture.purl) {
    let originalUrl = req.user.profilePicture.purl;
    let modifiedProfilePic = originalUrl.replace("/upload", "/upload/q_auto,e_blur:50,w_250,h_250");
    res.locals.profilePic = modifiedProfilePic;
  }
  next();
});



// ADMIN
// ADMIN

app.get('/admin/dashboard',isLoggedIn ,isAdmin, asyncwrap(dashboard));

app.get('/admin/users',isLoggedIn ,isAdmin, asyncwrap(showuser));


//ADMIN
app.delete('/admin/user/:id',isLoggedIn, isAdmin, asyncwrap(deleteUser));

app.delete('/admin/listing/:id',isLoggedIn, isAdmin, asyncwrap(deleteListing));


app.get('/admin/listing/:id',isLoggedIn, isAdmin,asyncwrap(viewIndividualListing));

app.get('/admin/reviews/:id',isLoggedIn, isAdmin,asyncwrap(viewListingReview));

app.get('/admin/listing/edit/:id',isLoggedIn, isAdmin, asyncwrap(adminListEditRender));

app.put('/admin/listing/edit/:id',isLoggedIn, isAdmin, upload.array('listing[image]',10), asyncwrap(adminSaveEditList));

app.get('/admin/feedbacks', isLoggedIn, isAdmin, asyncwrap(showFeedbacks));

app.delete('/admin/feedbacks/:id',isLoggedIn, isAdmin, asyncwrap(deleteFeedback));

app.post('/admin/feedbacks/:id/toggleDisplay', isLoggedIn, isAdmin, asyncwrap(displayFeedback));


// ADMIN
// ADMIN


// Default route for '/' path
app.get("/", asyncwrap(async (req,res) => {

    const listings = await listing.find();
    res.render("index.ejs", { listings });
  
})); 

// Others page
app.get("/contact", contactPage);
app.post("/contact", asyncwrap(contactUsController));
app.get('/about',asyncwrap (aboutPage));
app.get('/terms', asyncwrap(termsPage));
app.get('/privacy', asyncwrap(privacyPage));
app.get('/contributors', asyncwrap(contributors));

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


app.get("/signup", asyncwrap(signupRender))

app.post('/signup', asyncwrap(siggnedUp))

app.get("/logout", (logout));

app.get('/forgot-password', forgotPassword);

app.post('/resetlink-password', passwordResetLink);


app.get('/resetPassword/:token', resetPasswordTokenGet);

app.patch("/resetPassword/:token", resetPasswordTokenPatch);

app.get('/user/updatePass', isLoggedIn, updatePasswordGet);

app.post('/user/updatePass', isLoggedIn, updatePasswordPost);


// Profile
app.get('/profile', isLoggedIn, asyncwrap(viewProfile));
app.get("/profile/edit", isLoggedIn, profileGet);
app.post('/profile/edit', isLoggedIn, upload.single("profileimage"), profilePost);

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
app.post('/listing/:id/like', isLoggedIn, asyncwrap(listingController.likeListing));    
app.get('/top-listings', listingController.topListings);
// Booking page
app.get('/listing/:id/booking', bookinfFt);
// Feedback
app.get("/feedback", isLoggedIn, asyncwrap(feedbackController.renderFeedback));
app.post("/feedback", isLoggedIn, asyncwrap(feedbackController.feedbackPost));


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
  console.log("The error is --> ", err);
  if (res.headersSent) {
    return next(err); // Exit if headers already sent
  }
  res.status(status);
  res.render("error.ejs", { msg, status });
});

app.listen(port, () =>{
    console.log("server is listening on port", port);
});
