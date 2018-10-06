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
