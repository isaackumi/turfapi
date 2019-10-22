
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const path=require('path')
const http=require('http')
const morgan=require('morgan')
const cors = require('cors')
//const user=require('./models/users');
//const User=require('./models/users');
const index=require('./controllers/index')

const connectDB=require('./config/db_connection')


// Initialize app
const app=express();

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



// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('trust proxy', true);

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
 

app.use('/',index);
app.use('*',(req,res,next)=>{
    res.sendStatus('404');
})

const server =http.createServer(app)


if (process.env.NODE_ENV !== 'test') {
   server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
 
}



// Export app for testing
module.exports= server;
