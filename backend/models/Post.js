const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/connection');

module.exports = database.define("Post", {
    content: {type: DataTypes.STRING(500)}
});