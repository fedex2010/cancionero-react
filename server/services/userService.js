"use strict";

const User = require('../models/user');

class UserService{
    
    static async create(data){

        let userCreated = await User.create( User.createData(req.body) )

        return userCreated
    }    
}

module.exports = UserService