"use strict";

var PostRepo = require('../repositories/PostRepo.js');

/**
 * GET /
 * Dashboard page.
 */
exports.renderDashboard = function(req, res) {
  res.render('app/pages/dashboard', {
    title: 'Dashboard'
  });
};

/**
 * GET /posts
 */
exports.renderPosts = function(req, res) {
  res.render('app/pages/posts', {
    title: 'Posts',
  });
};

/**
 * GET /drafts
 */
exports.renderDrafts = function(req, res) {
  res.render('app/pages/posts', {
    title: 'Drafts',
  });
};

/**
 * GET /posts/:postId/edit
 * or
 * GET /drafts/:postId/edit
 */
exports.renderEditPost = function(req, res) {
  res.render('app/pages/editor', {
    title: `Edit post ${req.params.postId}`,
    postId: req.params.postId,
  });
};

/**
 * POST /posts
 */
exports.createPost = function(req, res) {
  PostRepo.createPost(req.user.currentBlogId, req.user.id)
      .then((post) => {
        res.redirect(`/posts/${post.id}/edit`);
      })
};

/**
 * POST /posts/:postId/save
 * or
 * POST /drafts/:postId/save
 */
exports.savePost = function(req, res) {
  try {
    PostRepo.updatePost(req.params.postId, req.body.title, req.body.body, req.body.htmlBody).then(() => {
      res.status(200).json(req.body);
    });
  } catch (err) {
    res.status(500).json({err: err.message});
  }
};

/**
 * POST /posts/:postId/publish
 * or
 * POST /drafts/:postId/publish
 */
exports.publishPost = function(req, res) {
  try {
    PostRepo.publishPost(req.params.postId).then(post => {
      res.status(200).json({redirect: '/'}); // Should redirect to the new post? Or preview
    });
  } catch (err) {
    res.status(500).json({err: err.message});
  }
};

/**
 * POST /posts/:postId/unpublish
 * (You can't publish a draft)
 */
exports.unpublishPost = function(req, res) {
  PostRepo.unpublishPost(req.params.postId);
};

/**
 * POST /posts/:postId/delete
 * or
 * POST /drafts/:postId/delete
 */
exports.deletePost = function(req, res) {
  PostRepo.deletePost(req.params.postId);
};

/**
 * TODO: REMOVE THIS LATER
 * For testing only
 */
exports.editor = function(req, res) {
  res.render('app/pages/editor', {
    title: 'Editor'
  });
};
