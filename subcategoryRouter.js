const express = require('express');
const route = express.Router();

const subCategoryController = require('../Controller/subCategoryController');

route.post("/ajouter", subCategoryController.createSub)
route.get("/", subCategoryController.getAllsub)
route.put('/:id',subCategoryController.updatesub)
route.delete('/delete/:id', subCategoryController.deletesubcategory)
route.get('/get/:id',subCategoryController.getIdSub)

module.exports = route