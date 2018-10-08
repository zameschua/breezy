"use strict";

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
 * GET /posts/:postId/edit
 * or
 * GET /drafts/:postId/edit
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
};

/**
 * POST /posts/:postId/unpublish
 * (You can't publish a draft)
 */
exports.unpublishPost = function(req, res) {
};

/**
 * POST /posts/:postId/delete
 * or
 * POST /drafts/:postId/delete
 */
exports.deletePost = function(req, res) {
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
