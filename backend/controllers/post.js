const { Post, User, Comment } = require('../models/Index');
const fs = require('fs');

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
    let post = JSON.parse(req.body.post);
    post.UserId = req.token.userId;
    if (req.file != undefined) {
        post.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    Post.create(post)
    .then(() => res.status(201).json({ message: 'Message publié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then(post => {
        if (req.token.userId == post.UserId || req.token.userAdmin) {
            Post.update({
                title: req.body.title,
                content: req.body.content,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).json({ message: 'Message modifié !'}))
            .catch(error => res.status(400).json({ error }));
        } else {
            res.status(403).json({ message: "Vous n'avez pas l'autorisation pour modifié ce post !" })
        }
    })
    .catch(error => res.status(404).json({ error }));
}

exports.deletePost = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then( post => {
        if (req.token.userId == post.UserId || req.token.userAdmin) {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({ message: 'Message supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            })
        } else {
            res.status(403).json({ message: "Vous n'avez pas l'autorisation pour supprimé ce post !" })
        }
    })
    .catch(error => res.status(404).json({ error }));
}