const express = require('express');
const route = express.Router();
//importer le controller
const categoryController = require('../Controller/categoryController');

route.post("/add", categoryController.create)
route.get("/", categoryController.getAll)
route.put('/:id',categoryController.update)
route.delete('/delete/:id', categoryController.deletecategory)
route.get('/get/:id', categoryController.getbyId)

module.exports = route