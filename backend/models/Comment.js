const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/connection');

module.exports = database.define("Comment", {
    content: {type: DataTypes.STRING(500)}
});