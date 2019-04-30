"use strict";

const User = require('../models/user');

class UserService{
    
    static async create(data){
        
        try{
            let dataToCreate = User.createData( data )
            const user = new User( dataToCreate );
            const newUser = await user.save()

            return newUser
        }catch(err){
            //logger.error("Error creating user with data " + JSON.stringify(data))
            throw err
        }
    }    

    static async findUserByEmail(email){
        try{
            return await User.findUserByEmail(email)
        }catch(err){
            //logger.error("findUserByEmail with email " + JSON.stringify(data))
            throw err
        }
    }
}

module.exports = UserService