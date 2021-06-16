const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

const load = async () => {
    Post.belongsTo(User);
    Comment.belongsTo(User);

    await Post.sync({alter:true});
    await User.sync({alter:true});
    await Comment.sync({alter:true});
};

module.exports = {Post, User, Comment, load};