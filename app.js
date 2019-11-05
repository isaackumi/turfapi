
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const path=require('path')
const session=require('express-session')
const http=require('http')
const morgan=require('morgan')
const passport=require('passport')
const cors = require('cors')
//const user=require('./models/users');
//const User=require('./models/users');
const UserControllers=require('./controllers/userController')
const BookingControllers=require('./controllers/bookingController')
const EventControllers=require('./controllers/eventController')
const pagesControllers=require('./controllers/pagesControllers')
const UrlAuth=require('./controllers/index')

const connectDB=require('./config/db_connection')
require('./config/passport')(passport);


// Initialize app
const app=express();
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// App will run on this port
const port= process.env.PORT || 3000;

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
    console.log(res.locals.session)
    res.locals.user = req.user;
    //console.log(res.locals.user)
    next();
  });



// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('trust proxy', true);
app.set('views', __dirname + '/views');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
 

app.use('/',
 [
UserControllers,
 BookingControllers,
EventControllers,
pagesControllers,
UrlAuth
]
);


// return 404 for all other routes not specified in this file
app.use('*',(req,res,next)=>{
    res.sendStatus('404');
})



const server =http.createServer(app)


if (process.env.NODE_ENV !== 'test') {
   server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
 
}



// Export server for testing
module.exports= server;
