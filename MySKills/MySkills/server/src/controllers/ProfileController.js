const {Profile} = require ('../models')

module.exports.post = async (req, res) => {
  const file = req.file;
  try {
    const profile = new Profile({
      file: file,
      fullname: req.body.fullname,
      brandname: req.body.brandname,
      skill1: req.body.skill1,
      skill2: req.body.skill2,
      skill3: req.body.skill3,
      skill4: req.body.skill4,
      socail_handle1: req.body.socail_handle1,
      socail_handle2: req.body.socail_handle2
    })
    const result = await profile.save()
    console.log(result)
    return res.status(201).json({ message: "Done upload!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'An Error has occured trying to upload' });
  }
},
module.exports = {
    async index (req, res) {
        try {
            const profile = await Profile.findOne({
               where: {
                   id: profile.id
               }
            })
            res.send(profile)
        }catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An Error has occured trying to fetch'
            })
        }
    },
}
