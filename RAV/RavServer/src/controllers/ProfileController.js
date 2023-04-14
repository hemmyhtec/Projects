const { MentorProfile } = require("../models");
const { StudentProfile } = require("../models");
const { StudentsPost } = require("../models");
const { Notification } = require("../models");
const { MentorsPost } = require("../models");
const { MentorsPostComments } = require("../models");
const { MentorsPostLiked } = require("../models");
// const { StudentsPost } = require ('../models')
const jwt = require("jsonwebtoken");
// const fs = require("fs")
const config = require("../config/Auth");

function jwtSignmentor(profile) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(profile, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}
function jwtSignstudent(profile) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(profile, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async createMentor(req, res) {
    const profilepicture = req.file;
    try {
      // if(file == undefined) {
      //   return res.send('You must select a file.')
      // }
      MentorProfile.create({
        profilepicture: profilepicture.filename,
        profession: req.body.profession,
        about: req.body.about,
        years_exp: req.body.years_exp,
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        role: req.body.role,
      }).then((mentorprofile) => {
        res.send(mentorprofile.toJSON());
        // console.log(file.filename);
        const resultJson = mentorprofile.toJSON();
        res.send({
          result: resultJson,
          token: jwtSignmentor(resultJson),
        });
        res
          .status(201)
          .json({ message: "Good Job!, Your Account is Successfully Created" });
        // return res.send('File has been uploaded')
      })     
      } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(`Oops! This email account is already in use...${error}`);
    }
  },
  async createCoverPicture(req, res) {
    try {
      MentorProfile.update({
        coverpicture: req.coverpicture.filename,
      }).then((coverpicture) => {
        res.send(coverpicture.toJSON());
        res
          .status(201)
          .send({ message: "Good Job!, Your Cover Picture Updated Successfully Created" });
      })     
      } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(`Oops! This email account is already in use...${error}`);
    }
  },
  async PostsComments(req, res) {
    const ProfileId = req.params.id
    try {
      MentorsPostComments.create({
        comment: req.body.comment,
        MentorProfileId: ProfileId,
        MentorsPostId: req.body.PostId
      }).then((PostsComments) => {
        res.send(PostsComments.toJSON());
        res
          .status(201)
          .send({ message: "Good Job!, Your Cover Picture Updated Successfully Created" });
      })     
      } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(`Oops! This email account is already in use...${error}`);
    }
  },
  async MentorPost(req, res) {
    // const file = req.file;
    const id = req.params.id;
    try {
      const mentorspost = new MentorsPost({
        file: req.file.filename,
        text: req.body.text,
        MentorProfileId: id,
      });
      const notification = new Notification({
        file: req.file.filename,
        text: req.body.text,
        MentorProfileId: id,
      });
      const result = await mentorspost.save();
      const Newresult = await notification.save();
      res.send(result.toJSON());
      console.log(mentorspost);
      console.log(Newresult);
      res.status(201).json({ message: "Post upload!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send(`Something went wrong${error}`);
    }
  },
  async UpdateLiked(req, res) {
    const id = req.params.id;
    try {
      MentorsPostLiked.create({
        liked: true,
        MentorProfileId: id,
        MentorsPostId: req.body.MentorsPostId,
      })
    res.status(201).json({ message: "Likedby Updated!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send(`Something went wrong${error}`);
    }
  },
  async createStudent(req, res) {
    // const file = req.file;
    try {
      const studentprofile = new StudentProfile({
        profilepicture: req.profilepicture.filename,
        name: req.body.name,
        email: req.body.email,
        interest: req.body.interest,
        number: req.body.number,
        password: req.body.password,
        about: req.body.about,
        experience: req.body.experience,
        role: req.body.role,
      });
      const result = await studentprofile.save();
      res.send(result.toJSON());
      console.log(studentprofile);
      const resultJson = result.toJSON();
      res.send({
        result: resultJson,
        token: jwtSignstudent(resultJson),
      });
      res
        .status(201)
        .json({ message: "Good Job!, Your Account is Successfully Created" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ error: "Oops! This email account is already in use..." });
    }
  },

  async StudentPost(req, res) {
    const file = req.file;
    const id = req.params.id;
    try {
      const studentspost = new StudentsPost({
        file: file.filename,
        text: req.body.text,
        StudentProfileId: id,
      });
      const result = await studentspost.save();
      res.send(result.toJSON());
      console.log(studentspost);
      res.status(201).json({ message: "Post upload!" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Something went wrong" });
    }
  },
  async loginMentor(req, res) {
    try {
      const { email, password } = req.body;
      const mentorprofile = await MentorProfile.findOne({
        // attributes: {exclude: ['password']},
        where: {
          email: email,
        },
      });
      if (!mentorprofile) {
        res.status(403).send({
          error: "The Login Information was incorrect",
        });
      }

      const isPasswordvalid = await mentorprofile.comparePassword(password);
      if (!isPasswordvalid) {
        res.status(403).send({
          error: "The Login Information was incorrect",
        });
      }
      const mentorprofileJson = mentorprofile.toJSON();
      res.send({
        mentorprofile: mentorprofileJson,
        token: jwtSignmentor(mentorprofileJson),
      });
    } catch (err) {
      res.status(500).send({
        error: "Error occured trying to login",
      }),
        console.log(err);
    }
  },
  async loginStudent(req, res) {
    try {
      const { email, password } = req.body;
      const studentprofile = await StudentProfile.findOne({
        // attributes: {exclude: ['password']},
        where: {
          email: email,
        },
      });
      if (!studentprofile) {
        res.status(403).send({
          error: "The Login Information was incorrect",
        });
      }

      const isPasswordvalid = await studentprofile.comparePassword(password);
      if (!isPasswordvalid) {
        res.status(403).send({
          error: "The Login Information was incorrect",
        });
      }
      const studentprofileJson = studentprofile.toJSON();
      res.send({
        student: studentprofileJson,
        token: jwtSignstudent(studentprofileJson),
      });
    } catch (err) {
      res.status(500).send({
        error: "Error occured trying to login",
      }),
        console.log(err);
    }
  },
  async findOne(req, res) {
    const id = req.params.id;
    MentorProfile.findByPk(id, {
      attributes: { exclude: ["password"] },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Profile with id=" + id,
        });
        console.log(err);
      });
  },
  async findStudentOne(req, res) {
    const id = req.params.id;
    StudentProfile.findByPk(id, {
      attributes: { exclude: ["password"] },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Student Profile with id=" + id,
        });
        console.log(err);
      });
  },
  async findAll(req, res) {
    try {
      const mentorprofile = await MentorProfile.findAll({
        include: [MentorsPost],
        attributes: { exclude: ["password"] },
      });
      res.send(mentorprofile);
      console.log(mentorprofile);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "An Error has occured trying to fetching",
      }),
        console.log(err);
    }
  },
  async findAllStudent(req, res) {
    try {
      const studentprofile = await StudentProfile.findAll({
        // include: [MentorsPost],
        attributes: { exclude: ["password"] },
      });
      res.send(studentprofile);
      console.log(studentprofile);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "An Error has occured trying to fetching",
      }),
        console.log(err);
    }
  },
  async findNot(req, res) {
    try {
      const notification = await Notification.findAll({
        include: [MentorProfile],
        attributes: {exclude: ['password']}
      });
      res.send(notification);
      console.log(notification);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: "An Error has occured trying to fetching",
      }),
        console.log(err);
    }
  },
};
