const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/connection');

module.exports = database.define("Post", {
    title: {type: DataTypes.STRING(50)},
    content: {type: DataTypes.STRING(500)}
});