const userMod = require("./userModel");
const mongoose = require('mongoose');
const multer = require("multer");

const customerScheme = new mongoose.Schema({
    address:{
        type : String,
        trim : true,
        required : true
    },
    city : {
        type : String,
        trim : true,
        required : true
    },
    cin : {
        unique : true,
        trim : true,
        required : true,
        type : String
    },
    picture : {
        type : String,
    }
})

userMod.discriminator("customer",customerScheme); //eli entre "" lezem ykounou nafs elhaja
module.exports = mongoose.model("customer")