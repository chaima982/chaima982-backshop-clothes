//import mongoose
const mongoose = require("mongoose")

//cnx lel mongodb
const database = "mongodb://0.0.0.0:27017/e_commerces";

//connexion
const db = mongoose.connect(database, (err)=> {
    if(!err){
        console.log("connected to the DB");
    } else {
        console.log(err);
    }
});

module.exports = db;