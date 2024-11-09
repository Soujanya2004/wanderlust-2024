const User=require("../models/user.js");
const sendMail = require("../mail/template/forgotpassword.js");
const crypto = require('crypto');

// Signup
module.exports.signupRender = async (req, res) => {
    res.render("signup.ejs");
};
  
module.exports.siggnedUp = async (req, res, next) => {
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
};
  

    
   
module.exports.logout = (req, res, next) => {
      req.logout((err) => {
        if (err) {
          return next(err); // Passes error to next middleware if logout fails
        }
        req.flash("success", "You logged out successfully!");
        return res.redirect("/listing"); // Return to ensure single response
      });
};
  
module.exports.forgotPassword = (req, res) => {
    res.render('forgot-password.ejs');
  };
  
module.exports.passwordResetLink = async (req, res, next) => { 
  
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      req.flash('error', 'No user found with that email');
      return res.redirect('/forgot-password');
    }
    
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    user.passwordresetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
  
    await user.save({ validateBeforeSave: false });
  
    const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
  
    const message = `password Reset Link: ${resetURL}`;
  
    try {
      sendMail({
        email: user.email,
        subject: "password Resend Request",
        text: message,
      }, next);
  
      res.status(200).json({
        status: 'success',
        message: "Password reset link send to the user's email"
      });
    }
    catch (error) {
      console.error("Error sending email:", error); 
      user.passwordresetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return res.status(500).json({
        status: 'fail',
        message: "There was an error sending the email, please try again."
      });
    }
    
  };
  
module.exports.resetPasswordTokenGet = (req, res) => {
    const token = req.params.token;
    res.render('resetPassword.ejs', { token });
  };
  
module.exports.resetPasswordTokenPatch = async (req, res) => {
  
    try {
      const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
      console.log("Incoming Token:", req.params.token);
      console.log("Hashed Token:", token);
  
      const user = await User.findOne({ 
        passwordresetToken: token, 
        passwordResetTokenExpires: { $gt: Date.now() }
      });
  
      if (!user) {
          console.log("No user found or token expired");
          return res.status(400).json({
              status: 'fail',
              message: 'Password reset token is invalid or expired'
          });
      }
      await user.setPassword(req.body.password);
    
      user.passwordresetToken = undefined;
      user.passwordResetTokenExpires = undefined;
      user.passwordResetAt = Date.now();
  
      await user.save();
      
      res.status(200).json({
        status: 'success',
        message: "Password reset successful",
      });
    }
    catch (error) {
      console.error('Error during password reset:', error);
      res.status(500).json({
          status: 'error',
          message: 'There was an error resetting your password. Please try again.'
      });
  }
  
};
  
  //update-password..
  
 module.exports.updatePasswordGet = (req, res) => {
    res.render('update-password.ejs'); 
  };
  
  module.exports.updatePasswordPost = async (req, res) => {
    const { currentPass, newPass } = req.body;
  
    try {
       
        const user = await User.findById(req.user._id);
       
        const isMatch = await user.authenticate(currentPass);
        if (!isMatch) {
            req.flash('error', 'Current password is incorrect');
            return res.redirect('/profile/update-password');
        }
       
        await user.setPassword(newPass);
        await user.save();
  
        req.flash('success', 'Password updated successfully');
        res.redirect('/profile');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong. Please try again.');
        res.redirect('/profile/update-password');
    }
};