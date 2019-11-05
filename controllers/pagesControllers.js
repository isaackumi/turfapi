const express = require('express');
const router = express.Router();
const { Client } = require('./actions');
const { forwardAuthenticated } = require('../config/auth');

router.get('/', (req, res) => {
    
    res.render('index',{layout:false});
});


router.get('/signin', forwardAuthenticated, (req, res) => {
    res.render('signin',{layout:false});

});


router.get('/signup', forwardAuthenticated,(req, res) => {
    res.render('signup',{layout:false});
});

router.get('/app/booking/', (req,res) => {
    res.json({dataFlag: (new Client(req.session)).clientLoggedId()});
});




module.exports=router
