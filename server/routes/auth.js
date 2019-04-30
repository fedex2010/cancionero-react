var express = require('express');
var router = express.Router();

var AuthController = require("../controllers/AuthController")
var authController = new AuthController()

/* GET users listing. */
router.post('/login' , authController.checkParams("login") ,authController.login);
router.post('/logout' , authController.logout);

module.exports = router;
