//importation de express
const express = require('express');
const database = require("./database");
const cors = require('cors');



const app = express();
const port = 8000

//ba3ed router
app.use(express.json());


app.use(cors());

//baaed m na3mlou router na3mloulou el importation fel server.js
const categoryRoute = require("./Router/categoryRouter");
const subCatRout = require('./Router/subcategoryRouter');
const productRoute = require('./Router/productRouter');
const providerRoute = require('./Router/providerRouter');
const customerRoute = require('./Router/customerRouter');
const adminRoute = require('./Router/adminRouter');
const userRoute = require('./Router/userRouter');

//path parent ba3ed creation de router
app.use('/category', categoryRoute)
app.use('/subCategory', subCatRout)
app.use('/product', productRoute)
app.use('/provider', providerRoute)
app.use('/customer', customerRoute)
app.use('/admin', adminRoute)
app.use('/users', userRoute)

//routing
app.get("/", function(req, res) {
    res.send("Welcome to E-commerce")
})

app.get("/getImage/:img", function(req, res) { //__dirname hia esm el dossier
    res.sendFile(__dirname + "/storages/" + req.params.img)
})

//listen
app.listen(port, function() {
    console.log("listen http://localhost:8000")
})