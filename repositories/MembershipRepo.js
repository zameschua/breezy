'use strict';

var db = require('../models/sequelize');
var repo = {};

repo.createMembership = function(userId, blogId) {
  return db.Membership.create({
    userId: userId,
    blogId: blogId,
  });
}

module.exports = repo;
