module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
      file: {
        type: DataTypes.STRING
         },
        message: {
          type: DataTypes.STRING,
          defaultValue: 'You have a new Notification'
        },
        text: {
          type: DataTypes.STRING
        } 
        
      })
     
  return Notification
}
