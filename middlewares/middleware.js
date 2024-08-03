const listing=require("../models/listing.js");
const reviews=require("../models/reviews.js");

module.exports.isLoggedIn=(req,res,next) =>{
    if(!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must login");
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
      req.flash('error', "You don't have permission");
      return res.redirect(`/listing/${id}`);
    }
    next();
 }

 module.exports.isAuthor=async (req,res,next) => {
    let {id,rid} =req.params;
    const review = await reviews.findById(rid);
    if (!review.author.equals(res.locals.currUser._id)) {
      req.flash('error', "You are not the Author");
      return res.redirect(`/listing/${id}`);
    }
    next();
}
