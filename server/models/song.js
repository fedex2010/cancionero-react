// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SchemaSong = new Schema({
    author          : String,
    title           : String,
    alabanza        : String,
    type            : String,
    status          : String,
    created         : Date
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Song', SchemaSong );
