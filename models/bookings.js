const mongoose=require('mongoose')

const schema = new mongoose.Schema({

    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }


   
   
    
}, {timestamps:true})




// compile schema into module
module.exports.Bookings=mongoose.model('Bookings',schema)
