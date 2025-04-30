const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

module.exports = class UserController {
    static async register (req, res, next) {
        try{
            const user = await User.create(req.body)
            res.status(201).json({message: 'register success'})
        } catch(err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        try{
            const { email, password } = req.body

            if (!email || !password) {
                throw { name: 'BadRequest', message: 'Email or password are required' }
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw { name: 'Unauthorized', message: 'Invalid email or password' }
            }

            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) {
                throw { name: 'Unauthorized', message: 'Invalid email or password' }
            }

            console.log(user)

            const access_token = signToken({user})

            res.status(200).json({ access_token: access_token })
        } catch(err) {
            next(err)
        }
    }
} 