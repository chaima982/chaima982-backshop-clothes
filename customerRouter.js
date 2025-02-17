const express = require('express');
const route = express.Router();
const customerController = require('../Controller/customerController');

const upload = require('../middlewares/uploadFile');

route.post("/add", upload.single('pic'), customerController.create)
route.get("/", customerController.gatAll)
route.put('/:id', upload.single('pic'), customerController.update)
route.delete('/delete/:id', customerController.delete)
route.get('/get/:id', customerController.getId)

module.exports = route