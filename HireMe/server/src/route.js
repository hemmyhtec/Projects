const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const ProfileControler = require('./controllers/ProfileController')
const multer = require ('multer')
// const fs = require ('fs')
// const path = require ('../public')


module.exports = (app) => {
    app.post('/login',
        ProfileControler.login) //For Creating User Account
        
        // const fileFilter = function (req, file, cb) {
        //   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
        //   if(!allowedTypes.includes(file.mimetype)){
        //     const error = new Error ("Wrong File Type") 
        //     error.code = "LIMIT_FILE_TYPES"
        //     return cb(error, false)
            
        //   }
        //     cb(null, true)
        //   }
        //  const filename = function(req, file, cb) {
        //     cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
        //   }
        // const MAX_SIZE = 3000000;

        // const upload = multer ({
        //   dest: "../public/",
        //   fileFilter,
        //   filename,
        //   limits: {
        //     fileSize: MAX_SIZE
        //   }
        // })

        const storage = multer.diskStorage({
          destination: function(req, file, cb) {
            // fs.mkdir('../uploads/', (err) => {
              cb(null, '../public/')
              // console.log(err)
            
          },

          filename: function(req, file, cb) {
            cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
          }
        })
        const fileFilter = (req, file, cb) => {
          if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
          } else {
            cb(null, false)
            const error = new Error('Wrong File, only image are allowed')
            console.log(error)
          }
        }
        const upload = multer({
          storage: storage,
          limits: {
            fileSize: 1024 * 1024 * 5
          },
          fileFilter: fileFilter
        })

    app.post('/profile',
        AuthControllerPolicy.profile,
        ProfileControler.create) //For Registing New Profile Account

    app.get('/profile',
        ProfileControler.findAll) // For getting User Profile

    app.get('/profile/:id',
        ProfileControler.findOne) // For getting User Profile

    app.put('/profile/:id',
        ProfileControler.update) //For Updating Profile
    
    app.delete('/:id',
        ProfileControler.delete) //For Updating Profile

    app.post('/posts/:ProfileId', upload.single('file'),
        ProfileControler.createPost) //For Creating Post 

    app.put('/upload/:id', upload.single('file'),
        ProfileControler.upload) //For Uploading Profile Picture 

    // app.use(function(err, req, res){
    //   if(err.code === "LIMIT_FILE_TYPES") {
    //     res.status(422).json({ error: "Only Images are allowd"})
    //     return;
    //   }
    //   if (err.code === "LIMIT_FILE_SIZE") {
    //     res.status(422).json({ error: `Too large, Max Size is ${MAX_SIZE / 1000}Kb`})
    //     return;
    //   }
    // })
}
