const mongoose=require('mongoose')

const schema = new mongoose.Schema({

    id:mongoose.Types.ObjectId

    facility:{
        type:String,
        location: String,
        description: Text,
        price:String,
        availability:Boolean
    }

    startDate:{
    type: Date
    }

    endDate:{
    type:Date
    }

    price:{
        type:Number
    },

    reserved: [
        {
            from: String,
            to: String
        }
    ]


})




// compile schema into module
module.exports.Bookings=mongoose.model('Bookings',schema)
