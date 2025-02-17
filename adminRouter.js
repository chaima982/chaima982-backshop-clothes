const express = require('express');
const route = express.Router();

//importation de controller
const adminCont = require('../Controller/adminController');

route.post("/add", adminCont.create)
route.put("/:id", adminCont.update)
route.get("/", adminCont.gatAll)
route.delete('/delete/:id', adminCont.delete)
route.get('/get/:id', adminCont.getbyId)

//exportation
module.exports = route;