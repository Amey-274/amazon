const express = require('express');
const ProductRouter = express.Router();
const Product = require('../models/ProductModel')
const data = require('../data');
const expressAsyncHandler = require('express-async-handler')

ProductRouter.get('/',expressAsyncHandler(async(req,res)=>{
    try{    
        const Prodata = await Product.insertMany(data.products)
        res.status(200).send(Prodata)
    }catch(err){
        res.status(500).send({message:err.message})
    }

}))

ProductRouter.get('/data',expressAsyncHandler(async(req,res)=>{
    try{    
        const Prodata = await Product.find()
        res.status(200).send(Prodata)
    }catch(err){
        res.status(500).send({message:err.message})
    }

}))

ProductRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const {id} = req.params
    try{    
        const Prodata = await Product.findById(id)
        res.status(200).send(Prodata)
    }catch(err){
        res.status(500).send({message:err.message})
    }

}))

module.exports = ProductRouter