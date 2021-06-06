const mongoose= require("mongoose")
const dotenv =require("dotenv").config()
const colors=require("colors")
const connectDB=require("./config/db")
const users=require("./data/user")
const products=require("./data/products")
const productSchema=require("./models/productModel")
const orderSchema =require("./models/orderModel")
const userSchema=require("./models/userModel")


connectDB()

const importData =async ()=>{
    try{
       
        await orderSchema.deleteMany()
        await productSchema.deleteMany()
        await userSchema.deleteMany()
        const insert_user=await userSchema.insertMany(users)
        const adminid=insert_user[0]._id
        const sampleprod=products.map(pro =>{
        
            return{...pro,user:adminid}

        })
        //console.log(sampleprod)
        await productSchema.insertMany(sampleprod)
        
        console.log("Data inserted".green)
    }
    catch(error){
        console.error(`${error.message}`)
    }
}
 importData()

module.exports=importData