const { json } = require('express');
const jwt = require('jsonwebtoken');
const genrateToken  = (data)=>{
    return  jwt.sign({_id:data._id,name:data.name,email:data.email,isAdmin:data.isAdmin},"somethingsecret",{expiresIn:'30d'})



}
const isAuth = (req,res,next)=>{
    const {token} = req.body;
   if(token){
        jwt.verify(token,"somethingsecret",(err,decode)=>{
            if(!err){
                req.user = decode
                next()
            }else{
                res.status(401).send({ message: 'Invalid Token' });

            }
        })
   }else{
        res.status(404).send({ message: 'Token Not Found' });
    
   }
}


module.exports = {
    genrateToken,
    isAuth
}