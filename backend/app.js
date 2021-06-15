const express = require('express');
const { load } = require('./models/Index');

const app = express();

load();

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
})

app.use((req, res, next) => {
    res.status(201);
    next();
})

app.use((req, res, next) => {
    res.json({ message: 'Votre reequête a bien été reçue !'});
    next();
})

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
    next();
})

module.exports = app;
