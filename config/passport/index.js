'use strict'

const passport = require('passport');

const passportConfig = function(app){

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        done(null, user);
    });

    require('./local')(app);
    require('./facebook')(app);
};
module.exports = passportConfig;