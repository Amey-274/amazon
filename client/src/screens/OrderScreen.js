import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
// import CheckoutWizard from '../Components/CheckoutWizard'
import { Link, useParams } from 'react-router-dom'
import {placeOrderHandler} from '../actions/signActions'
import MessageBox from '../Components/MessageBox'
const PlaceOrderScreen = (props) => {
    const { shipping, payment, Cart,order } = useSelector(state => state)
    const {orders} = order
    const {success} = orders
    
    console.log(orders)
    const {id}=useParams()
    const dispatch = useDispatch()
    const { shippingAddress } = shipping
    const { cartItems } = Cart
    const item = cartItems.reduce((a,c)=>a+c.qty* c.price ,0)
    const items  = item.toFixed(2)

    const orderTotal = (items+ 0 + 48)
    
    console.log(orders.orders.isPaid)

    const placeOrder = (e)=>{
        dispatch(placeOrderHandler({items,orderTotal,Tax:0.00,shipping:0.00}))
        if(success){
            props.history.push(`/order/${orders.orders._id}`)
        }
    }
    return (
        <div>
            <h1 className='head'> Order {id}</h1>
            <div className='placeOrder'>
                <div className='orders'>
                    <ul className='shipping-data'>
                        <li className='shipping'>
                            <h2>Shipping</h2>
                            <p><span>Name:</span>{shippingAddress.fullname}</p>
                            <p><span>Address:</span>{shippingAddress.Address}  {shippingAddress.city}{shippingAddress.postalCode}   {shippingAddress.country}</p>
                        {
                            !(orders.orders.isDelivered)?<MessageBox variant='danger'>Not Delivered</MessageBox>:<MessageBox variant='info'> Delivered </MessageBox>

                        }
                        </li>
                        <li className='payment'>
                            <h2>Payment </h2>
                            <p><span>Method:</span>{payment.payment}</p>
                            {
                            !(orders.orders.isPaid)?<MessageBox variant='danger'>Not Paid</MessageBox>:<MessageBox variant='info'> is Paid </MessageBox>

                             }
                        </li>
                        <li className='order-item'>
                            <h1>Order items</h1>
                            {
                                cartItems.map((item, i) =>
                                    <ul className='cart-item' key={i}>
                                        <li>
                                            <img src={`${item.image}`} alt={item.name} />
                                        </li>
                                        <li>
                                            <Link to={`/product/${item.product_id}`}>{item.name}</Link>

                                        </li>
                                        <li>
                                            <span>
                                                {
                                                    item.qty
                                                }
                                            </span>
                                            <span>
                                                X 
                                                ₹{
                                                    item.price
                                                }
                                            </span>   
                                            <span>
                                                =
                                                ₹{
                                                    item.qty * item.price
                                                }
                                            </span>
                                        </li>
                                    </ul>
                                )

                            }
                        </li>
                    </ul>

                </div>
                <div className='total'>
                   <div className='total1'>
                        <h1>Order Summary</h1>
                   </div>
                    <div className='total2'>
                            <div className='total-heading'>
                                <p>Items</p>

                            </div>
                            <div>
                                <p> ₹{items}</p>
                            </div>
                    </div>
                    <div className='total2'>
                            <div className='total-heading'>
                                <p>Shipping</p>

                            </div>
                            <div>
                                <p> ₹{Number(0.00)}</p>
                            </div>
                    </div>
                    <div className='total2'>
                            <div className='total-heading'>
                                <p>Tax</p>

                            </div>
                            <div>
                                <p> ₹{Number(48.00)}</p>
                            </div>
                    </div>
                    <div className='total3'>
                            <div className='total-heading'>
                                <h2>Order Total</h2>

                            </div>
                            <div>
                                <h2> ₹{items}</h2>
                            </div>
                    </div>
                    <button className='primary fw c'  onClick={placeOrder}>
                            PlaceOrder
                    </button>
                </div>

            </div>
        </div>
    )
}

export default PlaceOrderScreen
