const express = require ('express');
const route = express.Router();

const productController = require('../Controller/productController');
const upload = require('../middlewares/uploadFile');
/*photos heki chnektbouha fel postman*/
route.post("/adddd",upload.array('photos') /*khater aana plusieurs imgs */, productController.create)
route.get("/", productController.getAll)
route.put('/:id',upload.array('photos'),productController.update)
route.delete('/delete/:id', productController.deleteprod)
route.get('/get/:id', productController.getId)

module.exports = route