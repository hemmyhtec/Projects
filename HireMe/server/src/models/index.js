const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')

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

db.profile = require("./Profile.js")(sequelize, Sequelize);
db.post = require("./Post.js")(sequelize, Sequelize);

// db.profile.hasMany(db.post);
// db.post.belongsTo(db.profile, {
//   foreignKey: "profileid",
// });
db.profile.hasMany(db.post);
db.post.belongsTo(db.profile);

module.exports = db;