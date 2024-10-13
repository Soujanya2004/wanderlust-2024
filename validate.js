const joi=require('joi');
const reviews = require('./models/reviews');


module.exports.listingSchema=joi.object(
    {
        listing:joi.object(
            {
                title:joi.string().required(),
                description:joi.string().required(),
                country:joi.string().required(),
                location:joi.string().required(),
                price:joi.number().required().min(0),
                image:joi.string().allow("",null),
            }
        ).required(),
    }
);

module.exports.reviewSchema=joi.object(
    {
        review:joi.object(
            {
                rating:joi.number().required().min(1).max(5),
                comment:joi.string().required(),
            }
        ).required(),
    }
);
