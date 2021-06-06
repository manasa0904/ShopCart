const asyncHandler=require("express-async-handler")
const Order = require("../models/orderModel")
const generateToken=require("../utils/tokens")

// post
//path -- /orders

const addOrderItems = asyncHandler(async (req,res)=>{
   //console.log(req.body)
     const {orderItems,shippingAddress,totalPrice,taxPrice,itemPrice,paymentMethod}=req.body
     //console.log(orderItems)
     if(orderItems.length===0){
         res.status(400)
         throw new Error("No order items")
        return
     }
     else{
         const order = new Order({
            user:req.user._id,
            orderItems,
            shippingAddress,
            
            totalPrice,
            taxPrice,
           
            itemPrice,paymentMethod
         })
         const createorder = await  order.save()
         res.send(createorder)
     }
     
 })
 // get
//path -- /orders/order._id

const getOrder = asyncHandler(async (req,res)=>{
   
    const id=req.params.id
    //console.log(id)
    const order=await (await Order.findById(id)).populate('user','name email')
    //console.log(order)
    if(order){
        res.send(order)
    }else{
        res.sendStatus(401)
        throw new Error("order doesn't exist")
    }
})
 

 //put
//path -- /orders/order._id/pay

const updateOrderToPaid = asyncHandler(async (req,res)=>{
   
    const id=req.params.id
    
    const order=await (await Order.findById(id))
    
    if(order){
        order.paidAt=Date.now()
        order.isPaid=true
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
       email:req.body.payer.email_address,

        }
        //console.log(order)
        const updatedOrder = await order.save()
        //console.log(updatedOrder)
        res.send(updatedOrder)
    }else{
        res.sendStatus(401)
        throw new Error("order update failed")
    }
})

 //put
//path -- /orders/order._id/deliver
const updateOrderToDelivered = asyncHandler(async (req,res)=>{
   
    const id=req.params.id
    
    const order=await (await Order.findById(id))
    
    if(order){
        order.deliveredAt=Date.now() 
        order.isDelivered=true
       
        //console.log(order)
        const updatedOrder = await order.save()
        console.log(updatedOrder)
        res.send(updatedOrder)
    }else{
        res.sendStatus(401)
        throw new Error("order update failed")
    }
})


 //get
//path -- /orders/myorders

const getMyOrders = asyncHandler(async (req,res)=>{
   
    //console.log(typeOf(req.user._id))
    const id=(req.user._id)
    
    const orders= (await Order.findOne({user:id}))
   if(orders){
       res.send(orders)
   
    }else{
        res.sendStatus(401)
        throw new Error("order update failed")
    }
})

const getAdminOrders = asyncHandler(async (req,res)=>{
    const orders= (await Order.find({}).populate("user", "id name"))
   if(orders){
       //console.log(orders)
       res.send(orders)
   
    }else{
        res.sendStatus(401)
        throw new Error("order update failed")
    }
})
 
 module.exports={addOrderItems:addOrderItems,
    getOrder:getOrder,
    getMyOrders:getMyOrders,
    getAdminOrders:getAdminOrders,
   updateOrderToPaid:updateOrderToPaid,
updateOrderToDelivered:updateOrderToDelivered,}