const express = require('express');
const User = require('./../models/user');

const router = express.Router();
let src = "";

router.get('/signup',(req,res)=>{
    res.render('signup',{user: new User(),message: ""});
})
router.get('/login/',(req,res)=>{
    src = req.query.src;
    res.render('login',{message: ""});
})
router.post('/login/',async(req,res)=>{
    const user = await User.findOne({email:req.body.email, password: req.body.password});
    if(user){
        if(src == 'teacher')
            res.redirect('/teacher');
        else
            res.redirect('/student');
    }else{
        req.flash('message',"Invalid Email or Password")
        res.render('login',{message: req.flash('message')});
    }
})
router.post('/signup',async (req,res)=>{
    let user = new User({
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })
    const isUserPresent = await User.findOne({email:req.body.email});
    
    try{
        if(isUserPresent){
            req.flash('message',"User Already Exist")
            res.render('signup',{user:user, message: req.flash('message')});  
        }
        else if(user.password != user.confirmPassword){
            req.flash('message',"Password and confirm password are not matching")
            res.render('signup',{user:user, message: req.flash('message')});  
        }else{
            user = await user.save();
            res.redirect('/auth/login')
        }
        
    }catch(e){
        res.redirect('/auth/signup');
    }
})

module.exports = router;