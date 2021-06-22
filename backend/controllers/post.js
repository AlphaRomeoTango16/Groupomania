const { Post, User } = require('../models/Index');

exports.getAllPost = (req, res, next) => {
    Post.findAll({
        include:User
    })
    .then(listPost => res.status(200).json(listPost))
    .catch(error => res.status(400).json({ error }));
}

exports.getOnePost = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

exports.createPost = (req, res, next) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        UserId: req.token.userId
    })
    .then(() => res.status(201).json({ message: 'Message publié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then(post => {
        if (req.token.userId == post.UserId) {
            Post.update({
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).json({ message: 'Message modifié !'}))
            .catch(error => res.status(400).json({ error }));
        } else {
            res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifié ce post !" })
        }
    })
    .catch(error => res.status(404).json({ error }));
}

exports.deletePost = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then( post => {
        if (req.token.userId == post.UserId) {
            Post.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).json({ message: 'Message supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        } else {
            res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimé ce post !" })
        }
    })
    .catch(error => res.status(404).json({ error }));
}