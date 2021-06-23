const { Post, User, Comment } = require('../models/Index');

exports.createComment = (req, res, next) => {
    Post.findByPk(req.params.id)
    .then(post => {
        Comment.create({
            content: req.body.content,
            UserId: req.token.userId,
            postId: req.params.id,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then(() => res.status(201).json({ message: 'Commentaire publié !'}))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

exports.modifyComment = (req, res, next) => {
    Comment.findByPk(req.params.id)
    .then(comment => {
        if (req.token.userId == comment.UserId || User.admin == true) {
            Comment.update({
                content: req.body.content,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
            .catch(error => res.status(400).json({ error }));
        } else {
            res.status(403).json({ message: "Vous n'avez pas l'autorisation pour modifié ce commentaire !" })
        }
    })
    .catch(error => res.status(404).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    Comment.findByPk(req.params.id)
    .then(comment => {
        if (req.token.userId == comment.UserId || req.token.userAdmin == true) {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Comment.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            })
        } else {
            res.status(403).json({ message: "Vous n'avez pas l'autorisation pour supprimer ce commentaire !" })
        }
    })
    .catch(error => res.status(404).json({ error }));
}