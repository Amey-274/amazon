import  {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReduers';
import {ProductReducer,ProductDetailsReducer} from  './reducers/ProductReducers'
import { OrdersHandlerReducer, PaymentHandlerReducer, shippingAddressReducer, siginReducer } from './reducers/signReduers';

const rootReducer=combineReducers({
    ProductData:ProductReducer,
    ProductDetails:ProductDetailsReducer,
    Cart:cartReducer,
    signIn:siginReducer,
    shipping:shippingAddressReducer,
    payment:PaymentHandlerReducer,
    order:OrdersHandlerReducer,
    
})



const componseEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//create store 
const store = createStore(rootReducer,componseEnhancer(applyMiddleware(thunk)))
export default store



