"use strict";

exports.validationHandler = result => {
    if (result.isEmpty()) return
    
    let err = new Error( )
    
    err.code = 400
    err.message = result.array().map(i => `${i.msg}\n`).join('')
    
    throw  err
}
