const { Sequelize } = require('sequelize');
const database = new Sequelize("groupomania", "root", "16Juin1989", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false
});

module.exports = database;