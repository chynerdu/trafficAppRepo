var express = require('express');
var cors = require('cors')
var app =express();
var  bodyParser =require('body-parser');  
var mongoose = require('mongoose');
var  router = express.Router();
// var multer = require('multer');
var port =process.env.PORT ||8084;
// app.use(bodyParser.urlencoded())
app.use(cors())
app.use(bodyParser.json())
app.use( bodyParser.urlencoded({ extended: false }));
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
var cookieParser = require('cookie-parser');
var morgan  = require('morgan');
var moment = require('moment')
require('./app/routes/traffic.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/auth/index.js')(app, passport);
// var authRoutes   = require('./app/routes/auth');
// app.use( bodyParser.urlencoded({ extended: true }) );
require('./config/passport/index.js')(passport, LocalStrategy);
const dbConfig = require('./config/database.config.js');
mongoose.connect(dbConfig.url).then(() => {
    console.log('connected to database')
    var utc = new Date()
    const date = moment().format("YYYY-MM-DD HH:mm:ss")
    var hour = utc.getHours()
    const moment_hour = moment().hour();
    // console.log('time ', Date.now())
    console.log('formatted ', date)
    console.log('time ', utc)
    console.log('hour ',
     hour)
    console.log('formatted hour ', moment_hour)
}).catch(err => {
    console.log('error connecting ', err)
})
    /* end config */
    // app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded())
    // app.use( bodyParser.urlencoded({ extended: true }) );
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)

   
   
    // required for passport
    app.use(session({
        secret: 'eminem', // session secret
        resave: true,
        saveUninitialized: true
    }));
   
   
    // app.use(flash())
    //routes 
    // app.use('/auth', authRoutes)

    // allow api request from other server 
    app.use(function(req, res, next) { 
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next(); 
    })
    var publicDir = require('path').join(__dirname+'/public')
    app.use('/images', express.static(__dirname + '/public/lib/images/uploads/'))
    .use(express.static('./public'))

    //passport config
    var server= app.listen(port, function(){
    console.log('');
    console.log('Hello there, Your server is running fine on port ' + port);
    });