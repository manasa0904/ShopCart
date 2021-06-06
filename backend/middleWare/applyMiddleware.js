const asyncHandler=require("express-async-handler")
const User = require("../models/userModel")
const jwt=require("jsonwebtoken")
const protect =async (req,res,next)=>{
   
    token=req.headers.authorization.split(" ")[1]
    //console.log(token)
if(req.headers.authorization && req.headers.authorization.split(" ")[0]==="Bearer"){
    try{
    decoded=jwt.verify(token,process.env.JWT_SECRET)

   req.user=await User.findOne({_id:decoded.id},{password:0})
  //console.log(req.user)
   next()
}catch(err){
    res.sendStatus(401)
    throw new Error("Not authorized token failed")
}
}if(!token){
    res.sendStatus(401)
}
}

const admin =(req,res,next)=>{
   // console.log(req.user)
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.sendStatus(401)
        throw new Error("Not an admin")
    }
}

module.exports={protect:protect,admin:admin}