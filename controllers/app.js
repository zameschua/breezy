"use strict";

/**
 * GET /
 * Dashboard page.
 */
exports.dashboard = function(req, res) {
  res.render('app/dashboard', {
    title: 'Dashboard'
  });
};

/**
 * GET /
 * Dashboard page.
 */
exports.editor = function(req, res) {
  res.render('app/editor', {
    title: 'Editor'
  });
};

