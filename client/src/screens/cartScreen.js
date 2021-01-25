import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCart, removeToacart } from '../actions/cartAction'
import MessageBox from '../Components/MessageBox';

import { Link } from 'react-router-dom'
const CartScreen = (props) => {
    const qty = props.location.search ? Number(props.history.location.search.split('=')[1]) : 1
    const { id } = useParams()
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.Cart)
    const item = cartItems;
    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))

        }
    }, [dispatch, qty, id])
    const deleteToCart = (id) => {
        dispatch(removeToacart(id))
    }
    const checkOutHandler = () => {
        console.log(props)
        props.history.push('/signin?redirect=shipping')
    }
    const len = item.length;
    return (

        len === 0 ? (
            <MessageBox variant={'info'}>cart empty  <Link to='/'> Go  for Shopping</Link> </MessageBox>
        ) : (
                <div className='fix1'>

                    <div className='cart-product'>
                        {

                            item.map((data, i) =>
                                <Fragment key={i}>

                                    <div className='cart-data'>
                                        <div className='cart-img'>
                                            <img src={data.image} alt={data.name} />
                                        </div>
                                        <div className='cart cart-name'>
                                            <Link to={`/product/${data.product_id}`}>{data.name}</Link>
                                        </div>
                                        <div className='cart qty'>
                                            <select
                                                value={data.qty}
                                                onChange={
                                                    (e) => dispatch(addToCart(data.product_id, Number(e.target.value)))
                                                }

                                            >

                                                {
                                                    [...Array(data.countInStock).keys()].map(x =>
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>

                                                    )
                                                }
                                            </select>

                                        </div>
                                        <div className=' cart cart-price'>
                                            <p>₹{data.price}</p>
                                        </div>
                                        <div className='cart cart-btn'>
                                            <button onClick={() => deleteToCart(data.product_id)} className='btn-small'>Delete</button>
                                        </div>

                                    </div>

                                </Fragment>

                            )
                        }

                    </div>
                    <div className='cart-total'>
                        <div>
                            Subtotal ({item.reduce((a, c) => a + c.qty, 0)}items) : ₹{item.reduce((a, c) => a + c.qty * c.price, 0)}

                        </div>
                        <div>

                            <button onClick={checkOutHandler} className='primary fw'>Proceed to checkout</button>

                        </div>
                    </div>

                </div>
            )

    )
}

export default CartScreen

