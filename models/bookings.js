const mongoose=require('mongoose')

const schema = new mongoose.Schema({

    id:mongoose.Types.ObjectId,

    facility:{
        type:String,
        location: String,
        description: String,
        price:String,
        availability:{type:Boolean, default:false}
    },

    startDate:{
    type: Date
    },

    endDate:{
    type:Date
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
