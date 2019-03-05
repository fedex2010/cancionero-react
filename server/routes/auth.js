var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var errorService = require('../services/errorService')
var responseService = require('../services/responseService')

/* GET users listing. */
router.post('/login', jsonParser ,function(req, res, next) {
  let { nickName , password } = req.body
  
  if( nickName == "demian" && password == "demian" ){
    res.status(200).send( responseService.getResponse(200) );
  }else{
    res.status(401).send( errorService.getErrorObject(401,"User or pass incorrect") );
  }

});


module.exports = router;
