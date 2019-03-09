let errorService = require('../services/errorService')
let responseService = require('../services/responseService')


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
}

module.exports = SongController