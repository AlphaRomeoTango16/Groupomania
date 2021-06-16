const express = require('express');
const { load } = require('./models/Index');

/* Importationdes routers */
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

/* Connexion à la base de donnée */
load();

const app = express();

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
