const review=require("../models/reviews.js");
const listing=require("../models/listing.js");
const {
    SUCCESS_REVIEW_ADDED,
    ERROR_LISTING_NOT_FOUND
} = require('../constants.js');

module.exports.reviewPost = async (req, res) => {
    const { id } = req.params;
    const list = await listing.findById(id).populate('reviews');

    try {
        if (!list) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listing');
        }

        // Check if the current user has already left a review
        const existingReview = list.reviews.find(review => review.author.equals(req.user._id));

        if (existingReview) {
            req.flash('error', 'You have already left a review for this listing.');
            return res.redirect(`/listing/${id}`);
        }

        // Set the limit of 700 charecter maximum for comment
        const newReview = new review(req.body.review);
        if(newReview.Comments.length > 700){
            req.flash('error', 'Maximum 700 charecters are allowed for review!');
            return res.redirect(`/listing/${id}`);
        }
        newReview.author = req.user._id;
        list.reviews.push(newReview);

        await newReview.save();
        await list.save();

        req.flash('success', 'Review added successfully!');
        res.redirect(`/listing/${list.id}`);
    } catch (e) {
        console.error(e);
        req.flash('error', 'An error occurred while adding your review.');
        res.redirect(`/listing/${id}`);
    }
};


//delete a review
module.exports.deleteReview =(async (req,res) =>{
    let {id,reviewId} =req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}); //update the listing-reviews array where review id matched rid
    await review.findByIdAndDelete(reviewId); //deconstructing parameters
    req.flash("success", "Review Deleted!");
    res.redirect(`/listing/${id}`);
})

