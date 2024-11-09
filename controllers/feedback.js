const Feedback = require("../models/feedback");

module.exports.feedbackPost = async(req, res) => {
    // console.log("Feedback route accessed");

    try{
        if(!req.body.feedback){
            // console.log("No feedback data found");
            req.flash("error", "No feedback data found!");
            return res.status(404).send("Please provide valid Feedback data.");
        }
        const { name, rating, comment } = req.body.feedback;
        // console.log("Feedback data: ", req.body.feedback);

        // If name is not provided, set it to the username of the logged-in user
        const feedbackName = name || req.user.username;

        // If rating is not provided, set it to 3
        const feedbackRating = rating || 3;

        const newFeedback = new Feedback({
            name: feedbackName,
            rating: feedbackRating,
            comment,
        });

        await newFeedback.save();

        req.flash("success", "Submitted. It will be displayed after sometime!");
        return res.redirect("/feedback");
    }
    catch(err){
        console.log("Error occured on Feedback: ", err);
        req.flash("error", "An error occurred while submitting the feedback.");
        return res.redirect("/listing");
    }
}



module.exports.renderFeedback = async(req, res) => {
    try{
        const feedbacks = await Feedback.find({ display: true });
        res.render("displayFeedback.ejs", {feedbacks});
    }
    catch {
        req.flash("error", "Error in fetching feedbacks!")
        return res.redirect("/listing");
    }
    
}