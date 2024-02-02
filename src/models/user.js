const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        require : true
    },
    lastname : {
        type : String ,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String ,
        require : true 
    },
    picturePath : {
        type : String ,
        default : ""
    },
    friends : {
        type : Array ,
        default : []
    },
    location : String ,
    occupation  : String 
},{
    timestamps : true 
})

module.exports = mongoose.model("User" , userSchema );