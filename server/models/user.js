//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,required: true
  },
  surname: {
    type: String,required: true
  },
  nickname : String,
  password: {
    type: String,required: true
  },
  email: {
    type: String,required: true
  },
  status: {
    type: String,required: true
  },
  type: {
    type: String,required: true
  },
  created: {
    type: String,required: true
  }
});

UserSchema.statics.createData = function(params,type = "USER",status="ACTIVE") {
  const { name, surname, nickname, password ,email} = params
              
  let data = {
    name,surname,nickname,password,email,
    type : type,
    status : status,
    created : new Date().toUTCString()
  }

  return data
}

UserSchema.statics.findUserByEmail = function(mail) {
  return this.findOne({ email: mail });
}


//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', UserSchema );