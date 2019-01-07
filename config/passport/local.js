'use strict';

const passport = require('passport'),
      localPassport = require('passport-local').Strategy,
      authController = require('../../src/controllers/authController');
const existe = false;
const localConfig = function (app){
    passport.use(new localPassport({
            usernameField: 'user',
            passwordField: 'pass',
        },  
        function(user, pass, done){
            authController.login(user, pass, done);
        }
    ));

    app.post('/', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true,
    }))

};

module.exports = localConfig;