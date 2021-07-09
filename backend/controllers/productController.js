const asyncHandler=require("express-async-handler")
const Product = require("../models/productModel")


//path product/id
//get
const getProductsById = asyncHandler(async (req,res)=>{
        const id= req.params.id
        const products =await Product.findOne({_id:id})
     
        res.send(products)
    
  })

//path product/id
//delete
//private/admin
  const deleteProductsById = asyncHandler(async (req,res)=>{
   const id= req.params.id
    const products =await Product.findById(id)
     //console.log(products)
  if(products){
      await products.remove()
  }else{
      res.sendStatus(404)
      throw new Error("Product not found")
  }
})

//path product---create new product
//post
//private/admin
const createProduct = asyncHandler(async (req,res)=>{
  const product=new Product({
    name:"Sample Name",
    price:0,
    user:req.user._id,
    image:"/images/sample.jpeg",
    brand:"sample brand",
    category:"sample category",
    countInStock:0,
    numReviews:0,
    description:"sample des"
  })
  const createdProduct=await product.save()
  res.json(createdProduct)
})

//path product/id---updateproduct
//put
//private/admin
const updateProduct = asyncHandler(async (req,res)=>{
 const {name,price,image,brand,category,countInStock,numReviews,description}=req.body
 const product =await Product.findById(req.params.id)
 if(product){
  product.name=name,
  product.price=price,
  product.user=req.user._id,
  product.image=image,
  product.description=description,
  product.countInStock=countInStock,
  //product.numReviews=numReviews,
  product.brand=brand,
  product.category=category

  const updatedItem=await product.save()

  res.send(updatedItem)
 }else{
   res.sendStatus(404)
    throw new Error("Product not found")
 }
})

//path product/:id/reviews---updateproduct
//post
//private
const createReviews = asyncHandler(async (req,res)=>{
  const {rating,comment}=req.body
  const product =await Product.findById(req.params.id)
  //console.log(product,req.user)
  if(product){
  console.log(product.user)
   const alreadyReviewed=product.reviews.find(r => r.user.toString()===req.user._id.toString())
   if(alreadyReviewed){
     res.sendStatus(400)
     throw new Error("Product already reviewed")
   }

  const review ={
    user:req.user._id,
    rating:Number(rating),
    comment:comment,
    name:req.user.name
  }
  product.reviews.push(review)
  product.numReviews=product.reviews.length

  product.rating = product.reviews.reduce((acc,item)=> item.rating+acc,0 ) / product.reviews.length
await product.save()
res.status(200)
res.send("product reviewed")
  }else{
    res.sendStatus(404)
     throw new Error("Product not found")
  }
 })

  module.exports={
      getProductsById:getProductsById,
      deleteProductsById:deleteProductsById,
      createdProduct:createProduct,
      updateProduct:updateProduct,
      createReviews:createReviews,
  }