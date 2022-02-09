const express =require("express");
const connectTomongo = require("../db");
const User = require("../modals/User");
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT="hritikChouhan$324"
const fetchuser = require("../Middleware/Fetchuser")

//Rotue 1: Create teh entities to createuser by /api/auth/createuser
router.post('/createuser',[
    body('name','Enter the valid name').isLength({ min: 5 }),
    body('email','Enter the valid email').isEmail(),
    body('password','Enter the valid Password').isLength({ min: 5 }),
],async (req,res)=>{
  let success = false;
    //If there is error exist then these fucntion run
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
        
   
    //Check if dublicate is exist or not
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({success,error : "sorry email is already exist!"})
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
     user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data= {
        user:{
          id : user.id
        }
      }
     const authToken=jwt.sign(data,JWT);
      success=true;
      res.json({success,authToken})
    } catch (error) {
        console.log(error);
        res.status(500).json("Catching some error")
    }
    
})
//Rotue 2 : Authenctication in login teh entities to createuser by /api/auth/login
router.post('/login',[
  body('email','Enter the valid email').isEmail(),
  body('password','Password should be not blanked').exists(),
],async (req,res)=>{
  let  success=false;
  //If there is error exist then these fucntion run
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      success=false;
      res.status(400).json({error : "Please login with correct crendential"})
    }

    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
      success=false;
      res.status(400).json({success,error : "Please login with correct crendential"})
    }
    const data= {
      user:{
        id : user.id
      }
    }
   const authToken=jwt.sign(data,JWT);
   success=true;
    res.json({success,authToken})
  } catch (error) {
    console.log(error);
    res.status(401).json("Catching some error")
}

})
//Rotue 3 : Get the user detail  /api/auth/getuser
router.post('/getuser',fetchuser,async (req,res)=>{
 try {
   userId = req.user.id;
   const user = await User.findById(userId).select("-password");
   res.send(user);
 } catch (error) {
  console.log(error);
  res.status(500).json("Catching some error")
}


})
module.exports=router