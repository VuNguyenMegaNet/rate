//var passport = require('passport');

module.exports = function(Auth) {

  //Auth.login = function(req, res, next) {
  //  passport.authenticate('local-signin', function(err, user, info) {
  //    if(err) { return next(err); }
  //    if(!user) { return res.redirect('/login.html'); }
  //
  //    req.logIn(user, function(err) {
  //      if (err) { return next(err); }
  //      return res.redirect('/index.html');
  //    });
  //  })(req, res, function(err) {
  //    console.log('login finish');
  //    console.log(err);
  //    next();
  //  });
  //};
  //Auth.remoteMethod('login', {
  //  accepts: [
  //    {arg: 'req', type: 'object', http: { source: 'req' }},
  //    {arg: 'res', type: 'object', http: { source: 'res' }}
  //  ]
  //});
  //
  //Auth.logout = function(req, res) {
  //  req.logout();
  //  res.redirect('/login.html');
  //};
  //Auth.remoteMethod('logout', {
  //  http: {verb: 'get'},
  //  accepts: [
  //    {arg: 'req', type: 'object', http: { source: 'req' }},
  //    {arg: 'res', type: 'object', http: { source: 'res' }}
  //  ]
  //});
  //
  //Auth.current_user = function(req, res, cb) {
  //  if(!req.user) {
  //    return cb(null, false, null);
  //  }
  //  return cb(null, true, req.user);
  //};
  //Auth.remoteMethod('current_user', {
  //  accepts: [
  //    {arg: 'req', type: 'object', http: { source: 'req' }},
  //    {arg: 'res', type: 'object', http: { source: 'res' }}
  //  ],
  //  http: {verb: 'get'},
  //  returns: [
  //    {arg: 'isAuthenticated', type: 'boolean'},
  //    {arg: 'current_user', type: 'object'}
  //  ]
  //});
};
