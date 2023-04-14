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
    const MentorProfile = sequelize.define('MentorProfile', {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
          password: DataTypes.STRING,
          role: DataTypes.STRING,
          number: DataTypes.STRING,
        profilepicture: {
            type: DataTypes.STRING
        },
        coverpicture: {
            type: DataTypes.STRING
        },
          about: DataTypes.STRING,
          profession: DataTypes.STRING,
          years_exp: DataTypes.STRING,
        },
        {
            hooks: {
                beforeSave: hashPassword
            }
        })
        MentorProfile.prototype.comparePassword = function (password) {
          return bcrypt.compareSync(password, this.password)
        }
    return MentorProfile
}

