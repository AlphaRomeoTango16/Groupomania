const { Post, User, Comment } = require('../models/Index');
const fs = require('fs');

exports.getAllPost = (req, res, next) => {
    Post.findAll({
        include: [User, {model: Comment, include: User}]
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
    let postObject = JSON.parse(req.body.post);
    postObject.UserId = req.token.userId;
    if (req.file != undefined) {
        postObject.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }

    Post.create(postObject)
    .then(() => res.status(201).json({ message: 'Message publié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.modifyPost = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then(post => {
        if (req.token.userId == post.UserId || req.token.userAdmin) {
            let postObject = JSON.parse(req.body.post);
            if (req.file != undefined) {
                postObject.imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }
            Post.update(postObject, {where: {id: req.params.id}})
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
    .then(post => {
        if (req.token.userId == post.UserId || req.token.userAdmin) {
            if (post.imageUrl != undefined) {
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
            }else{
                Post.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({ message: 'Message supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            }
        } else {
            res.status(403).json({ message: "Vous n'avez pas l'autorisation pour supprimé ce post !" })
        }
    })
    .catch(error => res.status(404).json({ error }));
}