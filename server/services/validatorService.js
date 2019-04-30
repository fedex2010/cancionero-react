"use strict";

let CancioneroError = require("../error/CancioneroError")
    
exports.validationHandler = result => {
    console.log(result.array())

    if (result.isEmpty()) return
    
    let message = result.array().map(i => `${i.msg}\n`).join('')
    
    throw new CancioneroError(message,400)
}
