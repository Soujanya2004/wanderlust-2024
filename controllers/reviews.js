const review=require("../models/reviews.js");
const listing=require("../models/listing.js");
const {
    SUCCESS_REVIEW_ADDED,
    ERROR_LISTING_NOT_FOUND
} = require('../constants.js')
module.exports.reviewPost = (async (req, res) => {
    const { id } = req.params;
    const list = await listing.findById(id);

    if (!list) {
        req.flash('error', ERROR_LISTING_NOT_FOUND);
        return res.redirect('/listing');
    }

    const newReview = new review(req.body.review);
    newReview.author = req.user._id;
    list.reviews.push(newReview);

    await newReview.save();
    await list.save();

    req.flash('success', SUCCESS_REVIEW_ADDED);
    res.redirect(`/listing/${list._id}`);
});
module.exports.deleteReview =(async (req,res) =>{
    
    let {id,rid} =req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:rid}}); //update the listing-reviews array where review id matched rid
    await review.findByIdAndDelete(rid); //deconstructing parameters
    res.redirect(`/listing/${id}`);
})
