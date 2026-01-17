const User = require('../models/User.model');
const {generateToken} = require('../utils/jwt');
const {registerSchema} = require('../utils/validator');

exports.register = async(req,res)=>{
  try{

    await registerSchema.validateAsync(req.body);
    await User.create(req.body);
    res.status(201).json({
      error:false,
      message:'User Registered'});
  }catch(error){
    return res.status(500).json({
      message:error.message,
      error:true
    })
  }
}

exports.login= async(req,res)=>{
  try{

    const user = await User.findOne({email:req.body.email});
    if(!user || !(await user.comparePassword(req.body.password))){
      return res.status(401).json({message:'Invalid Credentials'});
    }
    res.json({
      error:false,
      token:generateToken(user)});
  }catch(error){
    console.log(error);
    return res.status(500).jsn({
      message: error.message,
      error:true
    })
  }
};

exports.logout = async(req,res)=>{
  try {
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).jsn({
      message: error.message,
      error: true,
    });
  }
};