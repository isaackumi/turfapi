const express = require('express');
const router = express.Router();
const Event=require('../models/asset')
const Swal = require('sweetalert2')




router.post('/events', async function(req,res){
    console.log(req.body)
   
	var event = new Event(
        {
        nameOfFacility : req.body.title,
        price : req.body.price,
        location : req.body.location,
        username: req.body.username
    }
    );
 const data = await event.save()
if (data) {
    Swal('Successful')
    
} else {
    Swal('Booking Error')
}

});


router.get('/events', async (req, res) => {

    await Event.find()
   .exec()
   .then( data =>  res.send(data))
   .catch( () => {
     return  res.status(404).json({message:"No event found"});

   });


   

   
});

router.get('/events/:id',async (req, res) => {

   const id = req.params.id

  await Event.findById({_id:id})
   .exec()
   .then( data => {
       res.send(data)
       console.log(data)
   })
   .catch( () => {
        res.json({message:"Event not found"});
   })

});


router.delete('/events/:id',async (req, res) => {

    const id = req.params.id
 
   await Event.findById({_id:id})
    .exec()
    .then( () => {
        res.status(200).json({message:"Event deleted successfully!"});
        
    })
    .catch( () => {
         res.json({message:"Event not found"});
    })
 
 });

 router.put('/events/:id',async (req, res) => {

    const id = req.params.id
 
   await Event.findById({_id:id})
    .exec()
    .then( () => {
        res.status(200).json({message:"Event updated successfully!"});
        
    })
    .catch( () => {
         res.json({message:"Event not found"});
    })
 
 });

 
module.exports = router 
