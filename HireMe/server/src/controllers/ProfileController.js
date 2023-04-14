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
    async create (req, res) {
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
  async login (req, res) {
    try {
        const {email, password} = req.body
        const profile = await Profile.findOne({
          // attributes: {exclude: ['password']},
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
    },
    async findAll (req, res) {
      try {
        const profile = await Profile.findAll({
          attributes: {exclude: ['password']},
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
    async findOne (req, res) {
        const id = req.params.id;
        Profile.findByPk(id, {
          attributes: {exclude: ['password']}
        })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Profile with id=" + id
            });
            console.log(err)
          });
    },
    async update (req, res) {
        const id = req.params.id

        Profile.update(req.body, {
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Profile was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Profile with id=" + id
            });
            console.log(err)
          });
    },
    async delete (req, res) {
        const id = req.params.id;

        Profile.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Profile was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Profile with id=" + id
            });
            console.log(err)
          });
    },
    async createPost (req, res, ProfileId) {
        const file = req.file
        // const ProfileId = req.params.ProfileId
        try {
            const post = new Post ({
              file: file.filename,
              posts: req.body.posts,
              ProfileId: ProfileId
            })
            const result = await post.save()
            res.send(result.toJSON())
            console.log(post)
          res.status(201).json({ message: "Post upload!" });
          } catch (error) {
            console.log(error)
            return res.status(500).send({ error: 'Something went wrong' });
          }
    },
    async upload (req, res) {    
      const id = req.params.id
        await Profile.update(req.file, {
            where: {
              id: id
            }
          })
          // console.log(req.file)
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Profile was updated successfully."
              });
            } else {
              res.status(500).send({
                message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Profile with id=" + id
            });
            console.log(err)
          });
        }
}
