var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var errorService = require('../services/errorService')
var responseService = require('../services/responseService')
var sessionService = require('../services/sessionService')

/* GET users listing. */
class AuthController {

  constructor() {}

  signin(req, res, next) {
    let { nickName , password } = req.body
    
    console.log( req.body )
    
    if( nickName == "admin" && password == "admin" ){
    
      sessionService.setUserIdCookie(res,"admin")
      res.status(200).send( responseService.getResponse(200) );
  
    }else{
  
      res.status(401).send( errorService.getErrorObject(401,"User or pass incorrect") );
  
    }
  
  }

  register(req, res, next) {
    let { nickName , password } = req.body
    
    console.log( req.body )
    
    if( nickName == "admin" && password == "admin" ){
    
      sessionService.setUserIdCookie(res,"admin")
      res.status(200).send( responseService.getResponse(200) );
  
    }else{
  
      res.status(401).send( errorService.getErrorObject(401,"User or pass incorrect") );
  
    }
  
  }

  
}

module.exports = AuthController
