const User=require("../models/user.js");
const cloudinary = require('cloudinary').v2;


// Profile page
module.exports.viewProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render('profile', { user });
};
  
module.exports.profileGet = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.render('editprofile', { user });
    } catch (err) {
      console.error("Error loading profile edit form:", err);
      res.status(500).send("Error loading profile edit form.");
    }
  };
  
module.exports.profilePost = async (req, res) => {
    try {
      const { username, email, deleteProfile } = req.body;
  
      // Find the user by ID
      const user = await User.findById(req.user._id);
  
      // Update fields only if they are provided in the request
      if (username) user.username = username;
      if (email) user.email = email;
  
      // Update profile picture only if a new file is uploaded
      if(req.body.deleteProfile){
        user.profilePicture = {
          purl: null,
          pfilename: null
        }   
        // Clodinary destroyer to delete that image from cloud storage space also. 
        let filename = req.body.deleteProfile;
        await cloudinary.uploader.destroy(filename);
      } 
      else if (req.file) {
        user.profilePicture = {
          purl: req.file.path,
          pfilename: req.file.filename
        };
      }
  
      // Save the updated user document
      await user.save();
  
      // Stay logged in after change profile details.
      req.login(user, (err) => {
        if (err) {
          req.flash('error', 'Login failed.');
          return res.redirect('/login'); // Return here to prevent further execution
        }
        req.flash("success", "Profile updated successfully!");
        return res.redirect('/profile'); // Redirect after successful update
      });
  
    } catch (err) {
      // Handeling special error for network delay or slow network.
      if (err.name === 'TimeoutError') {
        console.error("Cloudinary Timeout Error:", err);
        req.flash("error", "Image not deleted due to network issue! Try again later!");
      }
      req.flash("error", "Something went wrong! Maybe this username or email already exists!");
      return res.redirect('/profile/edit');
    }
  };