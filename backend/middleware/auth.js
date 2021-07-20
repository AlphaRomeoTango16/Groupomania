const jwt = require('jsonwebtoken');

/**
 * Fonction permettant d'authentifier l'utilisateur via JsonWebToken
 * @param {Request} req la requête http qui a été reçu par le serveur
 * @param {Result} res la réponse à la requête
 * @param {function} next fonction suivante
 */

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, '736A5F1D28A1DB19CB83E80DA8ABF10B0AAB02297B771F82F64C9909DBD170C1');
        next();

    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};