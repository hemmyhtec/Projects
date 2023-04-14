const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/user')
const config = require('./dbconfig')

module.exports = function(passport) {
    const opts = {}

    opts.secretOrKey = config.secret
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')

    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.find({
            id:jwt_payload.id
        },function(err, user){
            if(err){
                return done(err, false)
            }
            if(user){
                return done(null, user)
            }
            else {
                return done(null, false)
            }
        }
        )
    }))
}