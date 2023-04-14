const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const ProfileControler = require('./controllers/ProfileController')
const multer = require ('multer')

module.exports = (app) => {
    app.post('/register',
        AuthControllerPolicy.register,
        AuthController.register)

    app.post('/login',
        AuthController.login)

    // app.get('/profile',
    //     ProfileControler.index)
    const fileFilter = (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
      if (!allowedTypes.includes(file.mimetype)){
        const err = new Error('Incorrect File')
        console.log(err)
        return cb(err, false)
      }
      cb(null, true)
    }

  const upload = multer ({
      dest: './public',
      fileFilter,
    })
    app.post('/profile', upload.single('file'),
        ProfileControler.post)
}
