const {Profile} = require ('../models')
const {Post} = require ('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignprofile (profile) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(profile, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async createPost (req, res, ProfileId) {
        try {
            const post = new Post ({
              file: req.file.filename,
              posts: req.body.posts,
              ProfileId: ProfileId
            })
            const result = await post.update()
            res.send(result.toJSON())
            console.log(post)
            // const resultJson = result.toJSON()
            //         res.send({
            //             result: resultJson,
            //             token: jwtSignprofile(resultJson)
            //         })
          res.status(201).json({ message: "Post upload!" });
          } catch (error) {
            console.log(error)
            return res.status(500).send({ error: 'Something went wrong' });
          }
    },

    async put (req, res) {
      const file = req.file
      const id = req.params.id;
        try {
          const profile = new Profile({
            file: file,
            phonenumber: req.body.phonenumber,
            brandname: req.body.brandname,
            skill: req.body.skill,
            date: req.body.date,
            address: req.body.address,
            socialhandle: req.body.socialhandle
          })
          const result = await profile.update({
            where: {
              id: id
            }
          })
          res.send(result)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to update the profile'
          })
          console.log(err)
        }
      },
    async post (req, res) {
        try {
            const profile = new Profile ({
              fullname: req.body.fullname,
              email: req.body.email,
              password: req.body.password,
            })
            const result = await profile.save()
            res.send(result.toJSON())
            console.log(profile)
            const resultJson = result.toJSON()
                    res.send({
                        result: resultJson,
                        token: jwtSignprofile(resultJson)
                    })
          res.status(201).json({ message: "Done upload!" });
          } catch (error) {
            console.log(error)
            return res.status(500).send({ error: 'This email account is already in use' });
          }
    },

  async getAll (req, res) {
      try {
          const profile = await Profile.findAll({
            // order: 'createdAt DESC',
            limit: 10
          })
          res.send(profile)
          console.log(profile)
      }catch (err) {
          console.log(err)
          res.status(500).send({
              error: 'An Error has occured trying to fetching'
          }),console.log(err)
      }
  },

  async show (req, res) {
    try {
        const profile = await Profile.findById(req.params.profileId)
        res.send(profile)
        console.log(profile)
    }catch (err) {
        console.log(err)
        res.status(500).send({
            error: 'An Error has occured trying to fetching profile'
        }),console.log(err)
    }
},

  async login (req, res) {
    try {
        const {email, password} = req.body
        const profile = await Profile.findOne({
            where: {
                email: email
            }
        })
        if (!profile) {
            res.status(403).send({
                error: 'The Login Information was incorrect'
            })
        }

        const isPasswordvalid = await profile.comparePassword(password)
        if(!isPasswordvalid){
            res.status(403).send({
                error: 'The Login Information was incorrect'
            })
        }
        const profileJson = profile.toJSON()
        res.send({
            profile: profileJson,
            token: jwtSignprofile(profileJson)
        })
    } catch (err) {
        res.status(500).send({
            error: 'Error occured trying to login'
        }),console.log(err)
    }
}
}
