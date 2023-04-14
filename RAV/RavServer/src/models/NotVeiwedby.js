module.exports = (sequelize, DataTypes) => {
  const NotVeiwedby = sequelize.define('NotVeiwedby', {
        viewedby: {
          type: DataTypes.STRING,
        } 
      })
     
  return NotVeiwedby
}
