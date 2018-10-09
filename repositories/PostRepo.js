'use strict';

var db = require('../models/sequelize');
var repo = {};

repo.getPost = function(postId) {
  return db.Post.findById(postId);
}

repo.createPost = function(blogId, authorId) {
  return db.Post.create({
    blogId: blogId,
    authorId: authorId,
    isPublished: false,
  });
}

repo.updatePost = function(postId, title, body, htmlBody) {
  debugger;
  return db.Post.update({
    draftTitle: title,
    draftBody: body,
    draftHtmlBody: htmlBody,
  }, {where: {id: postId}});
}

repo.publishPost = function(postId) {
  return db.Post.findById(postId)
      .then(post => {
        post.title = post.draftTitle;
        post.body = post.draftBody;
        post.htmlBody = post.draftHtmlBody;
        post.isPublished = true;
        return post.save();
      });
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
