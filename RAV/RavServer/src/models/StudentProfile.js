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
    const StudentProfile = sequelize.define('StudentProfile', {
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
        file: {
            type: DataTypes.STRING
        },
          about: DataTypes.STRING,
          interest: DataTypes.STRING,
          years_exp: DataTypes.STRING,
        },{
            hooks: {
                beforeSave: hashPassword
            }
        })
        
        StudentProfile.prototype.comparePassword = function (password) {
          return bcrypt.compareSync(password, this.password)
        }

    return StudentProfile
}

