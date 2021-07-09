const express=require("express")
const colors=require("colors")
const app = express()
const cors =require("cors")
const bodyParser=require("body-parser")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config({path:"../dev.env"})
const Product = require("./models/productModel")
const uploadRoutes=require("./routes/uploadRoutes")
const productRoutes=require("./routes/productRoutes")
const userRoutes=require("./routes/userRoutes")
const orderRoutes=require("./routes/orderRoutes")
const path = require("path")
const morgan =require("morgan")
app.use(cors())
connectDB()
app.use(bodyParser.json())
app.get("/",async (req,res)=>{
  // console.log(req.query.keyword)
  const keyword =req.query.keyword ? {
    name:{
      $regex:req.query.keyword,
      $options:"i"//case insensitive search
    }}: {}
  
    const products =await Product.find({...keyword})
    // console.log(products)
    res.send(products)
    
})
if(process.env.NODE_ENV="development"){
  app.use(morgan("dev"))
}
app.use("/users",userRoutes)
app.use("/product",productRoutes)
app.use("/orders",orderRoutes)
app.get("/config/paypal",(req,res)=>{
  console.log(process.env.PAYPAL_CLIENT_ID)
  res.send(process.env.PAYPAL_CLIENT_ID)  
})
app.use("/upload",uploadRoutes)
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))
app.listen(process.env.PORT,console.log(`server started in ${process.env.PORT} `.cyan))