"use strict";

exports.getResponse = (code, payload = { ok : true } ) =>{
    return {
            code : code,
            payload : payload
        }
}
