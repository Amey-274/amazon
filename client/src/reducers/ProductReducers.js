import { PRODUCT_DATA_FAIL, PRODUCT_DATA_REQUEST, PRODUCT_DATA_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constants/ProductConstants";

const ProductReducer = (state = { loading: true, error: '', Product: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DATA_REQUEST: {
            return {
                ...state,
            }
        }
        case PRODUCT_DATA_SUCCESS: {
            return {
                ...state,
                loading: false,
                Product: action.payload.data,
            }
        }
        case PRODUCT_DATA_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        default:
            return state
    }
}
const ProductDetailsReducer = (state = { loading: true, error: '', ProductDetails: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: {
            return {
                ...state
            }
        }
        case PRODUCT_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                ProductDetails: action.payload.data,

            }
        }
        case PRODUCT_DETAILS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,

            }
        }

        default:
            return state
    }


}
export { ProductReducer, ProductDetailsReducer }