const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required: true,
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        require : true,
    },

},{timestamps:true});

const user = mongoose.model("user",userSchema);

module.exports = user;