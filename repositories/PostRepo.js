'use strict';

var db = require('../models/sequelize');
var repo = {};

repo.getPost = function(postId) {
  return db.Post.findById(postId);
}

repo.createDraft = function(blogId, authorId) {
  return db.Post.create({
    blogId: blogId,
    authorId: authorId,
    isPublished: false,
  });
}

repo.updateDraft = function(postId) {
  return db.Post.update({
    draftTitle: title,
    draftBody: body,
  }, {where: {id: postId}});
}

repo.publishPost = function(postId) {
  return db.Post.findById(postId)
      .then(post => {
        post.publishedTitle = post.draftTitle;
        post.publishedBody = post.draftBody;
        post.isPublished = true;
        post.save();
      })
}

repo.unpublishPost = function(postId) {
  return db.Post.update({
    isPublished: false,
  },{where: {id: postId}});
}

repo.deletePost = function(postId) {
  return db.Post.destroy({ where: { id: userId } });
}

module.exports = repo;
