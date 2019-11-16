const express = require('express');
const router = express.Router();
const Booking=require('../models/bookings')



/*
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

*/
router.post('/booking',async function(req,res){
    //const data = req.body
	var book = new Booking({
		price:req.body.price
	
	});
 await book.save()
.then(function(result){
	console.log(result);
	return res.send(result);
}).catch(function(err){console.log(err);});

});





router.get('/booking', async (req, res) => {

    await Booking.find()
    .exec()
    .then(data => res.send(data))
    .catch(err => res.status(500).json({'message':err}))

});
module.exports = router 
