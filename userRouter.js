const express = require('express');
const route = express.Router();

const usercontroller = require('../Controller/userController');

route.post("/add", usercontroller.login);
route.delete('/logout', usercontroller.logout);
route.post('/refresh', usercontroller.refresh);
route.get("/verify/:codeVerification" , usercontroller.verifyMail);

module.exports = route;