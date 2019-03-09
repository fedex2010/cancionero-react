var express = require('express');
var router = express.Router();

const SongController = require( '../controllers/SongController' )
const songController = new SongController()

const { query } = require('express-validator/check')

router.get('/songs' , songController.findSongs );

//query('query', 'query doesnt exists').exists()

module.exports = router;



/*
CURSO 
ANGULAR 7
https://mega.nz/?fbclid=IwAR3xFMRKI1nOyeDa2JJLNc4C2R7QJQG-8o6QY1O4aBANGSp3DVSQpWnhVu0#F!frAGTCKD!JAJp4w9SN64xm0ngdS7ZfQ!PiJwhQJS

*/