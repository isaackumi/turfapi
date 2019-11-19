const express = require('express');
const Joi=require('@hapi/joi')
const router = express.Router();
const passport=require('passport')
const User= require('../models/users');
const Service =  require('../services/main');

const LocalStrategy = require('passport-local').Strategy;

//const secretKey='this_is_a_key';



/*
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

// GET: GET ALL CAFETERIAS
async function getAllUsers(req, res, next){
    const users =  await Service.UserService.findAllUsers();
    //console.log(users);
    // res.json(users);
    // eslint-disable-next-line no-useless-catch
    try{
        if(users){
            //console.log('Hello wworld');
            //res.status(200).json(users);
            console.log(users[0]);
            let myObject = {}
            for (var key in users){
                console.log(key);
                myObject[key] = users[key];
            } 
            return res.status(200).json(myObject);
           //return res.status(200).json(users);
        }else{
           return res.status(404).json({
                message: 'No user is found'
            });
        }
    }catch(error){
        throw error;
    }
}

router.get('/users', async (req, res) => {
    

     await User.find()
     .lean()
    .exec()
    .then(data=> {
        //console.log('Data', data);
      return res.send(data);
    })
    .catch( () => {
       return res.status(404).json(
           {message:"No user was found"}
        );

    });


    //const data = users.toJSON({users})

    
});

router.get('/users/:id',async (req, res) => {

    const id = req.params.id

   await User.findById({_id:id})
   .lean()
    .exec()
    .then( data => {
       return res.send(data)
        //console.log(data)
    })
    .catch( () => {
       return  res.json({message:"User not found"});
    })

});
router.post('/signup',async (req, res) => {
    const { username,email,password}=req.body;
    
    
    try {
       const schema=Joi.object(
        {
            username:Joi.string().required(),
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
       
        //const token =jwt.sign({id:user._id},secretKey);
        //console.log(`The token is ${token}`)

        //return res.status(201).json({username,email});
        return res.redirect('/signin');
        
    } catch (error) {
        return res.status(422).json({"message":error});
    }
});


/*
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

    if (!user.validPassword(password)) 
        return res.status(400).json({ 'message':'Incorrect password'});
    //else
    // const {req.session.client}=user._id;
        
    

    //const token = jwt.sign({id:user._id} , process.env.SECRET_KEY);
    //return res.status(200).json({token});


        
        
    } catch (error) {
        return res.status(422).json({"message":error});  
    }
    
});

*/

router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    //req.flash('success_msg', 'You are logged out');
    res.redirect('/signin');
  });
  


router.put('/users/:id',async (req, res) => {

    try {
    const id = req.params.id;
    const schema = Joi.object( {
        username:Joi.string().alphanum().min(3).optional(),
        email:Joi.string().email().optional(),
        password:Joi.string().optional()
    })
    const { error,value} = schema.validate(req.body,schema);
    
    if (error) {
        res.status(422).json({message:"cannot Update user"});
        //console.log('Cannot update user')     
    }

    const { data } = value;
    
    let user = await User.update({_id:id},{$set:data})
    res.status(200).json({user});

    } catch (error) {
       res.status(404).json({message:'An error occured '});
        console.error(error)
    }
  
});




module.exports = router
module.exports.getAllUsers = getAllUsers;
