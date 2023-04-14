const bcrypt = require('bcryptjs')

function hashPassword(profile) {
    const SALT_FACTOR = 8

    if (!profile.changed('password')) {
        return;
    }

    return bcrypt
        .genSalt(SALT_FACTOR)
        .then(salt => bcrypt.hashSync(profile.password, salt, null))
        .then(hash => {
            profile.setDataValue('password', hash)
        })
}
module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        file: {
            type: DataTypes.JSON
           },
          fullname: {
            type: DataTypes.STRING,
          },
          brandname: DataTypes.STRING,
          email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
          skill: DataTypes.STRING,
          phonenumber: DataTypes.STRING,
          date: DataTypes.STRING,
          address: DataTypes.STRING,
          socialhandle: DataTypes.STRING,
        },
        {
            hooks: {
                beforeSave: hashPassword
            }
        })
        Profile.prototype.comparePassword = function (password) {
          return bcrypt.compareSync(password, this.password)
      }
         return Profile
    }
