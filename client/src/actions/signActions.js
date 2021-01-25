import axios from "axios";
import { 
     SIGNIN_FAIL,
     SIGNIN_REQUEST, 
     SIGNIN_SUCCESS, 
     SIGN_OUT ,
     USER_REGISTER_SUCCESS,
     USER_REGISTER_REQUEST,
     USER_REGISTER_FAIL,
     USER_SHIPPING_ADDRESS,
     USER_PAYMENT_METHOD,
     USER_UPDATE_REQUEST,
     USER_UPDATE_SUCCESS,
     USER_UPDATE_FAIL,
     USER_ORDER_SUCCESS,
     USER_ORDER_FAIL,
     USER_ORDER_REQUEST
} from "../constants/SiginConstants"

const siginHandler = (userData) =>async(dispatch,getState)=>{
    dispatch({type:SIGNIN_REQUEST})
    try{
        const {data} =await axios.post('/api/user',{
            ...userData,
        });
        dispatch({type:SIGNIN_SUCCESS,payload:data})
        localStorage.setItem('userInfo',JSON.stringify(getState().signIn.userInfo))
    }catch(error){
        dispatch({
            type: SIGNIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })

    }
}
const signInout = ()=>async(dispatch,getState)=>{
    dispatch({type:SIGN_OUT})
    localStorage.setItem('userInfo',JSON.stringify(getState().signIn))
    
}


// resigster actions 

const RegisterHandler = (userData) =>async(dispatch,getState)=>{
    dispatch({type:USER_REGISTER_REQUEST})
    try{
        const {data} =await axios.post('/api/user/register',{
            ...userData,
        });
        dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        localStorage.setItem('userInfo',JSON.stringify(getState().signIn.userInfo))
    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })

    }
}

const ShippingAddressHandler = (userData)=>async(dispatch,getState)=>{
        dispatch({type:USER_SHIPPING_ADDRESS,payload:{...userData}})
        localStorage.setItem('shippingAddress',JSON.stringify(getState().shipping.shippingAddress))
    
        
}   
const PaymentHandler = (userData)=>async(dispatch,getState)=>{
     dispatch({type:USER_PAYMENT_METHOD,payload:{...userData}})
     localStorage.setItem('PaymentMethod',JSON.stringify(getState().payment.payment.paymentMethod))
     
}  

const UpdateHandler = (userData)=>async(dispatch,getState)=>{
    const data1=getState().signIn.userInfo[0]
    const {token} = data1
    dispatch({type:USER_UPDATE_REQUEST})
    
    try{
        const {data} =await axios.put('/api/user/update',{
            ...userData,
            token
        });
        dispatch({type:USER_UPDATE_SUCCESS,payload:data})
        localStorage.setItem('userInfo',JSON.stringify(getState().signIn.userInfo[0]))
    }catch(error){
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
   
}
const placeOrderHandler = (userData)=>async(dispatch,getState)=>{
    dispatch({type:USER_ORDER_REQUEST})
    const {Cart,shipping,payment,signIn}=getState();
    const {userInfo}=signIn;
    const {token} = userInfo[0];
    const {cartItems} = Cart

    try{
        const {data}=await axios.post('/api/orders',{
            ...userData,
            shipping,
            payment,
            token,
            cartItems
            
        });
        console.log(data)
        dispatch({type:USER_ORDER_SUCCESS,payload:data})
     localStorage.setItem('orderData',JSON.stringify(getState().order))

    }catch(error){
        dispatch({
            type: USER_ORDER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}
export {siginHandler,signInout,RegisterHandler,ShippingAddressHandler,PaymentHandler,UpdateHandler,placeOrderHandler}