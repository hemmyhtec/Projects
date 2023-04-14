module.exports = {
    port: 8081,
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "hemmyhtec_mentor_ship",
    dialect: "mysql",
    pool: {
      max: 1000,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    authentication: {
      jwtSecret: 'secret'
    }
  };
