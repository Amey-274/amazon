import { SIGNIN_FAIL, SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGN_OUT, USER_ORDER_FAIL, USER_ORDER_REQUEST, USER_ORDER_SUCCESS, USER_PAYMENT_METHOD, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SHIPPING_ADDRESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/SiginConstants";

const initialState = {
    userInfo: (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : []
    ),
    loading: false,
    error: '',
}
const initialState1 = {
    shippingAddress:localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):[]
}
const initialState2={
    orders:localStorage.getItem('orderData') ? JSON.parse(localStorage.getItem('orderData')):[]
}
const siginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_REQUEST:
            return {
                loading: true,
                userInfo: []
            }
        case SIGNIN_SUCCESS:
            return {
                ...state,
                userInfo: [{ ...action.payload }],
                loading: false,
                error: ''
            }
        case SIGN_OUT:
            return {}
        case SIGNIN_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
                userInfo: []
            }
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                userInfo: []
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                userInfo: [{ ...action.payload }],
                loading: false,
                error: ''
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
                userInfo: []
            }
        case USER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                userInfo:[]
            }
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                userInfo: [{ ...action.payload }],
                loading: false,
                error: ''
            }
        case USER_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
                userInfo:[]
               
            }
        default:
            return state
    }

}

const shippingAddressReducer = (state=initialState1,action)=>{
    switch (action.type) {
        case USER_SHIPPING_ADDRESS: 
            return {
                ...state,
                shippingAddress:action.payload
            }
        default:
            return state
    }
}
const PaymentHandlerReducer=(state={payment:'paypal'},action)=>{
    switch (action.type) {
        case USER_PAYMENT_METHOD:
            return {
                ...state,
                payment:action.payload.paymentMethod
            }
        default:
            return state
    }
}
const OrdersHandlerReducer=(state=initialState2,action)=>{
    switch (action.type){
        case USER_ORDER_REQUEST:
            return {
                ...state,
            }
        case USER_ORDER_SUCCESS:
            return {
                ...state,
                orders:action.payload,
                success:true,
            }
        case USER_ORDER_FAIL:{
            return {
                ...state,
                error: action.payload,

            }
        }
        default: return state
    
    
    }   
}
export { siginReducer,shippingAddressReducer,PaymentHandlerReducer ,OrdersHandlerReducer}