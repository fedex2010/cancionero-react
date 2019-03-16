// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SchemaUser = new Schema({
  name              : String,
  surname           : String,
  nickname          : String,
  password          : String,
  type              : String,
  status            : String,
  created           : Date,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', SchemaUser );