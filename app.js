/* eslint-disable no-undef */

const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose')
const compression=require('compression')
const bodyParser=require('body-parser');
const path=require('path')
const session=require('express-session')
const morgan=require('morgan')
const flash = require('connect-flash')
const passport=require('passport')
const cors = require('cors')
//const user=require('./models/users');
//const User=require('./models/users');
const UserControllers=require('./controllers/userController')
const BookingControllers=require('./controllers/bookingController')
const EventControllers=require('./controllers/eventController')
const pagesControllers=require('./controllers/pagesControllers')
const UrlAuth = require('./controllers/index')
const MessageUsController = require('./controllers/messageUsController')
const userRoutes = require('./routes/users');

require('./config/passport')(passport);


// Initialize app8
const app=express();
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const db=require('./config/db_connection')

mongoose.Promise = global.Promise;


//use flash
app.use(flash())


// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
  });
 
// compress responses
app.use(compression())

// cors middleware
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Log request to API using morgan
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'));

app.use(session(
    {
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }
    ))
    
app.use(function(req, res, next){
    res.locals.session = req.session;
    //console.log(res.locals.session)
    res.locals.user = req.session.passport.user || null;
    console.log('user from app.js : ',user)
    next();
  });


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});



// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('trust proxy', true);
app.set('views', __dirname + '/views');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/user", userRoutes);

app.use('/',
 [
UserControllers,
 BookingControllers,
EventControllers,
pagesControllers,
UrlAuth,
MessageUsController
]
);


// return 404 for all other routes not specified in this file
app.use('*',(req,res,next)=>{
    res.sendStatus('404');
})


  // export app for testing
module.exports = app;





