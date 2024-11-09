const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./reviews.js");

const imageSchema = new Schema({
  filename: {
    type: String, 
  },
  url: {
    type: String,
    required: true,
  },
});


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: [imageSchema],
  price: Number,
  location: String,
  country: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
   likes: {
    type: Number,
    default: 0, 
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tags: [String]  // New tags field
});

listingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing) {
    await Review.deleteMany({id: {$in:listing.reviews}}); //middleware to delete reviews attached to listing
  }
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
