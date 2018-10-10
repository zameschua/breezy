'use strict';

var db = require('../models/sequelize');
var repo = {};

repo.createMembership = function(userId, blogId) {
  // Equivalent of doing user.addBlog or blog.addUser in sequelize
  return db.Membership.create({
    userId: userId,
    blogId: blogId,
  });
}

module.exports = repo;
