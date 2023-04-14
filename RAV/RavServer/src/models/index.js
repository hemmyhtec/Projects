const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/Auth')

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
      host: config.HOST,
      dialect: config.dialect,
      operatorsAliases: false,

      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      }
    }
  );

const db = {}

fs
    .readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        console.log(require)
        db[model.name] = model
    })

    Object.keys(db).forEach(function (modelName) {
      if ('associate' in db[modelName]) {
        db[modelName].associate(db)
      }
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

db.MentorProfile = require("./MentorProfile.js")(sequelize, Sequelize);
db.StudentProfile = require("./StudentProfile.js")(sequelize, Sequelize);
db.MentorsPost = require("./MentorsPost.js")(sequelize, Sequelize);
db.StudentsPost = require("./StudentsPost.js")(sequelize, Sequelize);
db.Notification = require("./Notification.js")(sequelize, Sequelize);
db.MentorsPostComments = require("./MentorsPostComments.js")(sequelize, Sequelize);
db.MentorsPostLiked = require("./MentorsPostLiked.js")(sequelize, Sequelize);
// db.User = require("./User.js")(sequelize, Sequelize);

db.MentorsPost.belongsTo(db.MentorProfile, {
    foreignKey: {
      allowNull: false
    }
})
db.MentorProfile.hasMany(db.MentorsPost, {
  onDelete: "casacade"
})

db.Notification.belongsTo(db.MentorProfile, {
  foreignKey: {
    allowNull: false
  }
})
db.MentorProfile.hasMany(db.Notification, {
    onDelete: "casacade"
})

db.MentorsPostComments.belongsTo(db.MentorProfile, {
  foreignKey: {
    allowNull: false
  }
})
db.MentorProfile.hasMany(db.MentorsPostComments, {
    onDelete: "casacade"
})

db.MentorsPostComments.belongsTo(db.MentorsPost, {
  foreignKey: {
    allowNull: false
  }
})
db.MentorsPost.hasMany(db.MentorsPostComments, {
    onDelete: "casacade"
})



db.MentorsPostLiked.belongsTo(db.MentorProfile, {
  foreignKey: {
    allowNull: false
  }
})
db.MentorProfile.hasMany(db.MentorsPostLiked, {
    onDelete: "casacade"
})

db.MentorsPostLiked.belongsTo(db.MentorsPost, {
  foreignKey: {
    allowNull: false
  }
})
db.MentorsPost.hasMany(db.MentorsPostLiked, {
    onDelete: "casacade"
})


db.StudentsPost.belongsTo(db.StudentProfile, {
  foreignKey: {
    allowNull: false
  }
})
db.StudentProfile.hasMany(db.StudentsPost, {
    onDelete: "casacade"
})

module.exports = db;