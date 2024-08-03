const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  Comments: {
    type: String,
    required: true,
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
