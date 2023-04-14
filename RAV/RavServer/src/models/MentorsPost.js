module.exports = (sequelize, DataTypes) => {
  const MentorsPost = sequelize.define('MentorsPost', {
      file: {
        type: DataTypes.STRING
        },
        text: DataTypes.STRING,
      })
     
  return MentorsPost
}
