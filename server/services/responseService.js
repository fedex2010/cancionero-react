"use strict";

exports.getResponse = (code, response = { ok : true } ) =>{
    return {
            code : code,
            response : response
        }
}
