module.exports = (app) => {
    var express = require('express');
    // var router = express.Router();
    var passport = require('passport');
    // var passport = require('../../config/passport/index.js');
    
    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/notes',
    //     failureRedirect : '/notes'
    // }));
    app.post('/signup', function(req, res, next) {
        console.log(req.url);
        passport.authenticate('local-signup', function(err, user, info) {
            console.log("authenticate");
            console.log('error ', err);
            console.log('user ', user);
            console.log('info ', info);
        })(req, res, next);
    });
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/auth/profile',
        failureRedirect : 'auth/login'
    })); 

    app.get('/profile', isLoggedIn, (req, res) => {
        res.status(200).json(req.user);
    });
    app.get('/logout', isLoggedIn, (req, res) => {
        req.logout();
        res.status(200).json({
            'message': 'successfully logout'
        });
    });
    //route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}
}