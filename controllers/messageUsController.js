const express = require('express');
const router = express.Router();
const Contact=require('../models/contactus');


// post message endpoint

router.post('/contactus',async (req, res) => {

    const data=  await req.body;
    const schema=  await new Contact({
        data:data
    });

   await schema.save()
    .then( result => console.log(result.toJSON()))
    .catch(error => console.error(error))
   



});







module.exports= router;
