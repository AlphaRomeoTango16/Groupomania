const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, 'RANDOM ACCESS TOKEN');
        next();

    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};