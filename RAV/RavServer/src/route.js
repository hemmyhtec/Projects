const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const ProfileControler = require('./controllers/ProfileController')
const multer = require ('multer')


module.exports = (app) => {
    app.post('/loginmentor',
        ProfileControler.loginMentor) //Login Mentor Route
    app.post('/loginstudent',
        ProfileControler.loginStudent) //Login Student Route
        
        const storage = multer.diskStorage({
          destination: function(req, file, cb) {
            // fs.mkdir('../uploads/', (err) => {
              cb(null, './public/images/')
              // console.log(err)
            
          },

          filename: function(req, file, cb) {
            cb(null, `${Date.now()}-hemmyhtec-${file.originalname}`)
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

    // app.post('/user',
    //     AuthControllerPolicy.profile,
    //     ProfileControler.User) //For Registing New Mentor Account
    app.post('/mentor',
        AuthControllerPolicy.profile,
        upload.single('profilepicture'),
        ProfileControler.createMentor) //For Registing New Mentor Account
    app.post('/student',
        AuthControllerPolicy.profile, upload.single('file'),
        ProfileControler.createStudent) //For Registing New Mentor Account
    app.post('/mentorpost/:id',
        upload.single('file'),
        ProfileControler.MentorPost) //For Registing New Post for Mentor Account
    app.post('/studentpost/:id',
        upload.single('file'),
        ProfileControler.StudentPost) //For Registing New Post for Mentor Account
    app.post('/comments/:id',
        ProfileControler.PostsComments) //For Comment Post on Mentor Account
    app.post('/liked/:id',
        ProfileControler.UpdateLiked) //For Comment Post on Mentor Account
    app.put('/coverpicture/:id',
        upload.single('file'),
        ProfileControler.createCoverPicture) //For Uploading cover public Mentor Account
    app.get('/notifications',
        ProfileControler.findNot) // For getting User Profile
    app.get('/user',
    ProfileControler.findAll) // For getting Mentor Profile
    app.get('/profile/:id',
        ProfileControler.findOne) // For getting Mentor Profile
    app.get('/student/:id',
        ProfileControler.findStudentOne) // For getting Student Profile
    app.get('/mentors',
        ProfileControler.findAll) // For getting Student Profile
    app.get('/students',
        ProfileControler.findAllStudent) // For getting Student Profile

    // app.put('/profile/:id',
    //     ProfileControler.update) //For Updating Profile
    
    // app.delete('/:id',
    //     ProfileControler.delete) //For Updating Profile

    // app.post('/posts/:ProfileId', upload.single('file'),
    //     ProfileControler.createPost) //For Creating Post 

    // app.put('/upload/:id', upload.single('file'),
    //     ProfileControler.upload) //For Uploading Profile Picture 

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
