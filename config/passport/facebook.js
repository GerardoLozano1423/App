'use strict';

const passport = require('passport'),
      facebookStrategy = require('passport-facebook'),
      authController = require('../../src/controllers/authController');

const facebookConfig = function (app){
    passport.use(new facebookStrategy({
            clientID: '594822404288491',
            clientSecret: '5cba9f86cf15efe449ecad2b9831c22d',
            callbackURL: '/auth/facebook/callback'
        },
        function(accessToken, refreshToken, profile, done){
            authController.facebook(profile, done);
        }
    ));

    app.get('/auth/facebook/', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/'
    }))
}

module.exports = facebookConfig;