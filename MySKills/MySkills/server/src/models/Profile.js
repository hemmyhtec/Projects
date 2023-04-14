module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
         file: {
          type: DataTypes.JSON
         },
         fullname: {
           type: DataTypes.STRING
         },
         brandname: DataTypes.STRING,
         skill1: DataTypes.STRING,
         skill2: DataTypes.STRING,
         skill3: DataTypes.STRING,
         skill4: DataTypes.STRING,
         socail_handle1: DataTypes.STRING,
         socail_handle2: DataTypes.INTEGER
     })
     return Profile
}
