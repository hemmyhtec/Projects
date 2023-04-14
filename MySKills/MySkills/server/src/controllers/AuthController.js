const {User} = require ('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignuser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignuser(userJson)
            })
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use'
            })
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                res.status(403).send({
                    error: 'The Login Information was incorrect'
                })
            }

            const isPasswordvalid = await user.comparePassword(password)
            if(!isPasswordvalid){
                res.status(403).send({
                    error: 'The Login Information was incorrect'
                })
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignuser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'Error occured trying to login'
            })
        }
    }
}