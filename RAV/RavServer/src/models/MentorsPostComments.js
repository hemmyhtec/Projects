module.exports = (sequelize, DataTypes) => {
  const MentorsPostComments = sequelize.define('MentorsPostComments', {
        comment: DataTypes.STRING,
      })
     
  return MentorsPostComments
}
