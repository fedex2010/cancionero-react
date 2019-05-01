const bcrypt = require('bcrypt');
const saltRounds = 10;

class CryptoUtils {

    generateHash(password) {
        return bcrypt.hash(password, saltRounds)
    }

    compare(password,passwordHashed) {
        return bcrypt.compare(password, passwordHashed)
    }

}


module.exports = new CryptoUtils()
