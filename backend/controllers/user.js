const { User } = require('../models/Index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req, res, next) => {
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const userObject = JSON.parse(req.body.user);
    let password = userObject.password;
    if(strongRegex.test(password)){
        bcrypt.hash(password, 10)
        .then(hash => {
            if (req.file != undefined) {
                userObject.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            userObject.password =  hash;
            User.create(userObject)
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => 
            res.status(500).json({ error })
            );
    }
    else{
        res.send('Votre mot de passe doit contenir = une majuscule, une minuscule, un chiffre et un caractère spécial !');
    }
};

exports.login = (req, res, next) => {
    User.findOne({ where : { emailAddress: req.body.emailAddress } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user.id,
                        admin: user.admin,
                        token: jwt.sign(
                            { userId: user.id, userAdmin: user.admin },
                            'RANDOM ACCESS TOKEN',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    User.findByPk(req.params.id)
    .then(user => {
        if (req.token.userId == post.UserId || req.token.userAdmin) {
            let userObject = JSON.parse(req.body.user);
            if (req.file != undefined) {
                userObject.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            User.update(userObject, {where: {id: req.params.id}})
            .then(() => res.status(200).json({ message: 'Profile modifié !'}))
            .catch(error => res.status(400).json({ error }));
        } else {
            res.status(403).json({ message: "Vous n'avez pas l'autorisation pour modifié ce post !" })
        }
    })
    .catch(error => res.status(404).json({ error }));
}

exports.deleteUser = (req, res, next) => {
    User.findOne({ where : { emailAddress: req.body.emailAddress } })
        .then(user => {
            if (req.token.userId == user.id || req.token.userAdmin) {
                if (user.imageUrl != undefined) {
                    const filename = user.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    User.destroy({
                        where: {
                            emailAddress: req.body.emailAddress
                        }
                    })
                    .then(() => res.status(200).json({ message: 'Compte supprimé !'}))
                    .catch(error => res.status(400).json({ error }));  
                })
                }else{
                    User.destroy({
                        where: {
                            emailAddress: req.body.emailAddress
                        }
                    })
                    .then(() => res.status(200).json({ message: 'Compte supprimé !'}))
                    .catch(error => res.status(400).json({ error })); 
                }
            } else {
                res.status(403).json({ message: "Vous n'avez pas l'autorisation pour supprimer ce compte !" })
            }
        })
        .catch(error => res.status(500).json({ error }));
};