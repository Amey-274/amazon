import axios from "axios"
import { CART_ADD_ITEMS, CART_REMOVE_ITEMS } from "../constants/cartConstants"

const addToCart=(productId,qty)=>async(dispatch,getState)=>{
    console.log(qty)
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch({
        type:CART_ADD_ITEMS,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product_id:data._id,
            qty,

        }
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().Cart.cartItems))
  

}
const removeToacart =(id)=>(dispatch,getState)=>{
        dispatch({type:CART_REMOVE_ITEMS,payload:id})
        localStorage.setItem('cartItems',JSON.stringify(getState().Cart.cartItems))

}
export {addToCart,removeToacart}