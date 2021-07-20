const { Sequelize } = require('sequelize');
require('dotenv').config();

/* Paramètres de connection pour la base de données via dotenv (voir fichier .env) */

const database = new Sequelize({
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false
});

module.exports = database;