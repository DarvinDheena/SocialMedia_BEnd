const mongoose = require('mongoose');

const postSchema =new  mongoose.Schema({
    userId : {
        type : String ,
        require : true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Boolean,
        default : false 
    },
    comments: {
        type: Array,
        default: [],
    },
    },
    { timestamps: true }
  );

  module.exports =  mongoose.model("Post" , postSchema);
