const review=require("../models/reviews.js");
const listing=require("../models/listing.js");
const {
    SUCCESS_REVIEW_ADDED,
    ERROR_LISTING_NOT_FOUND
} = require('../constants.js');

//add review
module.exports.reviewPost = (async (req, res) => {
    const { id } = req.params;
    const list = await listing.findById(id);

    try{
        if (!list) {
            req.flash('error', ERROR_LISTING_NOT_FOUND);
            return res.redirect('/listing');
        }
    
        const newReview = new review(req.body.review);
        newReview.author = req.user._id;
        console.log("author is", newReview.author);
        list.reviews.push(newReview);
    
        await newReview.save();
        await list.save();
        console.log(list)
        req.flash('success', SUCCESS_REVIEW_ADDED);
        res.redirect(`/listing/${list.id}`);
    }catch(e) {
        console.error(e);
        req.flash('error', 'An error occurred while adding review.');
        console.log(e);
        // res.redirect(`/listing/${id}`);
    }
});

//delete a review
module.exports.deleteReview =(async (req,res) =>{
    let {id,rid} =req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:rid}}); //update the listing-reviews array where review id matched rid
    await review.findByIdAndDelete(rid); //deconstructing parameters
    req.flash("success", "Review Deleted!");
    res.redirect(`/listing/${id}`);
})
