var passport = require('passport');
var crypto = require('crypto');
module.exports = function(server) {
  var body = require('body-parser');
  var loopback = require('loopback');
  var cookieParser = require('cookie-parser');
  var session = require('express-session');
  server.use(cookieParser());

  // to support JSON-encoded bodies
  server.use(body.json());
  // to support URL-encoded bodies
  server.use(body.urlencoded({
    extended: true
  }));

  server.use(session({
    secret: '__MegaNet__',
    key: 'sessionId',
    cookie: {
      maxAge: 86400000 // 24h
    },
    resave: true,
    saveUninitialized: true
  }));

  server.use(passport.initialize());
  server.use(passport.session());

  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  //router.get('/', server.loopback.status());
  router.get('/', function(req, res) {
    if(req.user) {
      console.log(req.user);
      res.redirect('/index.html');
    }else {
      res.redirect('/login.html');
    }
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login.html');
  });

  router.post('/login', function(req, res, next) {
    passport.authenticate('local-signin', function(err, user, info) {
      if(err) { return next(err); }
      if(!user) { return res.redirect('/login.html'); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/index.html');
      });
    })(req, res, next);
  });

  router.get('/current_user', function(req, res) {
    if(!req.user) return res.json({ isAuthenticated: false, current_user: null});

    res.json({
      isAuthenticated: true,
      current_user: req.user
    });
  });

  server.use(router);
};
