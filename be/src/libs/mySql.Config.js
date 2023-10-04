const Sequelize = require("sequelize");

const sequelize = new Sequelize("hackathon_6", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
