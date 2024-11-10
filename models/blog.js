const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blog Schema
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    location: {
        type: String, // Store the location as a string
        required: true
    },
    blogOwner: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
        ref: "User", // This will allow you to associate the blog with a user (owner)
        required: true
    },
    likes: {
        type: Number,
        default: 0 // Default likes count is 0
    },
    images: [{
        imgUrl: {
            type: String, // Store the image URL or file path
            required: false
        },
        imgFilename: {
            type: String, // Store the filename of the image
            required: false
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the current date as the created date
    },
    updatedAt: {
        type: Date,
        default: Date.now // Automatically set the current date as the updated date
    }
});

// Middleware to update `updatedAt` on update
blogSchema.pre('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

// Model for Blog
module.exports = mongoose.model("Blog", blogSchema);
