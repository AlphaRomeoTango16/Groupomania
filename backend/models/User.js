const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/connection');

module.exports = database.define("User", {
    firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(35),
        allowNull: false,
    },
    emailAddress: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: 'email'
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING(500)
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});