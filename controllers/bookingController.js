const express = require('express');
const Joi=require('@hapi/joi')
const router = express.Router();
const Booking=require('../models/bookings')




router.post('/booking',async (req, res) => {   
    
    try {
       const schema= req.body;
       //console.log(schema)
        //const { error,value } = schema.validate(req.body);
        if (!schema) {
            return res.status(400).json({message:'An error occured'});
            
        }
        let booking = await  new Booking.create({schema})
        .exec()
        .then( data=>{
            console.log(data)
        })
        .catch(()=>{
            console.log('Error')
        });
       
        

        return res.status(201).json({booking});
        
    } catch (error) {
        return res.status(422).json({"message":error});
    }
});


module.exports = router 
