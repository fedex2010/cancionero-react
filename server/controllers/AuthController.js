const { body } = require('express-validator/check');

var responseService = require('../services/responseService')
var errorService = require('../services/errorService')
var sessionService = require('../services/sessionService')
let validatorService = require('../services/validatorService')

let cryptoUtils = require("../utils/cryptoUtils")
let CancioneroError = require("../error/CancioneroError")


const UserService = require('../services/userService')
class AuthController {

  login(req, res, next) {
    let aUser
    req.getValidationResult() // to get the result of above validate fn
        .then( result => validatorService.validationHandler(result))

        .then( () => UserService.findUserByEmail( req.body.email ) )

        .then( user => {
          aUser = user
          return cryptoUtils.compare( req.body.password, user.password )
        })

        .then( areEqual => {  
          if(!areEqual){
            throw new CancioneroError("user or pass incorrect",400)
          }else{
            sessionService.setTokenCookie(res,"TOKEN")
            res.send( responseService.getResponse(200,aUser) )
          }
        })
        .catch(err => {
          next(err)
        })
  }

  logout(req, res, next) {
    let { nickName , password } = req.body
    
    /*console.log( req.body )
    
    if( nickName == "admin" && password == "admin" ){
    
      sessionService.setUserIdCookie(res,"admin")
      res.status(200).send( responseService.getResponse(200) );
  
    }else{
  
      res.status(401).send( errorService.getErrorObject(401,"User or pass incorrect") );
  
    }*/
  
  }

  //--------------------VALIDATORS--------------------------------
  checkParams(method){
    switch (method) {
      case 'login': {
        return [
          body('password').exists().withMessage("password no enviado"),
          body('email').exists().withMessage("email no enviado")
        ]
      }
    }
  }
}

module.exports = AuthController
