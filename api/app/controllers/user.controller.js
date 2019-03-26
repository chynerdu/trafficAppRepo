const user = require('../models/user');
const jwt = require('jsonwebtoken');
var moment = require('moment')
const date = moment().format("YYYY-MM-DD HH:mm:ss")
const moment_hour = moment().hour();



// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    user.find(function(err, users){
        res.json(users);
    });
};

// Find a single user with a token
exports.findOne = (req, res) => {
    // const legit = jwt.verify(req.headers.authorization, 'your_jwt_secret');
    jwt.verify(req.headers.authorization, 'your_jwt_secret', function(err, legit){
        if (err) {
            console.log('error oo ', err)
            res.status(401).json({
                message: 'Invalid token'
            })
        } else {
            console.log('token ', legit)
            user.findById(req.params.userId, function(err, singleUser){
                console.log('user ', req.params.userId)
                res.json(singleUser);
            });
        }
    });
};


// Find a loggedIn user with a token
exports.findCurrent = (req, res) => {
    // const legit = jwt.verify(req.headers.authorization, 'your_jwt_secret');
    jwt.verify(req.headers.authorization, 'your_jwt_secret', function(err, legit){
        if (err) {
            console.log('error oo ', err)
            res.status(401).json({
                message: 'Invalid token'
            })
        } else {
            console.log('token ', legit)
            user.findById(legit._id, function(err, singleUser){
                res.json(singleUser);
            });
        }
    });
};
// Update loggedIn user with a token
exports.updateCurrent = (req, res) => {
    // const legit = jwt.verify(req.headers.authorization, 'your_jwt_secret');
    jwt.verify(req.headers.authorization, 'your_jwt_secret', function(err, legit){
        if (err) {
            console.log('error oo ', err)
            res.status(401).json({
                message: 'Invalid token'
            })
        } else {
            console.log('token ', legit)
            var myquery = { _id: legit._id };
            var newvalues = { $set: {last_updated: moment_hour} };
            user.updateOne(myquery, newvalues, function(err, singleUser){
                res.json(singleUser);
            });
        }
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};