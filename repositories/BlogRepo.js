'use strict';

var db = require('../models/sequelize');
var repo = {};

repo.createBlog = function(blogName, blogSubdomain) {
  return db.Blog.create({
    name: blogName,
    subdomain: blogSubdomain,
  });

  
}

module.exports = repo;
