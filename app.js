const express = require('express');
const mongoose=require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const Joi=require('@hapi/joi');
const jwt = require( 'jsonwebtoken' );
const path=require('path')
//const user=require('./models/users');
//const User=require('./models/users');
const index=require('./controllers/index')
const MLAB_USERNAME='magicians';
const PASSWORD='pass123';
const secretKey='this_is_a_key';

// Initialize app
const app=express();

// App will run on this port
const port= process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'));



// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
 

// make conection to mlab database

mongoose.connect(`mongodb://${MLAB_USERNAME}:${PASSWORD}@ds211368.mlab.com:11368/sportsbooking`,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then((data)=>{
console.log('Connected to database ')
})
.catch((error)=>{
console.error('Error connecting to database:  ',error);
});




app.use('/',index);



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


// Export app for testing
module.exports=app;
