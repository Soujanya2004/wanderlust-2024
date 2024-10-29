const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    profilePicture: {
        purl: String, // Store the file path or URL here
        pfilename: String,        
    }
});

userSchema.plugin(passportlocalmongoose);  
module.exports = mongoose.model("User", userSchema);
