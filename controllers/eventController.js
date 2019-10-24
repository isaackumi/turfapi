const express = require('express');
const router = express.Router();
const Event=require('../models/event')




router.post('/events',async function(req,res){
	var event=new Event({
		
	title:req.body.title,
    price:req.body.price,
    creator:req.body.creator
	});
event.save()
.then(function(result){
	console.log(result);
	return res.send(result);
}).catch(function(err){console.log(err);});

});


router.get('/events', async (req, res) => {

    await Event.find()
   .exec()
   .then( data => {
      return res.send(data);
      
   })
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

 
module.exports = router 
