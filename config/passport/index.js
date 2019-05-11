// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

var User = require('../../app/models/user/index.js');

var myLocalConfig = (passport, LocalStrategy) => {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function() {
                // User.findOne({ 'email' :  email }, function(err, user) {
                //     // if there are any errors, return the error
                //     if (err)
                //         return done(err);

                //     // if no user is found, return the message
                //     if (!user)
                //         return done(null, false);

                //     if (!user.validPassword(password))
                //         return done(null, false);

                //     // all is well, return user
                //     else
                //         return done(null, user);
                // });
                User.findOne({ email: email }, function(err, user) {
                    if (err) { return done(err); }
                    if (!user) {
                      console.log('incorrect email')
                      return done(null, false, { message: 'Incorrect username.' });
                    }
                    // var newUser  = new User();
                    // console.log('my pass ', newUser.generateHash(password))
                    // if (user.password != password) {
                    //     return done(null, false);
                    //   }
                    if (!user.validPassword(password)) {
                      console.log('incorrect password')
                      return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                  });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({

        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log('called me')         
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' : email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
               return done(null, false, { message: 'Email is already taken.' });
            } else {

                // if there is no user with that email
                // create the user
                var newUser  = new User();

                // set the user's local credentials
                newUser.email = email;
                newUser.first_name = req.body.first_name
                newUser.last_name = req.body.last_name
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));
};

module.exports = myLocalConfig;