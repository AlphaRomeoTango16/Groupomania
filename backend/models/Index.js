const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

const load = async () => {
    Post.belongsTo(User);
    Post.hasMany(Comment);
    Comment.belongsTo(User);
    Comment.belongsTo(Post);

    await Post.sync({alter:true});
    await User.sync({alter:true});
    await Comment.sync({alter:true});
};

module.exports = {Post, User, Comment, load};