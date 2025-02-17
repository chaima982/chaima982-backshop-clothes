const userMod = require("./userModel")
const mongoose = require ('mongoose')

const providerScheme = new mongoose.Schema({
    matricule : {
        type : String,
        required : true,
        unique : true,
        trim: true
    },
    company : {
        type : String,
        required : true,
        trim: true
    },
    service : {
        type : String,
        required : true,
        trim: true
    },
    //relation entre ptovider et product
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
});

//exportation
userMod.discriminator('provider',providerScheme)
module.exports= mongoose.model("provider")