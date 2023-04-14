const User = require("../models/users.model");
const bcryptjs = require("bcryptjs");
const auth = require("../middleware/auth");

async function login({ username, password }, callback) {
  const user = await User.findOne({ username });

  if (user != null) {
    if (bcryptjs.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(username);
      return callback(null, { ...user.toJSON(), token });
    } 
    else {
      return callback({
        message: "Invalid Username/Password",
      });
    }
  }
  else {
    return callback({
      message: "User Not Found",
    });
  }
}

async function register(params, cb) {
  console.log(params.username)

  if (params.username === undefined) {
    return cb({ message: "Username is Required" });
  }

  const user = new User(params);
  user
    .save()
    .then((response) => {
      return cb(null, response);
    })
    .catch((err) => {
      return cb(err);
    });
}

module.exports = {
  login,
  register,
};
