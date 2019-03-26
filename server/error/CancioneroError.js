

class CancioneroError extends Error{
    constructor(message = "",code = 500) {
        super();
       
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);

        this.message = message
        this.code = code
    }
}

module.exports = CancioneroError