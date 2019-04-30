const { body } = require('express-validator/check');

var responseService = require('../services/responseService')
var sessionService = require('../services/sessionService')
let validatorService = require('../services/validatorService')

const UserService = require('../services/userService')

/* GET users listing. */
class AuthController {

  login(req, res, next) {
    req.getValidationResult() // to get the result of above validate fn
        .then( result => validatorService.validationHandler(result))

        .then( () => UserService.findUserByEmail( req.body.email ) )

        .then( user => {
          
          res.send( responseService.getResponse(200,user) )
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
