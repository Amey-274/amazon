const express = require('express')
const app = express()
const data = require('./data')
const orderRouter = require('./routers/orderRouter')
const port = process.env.PORT|| 5002
const ProductRouter = require('./routers/productRouter')
const userRouter  = require('./routers/userRouter')
const path = require('path');
require('./models/db')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded())

app.use(express.static(path.join(__dirname, './client/build')));

app.get("/*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

app.use('/api/products',ProductRouter)
app.use('/api/user',userRouter)
app.use('/api/orders',orderRouter)


app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}/`)
})  

