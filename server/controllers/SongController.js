const { body } = require('express-validator/check');

let errorService = require('../services/errorService')
let responseService = require('../services/responseService')
let validatorService = require('../services/validatorService')

//ESTAMOS AGREGANDO EL ELASTIC CLIENT
//y EL MIDDLEWARE DE VALICACION DE PARAMETROS

const ElasticClient = require( '../clients/ElasticClient' )
const elasticClient = new ElasticClient()

class SongController {

  constructor() {}

  findSongs(req,res,next){
    elasticClient.findSongs()
                    .then( (songs) =>{
                      res.send( songs )
                    })
                    .catch( err => next(err) )                    
  }

  create(req,res,next){

    req.getValidationResult() // to get the result of above validate fn
        .then( result => validatorService.validationHandler(result))

        /*.then( () => UserService.findUserByEmail( req.body.email ) )

        .then( user => {
          aUser = user
          return cryptoUtils.compare( req.body.password, user.password )
        })*/

        .then( areEqual => {  
          res.send("hola")
        })
        .catch(err => {
          next(err)
        })

    /*elasticClient.addSongs(req.body)
                    .then( (songs) =>{
                      res.send( songs )
                    })
              .catch( err => next(err) )                    */
  }

  //--------------------VALIDATORS--------------------------------
  checkParams(method){
    switch (method) {
      case 'create': {
        return [
          body('title').exists().withMessage("title no enviado"),
          body('author').exists().withMessage("author no enviado"),
          body('song').exists().withMessage("song no enviado"),
          body('songWithChords').optional()
        ]
      }
    }
  }
  
}

module.exports = SongController