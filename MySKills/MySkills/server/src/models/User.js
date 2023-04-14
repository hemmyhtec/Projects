const bcrypt = require('bcryptjs')

function hashPassword (user) {
    const SALT_FACTOR = 8

    if (!user.changed('password')) {
        return;
    }

    return bcrypt
    .genSalt(SALT_FACTOR)
    .then(salt => bcrypt.hashSync(user.password, salt, null))
    .then(hash => {
        user.setDataValue('password', hash)
    })
}
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
         email: {
             type: DataTypes.STRING,
             unique: true
         },
         password: DataTypes.STRING
     },
      {
         hooks: {
              beforeSave: hashPassword
         }
     })
     User.prototype.comparePassword = function (password) {
        return bcrypt.compareSync(password, this.password)
     }
     return User

}
