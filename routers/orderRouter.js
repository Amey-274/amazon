const express = require('express')
const { isAuth } = require('../utils')
const expressAsyncHandler  = require('express-async-handler')
const orderRouter =express()
const Order = require("../models/orderModel")

orderRouter.post('/',isAuth,expressAsyncHandler(async(req,res)=>{
    const rs = new Order({
        orderItems: req.body.cartItems,
        shippingAddress:req.body.shipping.shippingAddress,
        paymentMethod:req.body.payment.payment,
        itemsPrice:req.body.items,
        taxPrice:req.body.Tax,
        shippingPrice:0,
        totalPrice:req.body.orderTotal,
        user:req.user._id,


    })
    if(rs){
        try{
            const rs1 = await rs.save()
      
            res.status(200).send(rs)
        }catch(err){
          res.status(500).send({message:err.message})
            
        }
    }else{
        res.status(404).send({message:'Order Details Not Found '})
    }






}))


module.exports = orderRouter