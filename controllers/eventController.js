const express = require('express');
const router = express.Router();
const Event=require('../models/asset')
//const User = require('../models/users')
const Swal = require('sweetalert2')
const User = require('../services/user')
const mongoose = require('mongoose')






router.post('/events', async function(req,res){
    

    
   const user = req.session.passport;
   try {
    const data = await User.findUserById(user)
    if (mongoose.Types.ObjectId.isValid(data)) {
        User.findOne({ _id: user.id }) 
         .then((doc) => {
            if (doc) {
              alert(doc);
            } else {
              alert("no data exist for this id");
            }
         })
        .catch((err) => {
          console.log(err);
         });
     } else {
       console.log("please provide correct id");
     }
    
   } catch (error) {
       console.error(error)
   }
   
    /*   
   
	var booking = {
        nameOfFacility : req.body.title,
        price : req.body.price,
        location : req.body.location
    
    }

 */

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
