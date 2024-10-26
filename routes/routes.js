const express = require('express')
const router = express.Router();
const User = require("../models/user.js");
const asyncwrap = require('../utils/error.js')
const flash = require('connect-flash')
const { isLoggedIn, saveRedirectUrl, isAuthor, isOwner } = require('../middlewares/middleware.js')
const passport = require("passport")
const { index, newpost, createpost, editpost, saveEditpost, search, deletepost, showPost, signup } = require("../controllers/listing.js");
const upload = multer({ storage })
const reviews = require('../models/reviews.js')
const { deleteReview, reviewPost } = require('../controllers/reviews.js')
const multer = require('multer')
//About us page
router.get('/about', asyncwrap(async (req, res) => {
    try {
        res.render('about');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}))


//terms and conditions page
router.get('/terms', asyncwrap(async (req, res) => {
    try {
        res.render('terms');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));

//Privacy policy page
router.get('/privacy', asyncwrap(async (req, res) => {
    try {
        res.render('privacy');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}));

//CONTRIBUTORS
router.get('/contributors', asyncwrap(async (req, res) => {
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
router.get("/signup", asyncwrap(async (req, res) => {
    res.render("signup.ejs");
}));

router.post('/signup', asyncwrap(async (req, res, next) => {
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
router.route("/login")
    .get(asyncwrap((req, res) => {
        res.render("login.ejs");
    }))
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }), (req, res) => {
            req.flash("success", "Welcome back to wanderlust!");
            let redirect = res.locals.redirectUrl || "/listing";
            res.redirect(redirect); // Redirect to a route that will display the message
        });

//logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You logged out successfuly!");
        res.redirect("/listing");

    })
});


//profile page
// GET: Display Profile Page
router.get('/profile', isLoggedIn, asyncwrap(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render('profile', { user });
}));


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
router.post("/profile/upload", isLoggedIn, profileUpload.single("profilePic"), async (req, res) => {
    try {
        if (!req.file) {
            req.flash("error", "No file uploaded.");
            return res.redirect("/profile");
        }

        const userId = req.user._id; // Ensure user is logged in
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

//define listing conroller
//BUG FIX
const listingController = require('../controllers/listing.js');
const multer = require('multer');
// Create new listing form route
// app.get("/new",isLoggedIn, asyncwrap(newpost));
router.get("/listing/new", isLoggedIn, asyncwrap(listingController.newpost));

//index route
router.get("/listing", asyncwrap(index));

//create post
router.post("/listing", upload.array('listing[image]', 10), isLoggedIn, asyncwrap(createpost));

//search the listings
router.post("/listing/search", asyncwrap(search));

//edit the listings
router.get("/listing/:id/edit", isLoggedIn, isOwner, asyncwrap(editpost));

//save the updated listing
router.put('/listing/:id', isLoggedIn, isOwner, upload.array('listing[image]'), asyncwrap(saveEditpost));

//delete listing
router.delete("/listing/:id", isLoggedIn, isOwner, asyncwrap(deletepost));

router.get('/listing/:id', asyncwrap(showPost));

//review submit route
router.post("/listing/:id/review", isLoggedIn, asyncwrap(reviewPost));

//delete reviews
router.delete("/listing/:id/review/:rid", isLoggedIn, isAuthor, asyncwrap(deleteReview));

module.exports = router