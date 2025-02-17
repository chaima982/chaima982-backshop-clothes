//creation de scheme
/*baaed scheme naamlou controller baaed router baaed test f postman*/ 
const mongoose = require('mongoose')
const CategoryScheme = new mongoose.Schema({
    name: {
        type: "String",
        trim: true,
        required: true,
    }, 
    //liaison ou relations entre les tables
    subcategory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubCategory"
        }
    ]
})

//export
module.exports = mongoose.model("category",CategoryScheme )