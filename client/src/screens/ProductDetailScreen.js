import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../Components/rating'
import LoadingBox from '../Components/LoadingBox'
import MessageBox from '../Components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails } from '../actions/productActions'
const ProductDetailScreen = (props) => {
    const [Qty, setQty] = useState(1)
    const { id } = useParams()

    const dispatch = useDispatch()
    const { loading, error, ProductDetails } = useSelector(state => state.ProductDetails)
    const item = Array(ProductDetails)
    useEffect(() => {
        dispatch(productDetails(id))
    }, [dispatch, id])
    console.log(Qty)
    return (
        loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
                    <div className="products-detail">
                        {
                            item.length > 0 ? (
                                <div >
                                    {
                                        item.map((data, i) =>
                                            <div key={i} className="product-details">
                                                <div className='img-large'>
                                                    <img src={data.image} alt={data.name} />

                                                </div>
                                                <div className='productdetails'>
                                                    <h1>{data.name}</h1>
                                                    <Rating rating={data.rating} numReviews={data.numReviews} />
                                                    <h1>Price ₹{data.price}</h1><br />
                                                    <p>Description:{data.description}</p>

                                                </div>
                                                <div className='product-data'>
                                                    <div className='fix'>
                                                        <div>Price</div>
                                                        <div>
                                                            ₹{data.price}
                                                        </div>
                                                    </div>
                                                    <div className='fix'>

                                                        {
                                                            data.countInStock > 0 ? (
                                                                <>
                                                                    <div>
                                                                        Status
                                                                </div>
                                                                    <div className='stock'>
                                                                        <p> In Stock</p>
                                                                    </div>

                                                                </>
                                                            ) : (
                                                                    <>
                                                                        <div>
                                                                            Status
                                                                    </div>
                                                                        <div className='not-stock'>

                                                                            <p>Unavaliable</p>
                                                                        </div>

                                                                    </>
                                                                )



                                                        }


                                                    </div>
                                                    {data.countInStock > 0 ? (
                                                        <div className='fix'>
                                                            <div>
                                                                Qty
                                                        </div>
                                                            <select value={Qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >

                                                                {
                                                                    [...Array(data.countInStock).keys()].map((x) =>
                                                                        <option key={x} value={x + 1}>{x + 1}</option>
                                                                    )
                                                                }

                                                            </select>
                                                        </div>
                                                    ) : (
                                                            <div></div>
                                                        )

                                                    }
                                                    <div className='fix'>
                                                        {
                                                            (data.countInStock > 0) ? (
                                                                <button onClick={() => { props.history.push(`/cart/${id}?qty=${Qty}`) }} className='primary fw'>Add To Cart</button>
                                                            ) : (
                                                                    ''
                                                                )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                    <h1>NOT Found</h1>
                                )
                        }
                    </div>



                )
    )
}

export default ProductDetailScreen
