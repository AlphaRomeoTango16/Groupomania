const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const database = new Sequelize({
    database: "groupomania",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false
});

module.exports = database;