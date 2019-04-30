var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController'),
      userController = new UserController();

/* GET users listing. */
router.post('/', userController.checkParams("create") , userController.create );

module.exports = router;
