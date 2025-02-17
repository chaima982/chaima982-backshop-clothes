const express = require('express');
const route = express.Router();

const providercontrol = require('../Controller/providerController')

route.post("/add", providercontrol.create)
route.get("/", providercontrol.getAll)
route.put('/:id',providercontrol.update)
route.delete('/delete/:id', providercontrol.delete)
route.get('/get/:id', providercontrol.getId)

module.exports = route 