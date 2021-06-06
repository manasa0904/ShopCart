const express=require("express")
const router = express.Router()
const {protect,admin}=require("../middleWare/applyMiddleware")

const {addOrderItems,getOrder,updateOrderToPaid,getMyOrders,getAdminOrders,updateOrderToDelivered} = require("../controllers/orderController")


router.route("/")
.post(protect,addOrderItems)
.get(protect,admin,getAdminOrders)
router.get("/:id",protect,getOrder)
router.route("/myorders").get(protect,getMyOrders)
router.put("/:id/pay",protect,updateOrderToPaid)
router.put("/:id/delivered",protect,admin,updateOrderToDelivered)
module.exports=router