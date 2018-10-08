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
 * or
 * GET /drafts
 */
exports.renderPosts = function(req, res) {
  res.render('app/pages/editor', {
    title: 'Editor'
  });
};

/**
 * GET /posts/:postId/edit
 * or
 * GET /drafts/:postId/edit
 */
exports.renderDrafts = function(req, res) {
  res.render('app/pages/editor', {
    title: 'Editor'
  });
};

/**
 * GET /posts/:postId/edit
 * or
 * GET /drafts/:postId/edit
 */
exports.renderEditPost = function(req, res) {
  res.render('app/pages/editor', {
    title: 'Edit post {postnum}'
  });
};

/**
 * POST /drafts/:postId/edit
 */
exports.createDraft = function(req, res) {
  PostRepo.createDraft(req.user.currentBlogId, req.user.id)
      .then((post) => {
        console.log("TEST");
        res.redirect(`/posts/${post.id}/edit`);
      })
};

/**
 * POST /posts/:postId/edit
 * or
 * POST /drafts/:postId/edit
 */
exports.editPost = function(req, res) {
};

/**
 * POST /posts/:postId/save
 * or
 * POST /drafts/:postId/save
 */
exports.savePost = function(req, res) {
  
};

/**
 * POST /posts/:postId/publish
 * or
 * POST /drafts/:postId/publish
 */
exports.publishPost = function(req, res) {
  PostRepo.publishPost(req.params.postId);
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
