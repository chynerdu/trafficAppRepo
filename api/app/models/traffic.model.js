var mongoose = require('mongoose');

const TrafficSchema = mongoose.Schema({
    id: Number,
    user_id: String,
    traffic_status: Number,
    posted_at: String,
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