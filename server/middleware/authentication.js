const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        console.log(req.headers)

        if (!authorization) {
            throw { name: 'Unauthorized', message: 'Invalid Token' }
        }

        const token = authorization.split(' ')[1];

        const validToken = verifyToken(token)

        console.log(validToken, '<<< validToken')

        const user = await User.findByPk(validToken.id)

        // console.log(user, '<<< user')

        if (!user) {
            throw { name: 'Unauthorized', message: 'Invalid Token' }
        }

        req.user = user
        // console.log(req.user)

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication