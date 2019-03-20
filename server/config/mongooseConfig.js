var mongoose = require('mongoose');

//export this function and imported by server.js
module.exports = function(server){

    mongoose.connect('mongodb://localhost:27017/cancionero');

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });

    mongoose.connection.once('open', function(){
        server.emit('ready'); 

        console.log("Mongoose default connection is open to ", "mongodb://localhost:27017/cancionero");
    });
}