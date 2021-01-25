import Header from './Components/Header.jsx'
import ProductsScreen from './screens/ProductsScreen'
import Footer from './Components/Footer'
import {Switch,Route} from 'react-router-dom'
import ProductDetailScreen from './screens/ProductDetailScreen'
import { useDispatch, useSelector } from 'react-redux'
import { listOfProducts } from './actions/productActions'
import { useEffect } from 'react'
import LoadingBox from './Components/LoadingBox.jsx'
import MessageBox from './Components/MessageBox.jsx'
import CartScreen from './screens/cartScreen.js'
import SigninScreen from './screens/signinScreen.js'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import ProfileScreen from './screens/ProfleScreen.js'
import OrderScreen from './screens/OrderScreen.js'




function App() {



  const dispatch = useDispatch()
  
  useEffect(() => {
      dispatch(listOfProducts())

  },[dispatch])
  const {loading,error,Product} = useSelector(state=>{ return state.ProductData})
  
  return (
    <div className="App">
        <Header />
        <Switch>
          <Route path='/' exact>
            {  loading?(<LoadingBox></LoadingBox>):
              error?(<MessageBox variant='danger'>{error}</MessageBox>):
                    (
                      <div className="products">
                      {
                        Product.map((item, i) =>
                          <ProductsScreen item={item} key={i} />
                          )
                      }
                      </div>
                    )
            }
          </Route>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route path='/cart' exact component={CartScreen}/>  
          <Route path='/product/:id' component={ProductDetailScreen}/>
          <Route path='/signin' component={SigninScreen}/>
          <Route path='/Register' component={RegisterScreen}/>
          <Route path='/shipping' component={ShippingScreen}/>
          <Route path='/payment' component={PaymentScreen}/>
          <Route path='/placeOrder' component={PlaceOrderScreen}/>
          <Route path='/profile' component={ProfileScreen}/>
          <Route path='/order/:id' component={OrderScreen}/>





        </Switch>
      <Footer/>
    </div>
  );
}

export default App;
