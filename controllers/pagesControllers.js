const express = require('express');
const router = express.Router();
const { Client } = require('./actions');

router.get('/', (req, res) => {
    
    res.render('index',{layout:false});
});


router.get('/signin', (req, res) => {
    res.render('signin',{layout:false});

});


router.get('/signup', (req, res) => {
    res.render('signup',{layout:false});
});

router.get('/app/booking/', (req,res) => {
    res.json({dataFlag: (new Client(req.session)).clientLoggedId()});
});




module.exports=router
