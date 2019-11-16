const mongoose=require('mongoose')


const schema = new mongoose.Schema({

    firtname:{
        type:String

    },

    lastname:{
        type:String

    },

    subject:{
        type:String

    },

    email:{
        type:String
    },

    message:{
        type:String

    }


});


schema.methods.toJSON= () => {
    const message=this;
     return {
        firstname: message.firstname,
        lastname: message.lastname,
        subject: message.subject,
        email: message.email,
        message:message.message
     }
}

// compile schema into module
module.exports.ContactUs=mongoose.model('ContactUs',schema)
