module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        file: {
            type: DataTypes.JSON
           },
          posts: {
            type: DataTypes.STRING,
            allowNull: false
          },
        })
        return Post
    }
