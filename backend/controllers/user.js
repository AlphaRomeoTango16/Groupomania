const { User } = require('../models/Index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let password = req.body.password;
    if(strongRegex.test(password)){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = User.create ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
    else{
        res.send('Votre mot de passe doit contenir = une majuscule, une minuscule, un chiffre et un caractère spécial !');
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Motde passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user.isSoftDeleted,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM ACCESS TOKEN',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};