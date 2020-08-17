const { Post } = require('../models');

module.exports = {
  create: (body) => new Post(body),
  addPostToUser: (post, user) => {
    user.posts.push(post);
    return user.save();
  },
  findOneByIdInUser: (idPost, user) => {
    const post = user.posts.id(idPost);
    if (post.is_active === false) return undefined;
    return post;
  },
  updateOneByIdInUser: (idPost, user, body) => {
    const updatedPosts = user.posts.map((post) => {
      if (post._id.toString() === idPost) {
        const updatedPost = Object.assign(post, body);
        return updatedPost;
      }
      return post;
    });
    // eslint-disable-next-line no-param-reassign
    user.posts = updatedPosts;
    return user.save();
  },
  getPostsInUser: (user) => {
    const filteredPosts = user.posts.filter((post) => post.is_active === true);
    return filteredPosts;
  },
};