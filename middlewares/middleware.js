const listing=require("../models/listing.js");
const reviews=require("../models/reviews.js");
const { ERROR_LOGIN_REQUIRED, ERROR_NO_PERMISSION, ERROR_NOT_AUTHOR } = require('../constants.js');

module.exports.isLoggedIn=(req,res,next) =>{
    if(!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error",ERROR_LOGIN_REQUIRED);
        return res.redirect("/login");
    }
    next();
} //to ensure user is logged in while edit and create

module.exports.saveRedirectUrl=(req,res,next) =>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
//to save the path user triggered after redirect to login first
 module.exports.isOwner=async (req,res,next) => {
    let {id} =req.params;
    const editList = await listing.findById(id);
    if (!req.user || !editList.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error', ERROR_NO_PERMISSION);
        return res.redirect(`/listing/${id}`);
    }
    next();
 }

 module.exports.isAuthor=async (req,res,next) => {
    let {id,reviewId} =req.params;
    const review = await reviews.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash('error', ERROR_NOT_AUTHOR);
        return res.redirect(`/listing/${id}`);
    }
    next();
 }
 
//ADMIN ACESS
 module.exports.isAdmin=async (req, res, next) =>{
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    res.status(403).send("Access denied.");
}
