const mongoose=require('mongoose')

const schema = new mongoose.Schema({

    asset:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },

    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    endDate:
    {
        type: Date, 
            default:Date.now()
        
    },
    price:
    {
        type:Number,
        defualt:0
    }


   
   
    
}, {timestamps:true})




// compile schema into module
module.exports.Bookings=mongoose.model('Bookings',schema)
