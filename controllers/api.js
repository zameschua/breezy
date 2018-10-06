"use strict";

//global requires
var secrets = require('../config/secrets');
var querystring = require('querystring');
var validator = require('validator');
var async = require('neo-async');
var request = require('request');
var _ = require('lodash');

//specific requires
var Github;
var stripe;


/**
 * GET /api
 * List of API examples.
 */
exports.getApi = function(req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = function(req, res, next) {
  graph = require('fbgraph');

  var token = req.user.tokens.facebook;
  graph.setAccessToken(token);
  async.parallel({
    getMe: function(done) {
      graph.get(req.user.facebookId, function(err, me) {
        done(err, me);
      });
    },
    getMyFriends: function(done) {
      graph.get(req.user.facebookId + '/friends', function(err, friends) {
        done(err, friends.data);
      });
    }
  },
  function(err, results) {
    if (err) return next(err);
    res.render('api/facebook', {
      title: 'Facebook API',
      me: results.getMe,
      friends: results.getMyFriends
    });
  });
};

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = function(req, res, next) {
  Github = require('github-api');

  var token = req.user.tokens.github;
  var github = new Github({ token: token });
  var repo = github.getRepo('sahat', 'requirejs-library');
  repo.show(function(err, repository) {
    if (err) return next(err);
    res.render('api/github', {
      title: 'GitHub API',
      repo: repository
    });
  });

};

/**
 * GET /api/stripe
 * Stripe API example.
 */
exports.getStripe = function(req, res) {
  stripe = require('stripe')(secrets.stripe.secretKey);

  res.render('api/stripe', {
    title: 'Stripe API',
    publishableKey: secrets.stripe.publishableKey
  });
};

/**
 * POST /api/stripe
 * Make a payment.
 */
exports.postStripe = function(req, res, next) {
  stripe = require('stripe')(secrets.stripe.secretKey);

  var stripeToken = req.body.stripeToken;
  var stripeEmail = req.body.stripeEmail;
  stripe.charges.create({
    amount: 395,
    currency: 'usd',
    source: stripeToken,
    description: stripeEmail
  }, function(err) {
    if (err && err.type === 'StripeCardError') {
      req.flash('errors', { msg: 'Your card has been declined.' });
      res.redirect('/api/stripe');
    }
    req.flash('success', { msg: 'Your card has been charged successfully.' });
    res.redirect('/api/stripe');
  });
};
