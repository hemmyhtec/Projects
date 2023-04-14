module.exports = (sequelize, DataTypes) => {
  const MentorsPostLiked = sequelize.define('MentorsPostLiked', {
      liked: DataTypes.BOOLEAN,
      })
     
  return MentorsPostLiked
}
