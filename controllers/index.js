const express = require('express');
const Joi=require('@hapi/joi')
const router = express.Router();
const User = require('../models/users');
const secretKey='this_is_a_key';

/*
router.get('/', (req, res) => {
    //res.status(200).json({message:'it works'});
    //res.render('index',{layout:false});

    
});


router.get('/booking', (req, res) => {
    res.render('booking1',{layout:false});
});


router.get('/signin', (req, res) => {
    res.render('signin',{layout:false});
});

router.get('/signup', (req, res) => {
    res.render('signup',{layout:false});
});

router.post('/signin', (req, res) => {
    const data=req.body;
    console.log(data);

});


router.post('/signup', (req, res) => {
    const data=req.body;
    console.log(data);
});

router.post('/booking', (req, res) => {
    const data=req.body;
    console.log(data);
});


*/

router.post('/signup',async (req, res) => {
    const { username,email,password}=req.body;
    console.log(username,password,email)
    
    try {
       const schema=Joi.object(
        {
            username:Joi.string().alphanum().min(3).required(),
            email:Joi.string().email().required(),
            password:Joi.string().required(),
            repeatPassword:Joi.ref(password)
 
         }
       ).with('username','password');
        const { error,value } = schema.validate({username,email,password});
        if (error) {
            return res.status(400).json({'message':error.details[0].message});
            
        }
        let user = await User.create(value);
        console.log(user)
        const token =jwt.sign({id:user._id},secretKey);
        console.log(`The token is ${token}`)

        return res.status(201).json({username,email,token});
        
    } catch (error) {
        return res.status(422).json({"message":error});
    }
});

router.post('/signin', async (req, res) => {

    const { email,password}= req.body;
    //console.log(req.body);


    try {

        const schema={
            email:Joi.string().required(),
            password:Joi.string().required()
        };

    const { error,value} = schema.validate(req.body,schema);
    console.log(value);

    if (error) {
        return res.status(404).json('User not found');
        
    }

    const { email,password } = value;
    //console.log(email,password);
    const user= await User.getByEmail(email);

    if (!user.validPassword(password)) {

        return res.status(400).json({ 'message':'Incorrect password'});
        
    }

    const token = jwt.sign({id:user._id} , process.env.SECRET_KEY);
    return res.status(200).json({token});


        
        
    } catch (error) {
        return res.status(422).json({"message":error});  
    }
    
});



module.exports=router
