const mongoose = require('mongoose')
const subCategoryScheme = new mongoose.Schema({
    name: {
        type: "String",
        trim: true,
        required: true,
    },
    description: {
        type: "String",
        trim: true,
        required: true,
    },
    //relation entre subcategory et category
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category" //jebneha mel export eli fel model product
    },
    //relation entre subcategory et product
    product:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product" //jebneha mel export eli fel model product
        }
    ]  
})

module.exports = mongoose.model("SubCategory",subCategoryScheme)
