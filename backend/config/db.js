const mongoose = require("mongoose")
const dotenv = require("dotenv").config({path:"../dev.env"})
const connectDB= async ()=>{
    try{
        const con =await mongoose.connect(process.env.MONGO_URI,{
            useCreateIndex:true,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`connected to database ${process.env.MONGO_URI}`.green)
    }
  

    catch(error){
        console.log(`Error connecting to database ${process.env.MONGO_URI} and the error is ${error.message}`.red.bold)
    }
   
}

module.exports = connectDB