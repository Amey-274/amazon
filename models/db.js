const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURI,{
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then((e)=>{
    console.log("DB connected ...")
}).catch((err)=>{
    console.log(err)
})