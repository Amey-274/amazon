import {
    PRODUCT_DATA_FAIL,
    PRODUCT_DATA_REQUEST,
    PRODUCT_DATA_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS
} from "../constants/ProductConstants"
import axios from 'axios'
const listOfProducts = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DATA_REQUEST })
    try {
        const data = await axios.get('/api/products/data')
        dispatch({ type: PRODUCT_DATA_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_DATA_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })

    }
}
const productDetails = (id) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    try {
        const data = await axios.get(`/api/products/${id}`)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })

    }
}

export { listOfProducts,productDetails }