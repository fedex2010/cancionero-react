"use strict";

//const uuid = require('uuid')

exports.setUserIdCookie = (res, userId) => {
    res.cookie('userId', userId, {encode: String, expires: new Date(Date.now() + 1 * 60 * 60 * 1000) })
}

//MANJET JWT
exports.setTokenCookie = (res, token) => {
    res.cookie('token', token, {encode: String, expires: new Date(Date.now() + 1 * 60 * 60 * 1000) })
}

exports.clearSessionCookies = (res) => {
    res.clearCookie('userId', { path: '/' })
}