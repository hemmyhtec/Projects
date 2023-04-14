module.exports = (sequelize, DataTypes) => {
  const StudentsPost = sequelize.define('StudentsPost', {
      file: {
        type: DataTypes.STRING
         },
        text: DataTypes.STRING,
      })
     
  return StudentsPost
}
