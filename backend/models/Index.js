const Post = require('./Post');
const User = require('./User');

const load = async () => {
    Post.belongsTo(User);

    await Post.sync({alter:true});
    await User.sync({alter:true});
};

module.exports = {Post, User, load};