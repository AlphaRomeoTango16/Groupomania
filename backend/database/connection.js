const { Sequelize } = require('sequelize');
require('dotenv').config();

const database = new Sequelize({
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false
});

module.exports = database;