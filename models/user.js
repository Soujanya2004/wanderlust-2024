const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    profileImage: {
        type: String, // Store the file path or URL here
        default: "../profile.png" // default profile image
    }
});

userSchema.plugin(passportlocalmongoose);  
module.exports = mongoose.model("User", userSchema);
