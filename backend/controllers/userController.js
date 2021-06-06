const asyncHandler=require("express-async-handler")
const User = require("../models/userModel")
const generateToken=require("../utils/tokens")
// const authentication={}

//post
 const authUsers = asyncHandler(async (req,res)=>{
   
   const {email,password} =req.body
  const user = await User.findOne({email:email})
  if(user && (await user.matchPassword(password))){
     res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
     })
  }else{
     res.sendStatus(401)
     throw new Error("Invalid user name and password")
  }

    
})

//register post method
const registerUsers = asyncHandler(async (req,res)=>{
   
   const {name,email,password} =req.body
  const userExists = await User.findOne({email:email})
  if(userExists){
     res.sendStatus(400)
     throw new Error("user already exists")

  }
  const user=await User.create({name,email,password})
  if(user){
     res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      password:user.password,
      //token:generateToken(user._id)
   }

     )
  }
  else{
   
     res.sendStatus(401)
     throw new Error("Invalid data")
     
  }

    
})
//get
//PATH-- users/profile
 const authUsersProfile = asyncHandler(async (req,res)=>{
   //console.log(req.user)
   const user = await User.findOne({_id:req.user._id})

   if(user){
      res.json({
         _id:user._id,
         name:user.name,
         email:user.email,
         isAdmin:user.isAdmin,
         token:generateToken(user._id)
      })
   }else{
      res.sendStatus(401)
      throw new Error("No user found")
   }
    
})
//put request
// PATH -- users/profile
const updateUserProfile = asyncHandler(async (req,res)=>{

   const user = await User.findOne({_id:req.user._id})
   if(user){
     user.name=req.body.name || user.name
     user.email=req.body.email || user.email
     if(user.password){
        user.password=req.body.password
     }
     const updatedUser=await user.save ()

   res.json({
      _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        token:generateToken(updatedUser._id)
   })
   }else{
      res.sendStatus(401)
      throw new Error("No user found")
   }
   
})

//get
// path --- /
const getUser = asyncHandler(async (req,res)=>{
   
   const user = await User.find({})
//console.log(user)
   if(user.length>0){
      res.send(
         user
      )
   }else{
      res.sendStatus(404)
      throw new Error("No user found")
   }
    
})
//path users/id
//delete user
const deleteUser = asyncHandler(async (req,res)=>{
   
   const user = await User.findById(req.params.id)
//console.log(user)
   if(user){
     await  user.remove()
     res.json({message:"user deleted successfully"})
   }else{
      res.sendStatus(404)
      throw new Error("No user found")
   }
    
})

const getUserById = asyncHandler(async (req,res)=>{
   
   const user = await User.findById(req.params.id).select("-password")
//console.log(user)
   if(user){
     
     res.json(user)
   }else{
      res.sendStatus(404)
      throw new Error("No user found")
   }
    
})
 //path put /users/id

const updateUser = asyncHandler(async (req,res)=>{
//console.log(req.params.id)
   const user = await User.findOne({_id:req.params.id})
   if(user){
     user.name=req.body.name || user.name
     user.email=req.body.email || user.email
     user.isAdmin=req.body.isAdmin
     const updatedUser=await user.save ()

   res.json({
      _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
        
   })
   }else{
      res.sendStatus(401)
      throw new Error("No user found")
   }
   
})
module.exports = {
   registerUser:registerUsers,
   usersAuth: authUsers,
   usersProfile: authUsersProfile,
   updateUserProfile:updateUserProfile,
   getUser:getUser,
   deleteUser:deleteUser,
   getUserById:getUserById,
   updateUser:updateUser,
};

