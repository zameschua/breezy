'use strict';

var db = require('../models/sequelize');
var repo = {};

function createMembership(userId, blogId) {
  return db.Membership.create({
    userId: userId,
    blogId: blogId,
  });
}

module.exports = repo;
