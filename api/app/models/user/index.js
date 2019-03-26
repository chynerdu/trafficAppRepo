var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    // local: {
    //     email: String,
    //     password: String
    // }
    email:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true
    },
    last_updated: {
        type: Number,
        required: false
    }
    // timestamps: true
})


// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for photographers and expose it to our app
module.exports = mongoose.model('User', userSchema);