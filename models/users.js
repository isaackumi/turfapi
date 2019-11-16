const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');

const schema=mongoose.Schema({


    username:{
        id:mongoose.Schema.Types.ObjectId,
        type:String,
        trim:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        trim:true
    },

    bookings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            default:[],
            ref:'Bookings'
        }
    ],

    phoneNumber:{
        type:String,
        trim:true
    },

    createdEvents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event'
        }
      ]



});

// add search index

schema.indexes(
    {
        email:'text',
        username:'text' 
    }
);

schema.pre('save',function(next){
    const user=this;
    const SALT_FACTOR = 256;
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {

        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null,function(err, hash) {

            if (err) {
                return next(err);
                
            }
            
            // Store hash in your password DB.
            user.password=hash;
            return next();
        });
    });

});

schema.methods.validPassword=(password)=>{
    return bcrypt.compareSync(password,user.password);
}

schema.statics.getByEmail=async (email)=>{
    const user = await this.findOne({email});
    if (!user) {
       console.error('User not found');
        
    }
    return user;
}

schema.methods.toJSON=()=>{
    const user=this;
    return {
        username:user.username,
        email:user.email
    };
};


module.exports=mongoose.model('User',schema);
