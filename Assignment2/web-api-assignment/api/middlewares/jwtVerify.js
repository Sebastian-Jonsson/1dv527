const jwt = require('jsonwebtoken')
const respCodes = require('../../configs/respCodes')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        req.userData = jwt.verify(token, process.env.JWT_KEY)
        next()
    }
    catch (err) {
        respCodes.unAuthorized(req, res, 'Authorization failed.')
    }
}