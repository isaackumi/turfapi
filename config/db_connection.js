const mongoose=require('mongoose');

const MLAB_USERNAME='magicians';
const PASSWORD='pass123';
//const secretKey='this_is_a_key';



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


