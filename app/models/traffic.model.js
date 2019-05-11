var mongoose = require('mongoose');

const TrafficSchema = mongoose.Schema({
    // id: Number,
    traffic : {
        date: String,
        hourly: [{
            hour_posted: Number,
            time_lapse: {
                starting_point : String,
                ending_point : String,
                traffic_status : Number,
                poster_id: String,
                posted_at : Date
            }
        }]
    }
    
    // user_id: String,
    // traffic_status: Number,
    // posted_at: String,
    // productName : String,
    // description: String,
    // color: String,
    // imageFullPath: String,
    // price: String

}, 
{
    timestamps: true
})


// create the model expose it to our app
module.exports = mongoose.model('Traffic', TrafficSchema);