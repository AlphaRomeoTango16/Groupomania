const { Post, User } = require('../models/Index');

exports.getAll = (req, res, next) => {
    Post.findAll()
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
        content: req.body.content
    })
    await Post.save()
    .then(() => res.status(201).json({ message: 'Message publié !'}))
    .catch(error => res.status(400).json({ erro }));
}

exports.modifyPost = (req, res, next) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    },
    {
        where: {
            id: req.params.id
        }
    })
    await Post.save({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Message modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deletePost = (req, res, next) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(200).json({ message: 'Message supprimé !'}))
    .catch(error => res.status(400).json({ error }));
}