const express = require('express')
const app = express()
const data = require('./data')
const orderRouter = require('./routers/orderRouter')
const port = process.env.PORT|| 5000
const ProductRouter = require('./routers/productRouter')
const userRouter  = require('./routers/userRouter')
require('./models/db')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    res.send(" server is ready ")
})
           
app.use('/api/products',ProductRouter)
app.use('/api/user',userRouter)
app.use('/api/orders',orderRouter)



app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
if(process.env.NODE_ENV=="production"){
    app.use(express.static('../frontend/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(port,()=>{
    console.log(`http://localhost:${port}/api/products/data`)
})  

