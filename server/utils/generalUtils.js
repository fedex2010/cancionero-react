module.exports.isUndefined = function(object) {
    return typeof(object) === "undefined";
}

module.exports.isUndefinedOrEmpty = function(object) {
    return (typeof(object) === "undefined") || object === "";
}

module.exports.toArray = function(object) {
    return [ object ];
}
