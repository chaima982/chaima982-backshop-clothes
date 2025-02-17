const mongoose = require('mongoose')

//heritage
const baseOption = {
    discriminatorKey: "itemtype", //bch tkhalini naati type de privilege wala de donnees heritees
    collections: 'users' //esm el collection kemla
}

const userScheme = new mongoose.Schema({
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        verified: {
            type: Boolean,
            default: false

        },
        codeVerification: {
            type: String,
        },
    },
    baseOption
); //heritage

module.exports = mongoose.model("user", userScheme)