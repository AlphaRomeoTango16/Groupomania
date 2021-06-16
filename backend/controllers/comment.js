const { Post, User, Comment } = require('../models/Index');

exports.createComment = (req, res, next) => {
    Comment.create({
        content: req.body.content
    })
    .then(() => res.status(201).json({ message: 'Commentaire publié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyComment = (req, res, next) => {
    Comment.update({
        content: req.body.content
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}