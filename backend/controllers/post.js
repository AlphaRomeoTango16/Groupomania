const { Post, User } = require('../models/Index');

exports.getAll = (req, res, next) => {
    Post.findAll()
    .then(listPost => res.status(200).json(listPost))
    .catch(error => res.status(400).json({ error }));
}