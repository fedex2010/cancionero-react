const { body } = require('express-validator/check');

let errorService = require('../services/errorService')
let responseService = require('../services/responseService')
let validatorService = require('../services/validatorService')

const UserService = require('../services/userService')

class UserController {
  constructor() {

  }

  create(req,res,next){
      req.getValidationResult() // to get the result of above validate fn
          .then( result => validatorService.validationHandler(result))
          .then( () => {
              let userCreated = UserService.create( req.body )
              
              res.send(userCreated)
            })
          .catch(err => {
            console.log("--------------")
            console.log( err )
            console.log("--------------")

            next(err)
          })
  }
  
  //--------------------VALIDATORS--------------------------------
  checkParamsCreate(method){
    switch (method) {
      case 'create': {
        return [
          body('name').isLength({ min: 5 }).withMessage("El nombre debe tener un minimo de 3 caracteres"),
          body('surname').exists().withMessage("El apellido no puede ser nulo"),
          body('nickname').optional().isLength({ min: 3 }).withMessage("El nombre de usuario debe tener al menos 3 caracteres"),
          body('password').isLength({ min: 3 }).withMessage("El password debe tener al menos 3 caracteres"),
          body('email').custom(value => {
                              return User.findUserByEmail(value)
                              .then(user => {                    
                                if (user) {
                                  return Promise.reject('E-mail ya utilizado por otro usuario, utilice otro por favor');
                                }

                              }).catch( err => {throw(err)})
                            })
        ]
      }
    }
  }
  
}

module.exports = UserController