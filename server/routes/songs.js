var express = require('express');
var router = express.Router();

const SongController = require( '../controllers/SongController' )
const songController = new SongController()

//AGREGAR MIDDLEWARE DE VALIDACION
router.get('/songs' , songController.findSongs );
router.post('/songs' , songController.checkParams("create") ,songController.create );


module.exports = router;



/*
CURSO 
ANGULAR 7
https://mega.nz/?fbclid=IwAR3xFMRKI1nOyeDa2JJLNc4C2R7QJQG-8o6QY1O4aBANGSp3DVSQpWnhVu0#F!frAGTCKD!JAJp4w9SN64xm0ngdS7ZfQ!PiJwhQJS
*/