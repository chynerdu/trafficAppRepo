const traffic = require('../models/traffic.model.js');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
var moment = require('moment')

// Create and Save a new Note
exports.create = (req, res) => {
    const date = moment().format("YYYY-MM-DD HH:mm:ss")
    const moment_hour = moment().hour();
    jwt.verify(req.headers.authorization, 'your_jwt_secret', function(err, legit){
        if (err) {
            console.log('error', err)
            res.status(401).json({
                message: 'Invalid token'
            })
        } else {
            //check if user posted traffic report within same hour 
            user.findById(legit._id, function(err, singleUser){
                console.log('user info ', singleUser)
                if (singleUser.last_updated == moment_hour) {
                    return res.status(200).json({
                        message: 'Already updated updated traffic for this hour',
                    })
                } else {
                    // console.log('time ', Date.now())
                    console.log('formatted ', date)
                    console.log('formatted hour ', moment_hour)
                    //update user info first
                    var myquery = { _id: legit._id };
                    var newvalues = { $set: {last_updated: moment_hour} };
                    user.updateOne(myquery, newvalues, function(err, singleUser){
                        if (err) {
                            return res.status(402).json({
                                message: 'error',
                                error: err
                            })
                        } else {
                        //update traffic info
                            var newReport  = new traffic;
                            newReport.user_id = legit._id
                            newReport.traffic_status = req.body.traffic_status,
                            newReport.posted_at = date
                            newReport.save(function(err, results){
                                console.log('posted '+ results);
                                console.log(req.files);
                                res.status(200).json({
                                    message: 'Post successfull',
                                    token_verified: legit,
                                    result: results,
                                    headers: req.headers
                                })
                            });
                        }
                    });
                }
            });
        }
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    traffic.find(function(err, traffic){
        res.json(traffic);
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    traffic.findById(req.params.id, function(err, Singleproduct){
        res.json(Singleproduct);
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};