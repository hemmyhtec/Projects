const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config/dbconfig')

const functions = {
    addNew: function (req, res) {
        if(!req.body){
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            const newUser = User(req.body)
            newUser.save(function (err, newUser){
                if(err){
                    res.json({success: false, msg: 'Failed to save'})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        } 
    },
    auth: function(req, res){
        User.findOne({
            name: req.body.name
        }, 
            function(err, user){
                if(err) throw err
                if(!user){
                    res.status(403).send({success: false, msg: 'Auth Failed, User not found'})
                }
                else{
                    user.comparePassword(req.body.password, function(err, isMatch){
                        if(isMatch && !err){
                            const token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token})
                        }
                        else{
                            return res.status(403).send({success: false, msg: 'Auth failed, wrong password'})
                        }
                    })
                }
            })
    },
    getinfo: function (req, res) {
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1]
            const decodedtoken = jwt.decode(token, config.secret)
            return res.json({success: true, msg: 'Hello' + decodedtoken.name})
        }
        else {
            return res.json({success: false, msg: 'No Header'})
        }
    }
}

module.exports = functions