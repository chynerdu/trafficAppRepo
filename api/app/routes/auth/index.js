
//     var express = require('express');
//     var router = express.Router();
//     var passport = require('passport');
//     var  bodyParser =require('body-parser');  
//     var urlencodedParser = bodyParser.urlencoded({ extended: false })
//     // var passport = require('../../config/passport/index.js');
    
//     router.post('/signup', urlencodedParser, function(req, res, next) {
//         console.log('email is ', req.body.email);
//         passport.authenticate('local-signup', function(err, user, info) {
//             console.log("authenticate");
//             console.log(err);
//             res.send(JSON.stringify(info)).status(200)
//             console.log(user);
//             console.log(info);
//             console.log(req.body);
//         })(req, res, next);
//     });
    
//     router.post('/login', passport.authenticate('local-login', {
//         successRedirect : '/auth/profile',
//         failureRedirect : 'auth/login'
//     })); 

//     router.get('/profile', isLoggedIn, (req, res) => {
//         res.status(200).json(req.user);
//     });
//     router.get('/logout', isLoggedIn, (req, res) => {
//         req.logout();
//         res.status(200).json({
//             'message': 'successfully logout'
//         });
//     });
//     module.exports = router;
//     //route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.status(400).json({
//         'message': 'access denied'
//     });
// }

module.exports = (app, passport) => {
    var express = require('express');
    const jwt = require('jsonwebtoken');
    // var router = express.Router();
    // var passport = require('passport');
    // var passport = require('../../config/passport/index.js');
    
    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/notes',
    //     failureRedirect : '/notes'
    // }));
    app.post('/signup', function(req, res, next) {
        console.log('email is ', req.body);
        passport.authenticate('local-signup', function(err, user, info) {
            console.log("authenticate");
            console.log(err);
            res.send(JSON.stringify(info)).status(200)
            console.log(user);
            console.log(info);
            console.log(req.body);
        })(req, res, next);
    });
    
    app.post('/login', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info) {
        // console.log('payload ', user)
        if (err) {
         console.log('error ', err)
        } 
        if (!user) {
            res.status(200).json({
            message: 'invalid credentials'
            })
        } else {
            const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
            // const legit = jwt.verify(req.headers.authorization, 'your_jwt_secret');
            console.log('token ', token)
            res.status(200).json({
             message: 'Login successfull',
             user: user,
             token: token,
             headers: req.headers
            })
            console.log(user);
        }
        
    })(req, res, next);
    }); 

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