const express = require('express');
const router = express.Router();
const { Client } = require('./actions');
const { forwardAuthenticated ,ensureAuthenticated} = require('../config/auth');

router.get('/', ensureAuthenticated,(req, res) => {
   
    res.render('index',{layout:false, user:req.session.passport.user,title:'Home'});
});

router.get('/single', (req, res) => {
    res.render('single',{layout:false});

});


router.get('/signin',  (req, res) => {
    res.render('signin',{layout:false,user:req.user});

});


router.get('/signup',(req, res) => {
    res.render('signup',{layout:false});
});

router.get('/app/booking/', (req,res) => {
    res.json({dataFlag: (new Client(req.session)).clientLoggedId()});
});




module.exports=router
