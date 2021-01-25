import React from 'react'
import Rating from '../Components/rating.jsx'
import { Link } from 'react-router-dom'

const ProductsScreen = (props) => {
    const { item } = props;

    return (
        <>

            <div className="product">
                <img src={item.image} alt={item.name} />
                <Link to={`/product/${item._id}`}>{item.name}</Link>
                <Rating rating={item.rating} numReviews={item.numReviews} />
                <span>₹{item.price}</span>

            </div>




        </>
    )
}

export default ProductsScreen
