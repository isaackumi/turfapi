const mongoose=require('mongoose');

// const MLAB_USERNAME='magicians';
// const PASSWORD='pass123';
// const secretKey='this_is_a_key';

/*

module.exports.db_conn= mongoose.connect(`mongodb://${MLAB_USERNAME}:${PASSWORD}@ds211368.mlab.com:11368/sportsbooking`,{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then((data)=>{
console.log('Connected to database ')
})
.catch((error)=>{
console.error('Error connecting to database:  ',error);
});

*/

mongoose.connect('mongodb://127.0.0.1:27017/booking', {useNewUrlParser: true}) // returns a promise
.then(function(){
  console.log('connected to database');
})
.catch(function(err){
  console.log(err);
});



