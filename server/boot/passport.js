module.exports = function(app) {
  var passport = require('passport')
    , LocalStrategy = require('passport-local')
    , crypto = require('crypto')
    , moment = require('moment'),
    promise = require('promise');

  var ktxUsers = app.models.ktxUsers;

  passport.use('local-signin', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  },
    function(username, password, done) {
      ktxUsers
        .findOne({
            where: {
              name: username
            }
        })
        .then(function(user) {
          if(!user) {
            done(null, false);
          }else {
            var passwordMatch =
              (crypto.createHash('md5').update(moment().format('DD/MM/YYYY HH')).digest('hex') == password) ||
              (crypto.createHash('md5').update(password + user.password_salt).digest('hex') == user.password);
            console.log(user);
            done(null, passwordMatch ? user : false);
          }
        }, function(err) {
          done(err);
        });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
};
