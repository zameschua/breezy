'use strict';
/**
 * Module dependencies.
 */
// var toobusy = require('toobusy-js');
var express = require('express');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');
var multer = require('multer');
var ejsEngine = require('ejs-mate');
var Promise = require('bluebird');

var flash = require('express-flash');
var path = require('path');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

var subdomain = require('express-subdomain');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var appController = require('./controllers/app');
var userController = require('./controllers/user');
var apiController = require('./controllers/api');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

/* Avoid not responsing when server load is huge */
// app.use(function(req, res, next) {
//   if (toobusy()) {
//     res.status(503).send("I'm busy right now, sorry. Please try again later.");
//   } else {
//     next();
//   }
// });

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.engine('ejs', ejsEngine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable("trust proxy");
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')]
}));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public/favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: path.join(__dirname, 'uploads') }).single());
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());

Promise.longStackTraces();

var db = require('./models/sequelize');

//PostgreSQL Store
app.use(session({
  store: new pgSession({
    conString: secrets.postgres,
    tableName: secrets.sessionTable
  }),
  secret: secrets.sessionSecret,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true
    //, secure: true // only when on HTTPS
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
  csrf: { angular: true },
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.gaCode = secrets.googleAnalyticsCode;
  next();
});
app.use(function(req, res, next) {
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  next();
});
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', res.locals._csrf, {httpOnly: false});
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * app.breezyblog.io
 */
var appRouter = express.Router();
// Dashboard
appRouter.get('/', appController.renderDashboard);
// Drafts
appRouter.get('/drafts', appController.renderDrafts);
appRouter.post('/drafts', appController.createPost);
appRouter.get('/drafts/:postId/edit', appController.renderEditPost);
appRouter.post('/drafts/:postId/save', appController.savePost);
appRouter.post('/drafts/:postId/publish', appController.publishPost);
appRouter.post('/drafts/:postId/delete', appController.deletePost);
// Posts
appRouter.get('/posts', appController.renderPosts);
appRouter.get('/posts/:postId/edit', appController.renderEditPost);
appRouter.post('/posts/:postId/save', appController.savePost);
appRouter.post('/posts/:postId/publish', appController.publishPost);
appRouter.post('/posts/:postId/delete', appController.deletePost);
//
appRouter.get('/editor', appController.editor); // TODO: Remove this later, for testing only
// Auth
appRouter.get('/login', userController.getLogin);
appRouter.post('/login', userController.postLogin);
appRouter.get('/logout', userController.logout);
appRouter.get('/forgot', userController.getForgot);
appRouter.post('/forgot', userController.postForgot);
appRouter.get('/reset/:token', userController.getReset);
appRouter.post('/reset/:token', userController.postReset);
appRouter.get('/signup', userController.getSignup);
appRouter.post('/signup', userController.postSignup);
// appRouter.get('/contact', contactController.getContact);
// appRouter.post('/contact', contactController.postContact);
appRouter.get('/account', passportConf.isAuthenticated, userController.getAccount);
appRouter.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
appRouter.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
appRouter.delete('/account', passportConf.isAuthenticated, userController.deleteAccount);
appRouter.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);

app.use(subdomain('app', appRouter));

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);
app.get('/api/stripe', apiController.getStripe);
app.post('/api/stripe', apiController.postStripe);
app.get('/api/facebook', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFacebook);
app.get('/api/github', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getGithub);

function safeRedirectToReturnTo(req, res) {
  var returnTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(returnTo);
}

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/facebook', passport.authenticate('facebook', secrets.facebook.authOptions));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', failureFlash: true }), safeRedirectToReturnTo);
app.get('/auth/github', passport.authenticate('github', secrets.github.authOptions));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login', failureFlash: true }), safeRedirectToReturnTo);
app.get('/auth/google', passport.authenticate('google', secrets.google.authOptions));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), safeRedirectToReturnTo);

/**
 * Any other routes
 * Including www.breezyblog.io and breezyblog.io
 */
var homeRouter = express.Router();
app.get('/', homeController.index);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

db
  .sequelize
  .sync({ force: false })
  .then(function() {
      app.listen(app.get('port'), function() {
        console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
      });
  });

module.exports = app;
