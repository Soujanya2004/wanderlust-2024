const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportlocalmongoose=require("passport-local-mongoose"); //for connecting with mongoose

const userSchema=new Schema({ 
    email:{
        type:String,
        required:true
    }  //username and password is required automatically
});
userSchema.plugin(passportlocalmongoose);  
module.exports=mongoose.model("User",userSchema); //parameters - model name and schema name
