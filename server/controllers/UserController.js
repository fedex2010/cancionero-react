const { body } = require('express-validator/check');

let responseService = require('../services/responseService')
let validatorService = require('../services/validatorService')
let sessionService = require('../services/sessionService')

const UserService = require('../services/userService')

class UserController {

  create(req,res,next){
      req.getValidationResult() // to get the result of above validate fn
          .then( result => validatorService.validationHandler(result))

          .then( () => UserService.create( req.body ) )

          .then( userCreated => {
            sessionService.setTokenCookie(res,"UN_TOKEN")

            res.send( responseService.getResponse(201,userCreated) )
          })
          .catch(err => {

            next(err)
          })
  }
  
  //--------------------VALIDATORS--------------------------------
  checkParams(method){
    switch (method) {
      case 'create': {
        return [
          body('name').isLength({ min: 3 }).withMessage("El nombre debe tener un minimo de 3 caracteres"),
          body('surname').exists().withMessage("El apellido no puede ser nulo"),
          body('password').isLength({ min: 3 }).withMessage("El password debe tener al menos 3 caracteres"),
          body('email').custom(checkDuplicateMail)
        ]
      }
    }
  }  
}

function checkDuplicateMail(mail){
  return UserService.findUserByEmail(mail)
    .then(user => {                    
      if (user) {
        return Promise.reject('E-mail ya utilizado por otro usuario, utilice otro por favor');
      }
    }).catch( err => {throw(err)})
}

module.exports = UserController