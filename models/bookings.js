const mongoose=require('mongoose')

const schema = new mongoose.Schema({

    id:mongoose.Types.ObjectId

    facilityName:{
        type:String,
        trim:true
    }

    startDate:{

    }

    endDate:{

    }

    price:{

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
