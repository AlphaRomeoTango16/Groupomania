const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/connection');

/* Modèle pour les commentaires */

module.exports = database.define("Comment", {
    content: {type: DataTypes.STRING(500)},
    imageUrl: {type: DataTypes.STRING(500)}
});