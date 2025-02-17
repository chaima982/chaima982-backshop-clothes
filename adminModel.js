const mongoose = require('mongoose');
const userMod = require("./userModel");

const adminScheme = new mongoose.Schema({

})

userMod.discriminator('admin', adminScheme)
module.exports = mongoose.model("admin")