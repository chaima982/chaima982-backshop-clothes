const mongoose = require('mongoose')
const multer = require("multer");
const galleryScheme = new mongoose.Schema({
    name:{
        type: "String"
    }
});

//creation de scheme
const ProductScheme = new mongoose.Schema({
    ref:{
        type : "String",
        trim: true,
        required: true,
        unique: true,
    },
    price:{
        type: "String",
        trim: true,
        required: true,
    },
    description: {
        type: "String",
        trim: true,
        required: true,
    },
    qte:{
        type: "String",
        trim: true,
        required: true,
    },
    gallery:[galleryScheme],
    //relation entre subcategory et product
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    }
})
module.exports = mongoose.model('product',ProductScheme)