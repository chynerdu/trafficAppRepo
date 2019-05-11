const traffic = require('../models/traffic.model.js');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
var moment = require('moment')

// Create and Save a new Note
exports.create = (req, res) => {
    const fDate = moment().format("YYYY-MM-DD HH:mm:ss")
    const date = moment().format("YYYY-MM-DD")
    const moment_hour = moment().hour();
    jwt.verify(req.headers.authorization, 'your_jwt_secret', function(err, legit){
        if (err) {
            console.log('error', err)
            res.status(401).json({
                message: 'Invalid token'
            })
        } else {
            //check post already made for that day
            traffic.find({'traffic.date' : date}, function(err, trafficResult) {
                if (err) {
                   console.log('error occured ', err)
                } else {
                   if (trafficResult.length > 0) { //if post made for that day
                        console.log('posted for today', trafficResult[0])
                        let query = {_id: trafficResult[0]._id}
                        var payload = {
                            "hour_posted" : moment_hour,
                            "time_lapse.starting_point" : req.body.starting_point,
                            "time_lapse.ending_point" : req.body.ending_point,
                            "time_lapse.traffic_status" : req.body.traffic_status,
                            "time_lapse.poster_id" : legit._id,
                            "time_lapse.posted_at" : fDate,  
                        }

                       

                        //check if user posted traffic report within same hour 
                        user.findById(legit._id, function(err, singleUser){
                            console.log('user info ', singleUser)
                            if (singleUser.last_updated == moment_hour) {
                                //if user posted within thesame hour, check the starting point and ending point if its thesame
                                // traffic.findOne({$and : [{}]})
                                console.log('traffic result ', trafficResult)
                                var trafficFilter = trafficResult[0].traffic.hourly.filter((sameLocation) => {
                                    return sameLocation.time_lapse.poster_id == legit._id && sameLocation.hour_posted == moment_hour && sameLocation.time_lapse.starting_point == req.body.starting_point && sameLocation.time_lapse.ending_point == req.body.ending_point
                                    // return sameLocation.time_lapse.starting_point == req.body.starting_point && sameLocation.time_lapse.ending_point == req.body.ending_point
                                })
                                console.log('after query ', trafficFilter)
                                if (trafficFilter.length > 0) {
                                    return res.status(208).json({
                                        message: 'Already updated traffic for this location within this hour',
                                    })
                                } else {
                                   updateHourly(query, payload); 
                                }
                            } else {
                                updateHourly(query, payload);
                            }
                      });
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
                            //update traffic 
                                console.log('sent ', req.body.time_lapse)
                                var newReport  = new traffic;
                                // newReport.user_id = legit._id
                                newReport.traffic.date = date,
                                // newReport.traffic.hourly.hour_posted = moment_hour,
                                // newReport.traffic.hourly[0].time_lapse.starting_point = req.body.starting_point,
                                // newReport.traffic.hourly[0].time_lapse.ending_point = req.body.ending_point,
                                // newReport.traffic.hourly[0].time_lapse.traffic_status = req.body.traffic_status,
                                // newReport.traffic.hourly[0].time_lapse.poster_id = legit._id,
                                // newReport.traffic.hourly[0].time_lapse.posted_at = fDate,
                                newReport.save(function(err, results){
                                    console.log('saved new post, updating hour')
                                    let trafficQuery = {_id: results._id}
                                    var trafficPayload = {
                                        "hour_posted" : moment_hour,
                                        "time_lapse.starting_point" : req.body.starting_point,
                                        "time_lapse.ending_point" : req.body.ending_point,
                                        "time_lapse.traffic_status" : req.body.traffic_status,
                                        "time_lapse.poster_id" : legit._id,
                                        "time_lapse.posted_at" : fDate,  
                                    }
                                    traffic.update(trafficQuery, {$push: {"traffic.hourly": trafficPayload}}, function(err, updateDate){
                                        if (err) {
                                            console.log('error occured ', err)
                                        } else {
                                            console.log('posted ', updateDate)
                                        res.status(200).json({
                                                message: 'made new post and updated',
                                                token_verified: legit,
                                                // result: updateDate,
                                                headers: req.headers
                                            }) 
                                        }
                                    })
                                });
                            }
                        });
                     
                  }
                }
            }) 

         //update traffic.hourly function
         function updateHourly(query, payload) {
            //update last_updated on user table and then update traffic
            var myquery = { _id: legit._id };
            var newvalues = { $set: {last_updated: moment_hour} };
            user.updateOne(myquery, newvalues, function(err, singleUser){
                if (err) {
                    return res.status(402).json({
                        message: 'error',
                        error: err
                    })
                } else {
                    console.log('payload ', payload)
                    traffic.update(query, {$push: {"traffic.hourly": payload}}, function(err, updateDate){
                        if (err) {
                            console.log('error occured ', err)
                        } else {
                            console.log('posted ', updateDate)
                        res.status(200).json({
                                message: 'post exist for today, so updated',
                                token_verified: legit,
                                // result: updateDate,
                                headers: req.headers
                            }) 
                        }
                    })
                }
            })
         }
            
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
    const fDate = moment().format("YYYY-MM-DD HH:mm:ss")
    const date = moment().format("YYYY-MM-DD")
    const moment_hour = moment().hour();
    traffic.findOne({"traffic.date" : date}, function(err, queryTraffic){
        // let sameHour = queryTraffic.traffic
        // console.log('query ', sameHour)
        if (err) {
            console.log('failed to fetch ', err)
            res.status(400).send(err)
        } else {
            if (queryTraffic == null) {
                res.status(400).send('No traffic report have been made, try again later')
            } else {
                let sameDate = queryTraffic.traffic
                var filterTraffic = new Promise(function(resolve, reject ) {
                    var getHour = sameDate.hourly.filter(sameHour => {
                    return sameHour.hour_posted === moment_hour
                    })
                    if (getHour != null) {
                        resolve(getHour)
                    } else {
                        reject(Error)
                    }
                })
                filterTraffic.then(result => {
                var getLocation = result.filter(isMatch => {
                    return isMatch.time_lapse.starting_point === req.query.starting_point && isMatch.time_lapse.ending_point === req.query.ending_point
                })
                    res.json(getLocation);
                },
                error => {
                    res.status(501).send('Unable to fetch report')
                })
            }
        }
        
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};
