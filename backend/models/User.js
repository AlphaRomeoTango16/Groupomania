const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/connection');

module.exports = database.define("User", {
    firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    secondName: {
        type: DataTypes.STRING(35),
        allowNull: false,
    },
    emailAdress: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
});