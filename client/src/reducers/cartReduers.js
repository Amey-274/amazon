
const { CART_ADD_ITEMS, CART_REMOVE_ITEMS } = require("../constants/cartConstants")
const initialState = {
    loading: true,
    cartItems: (localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []
    )
}
const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case CART_ADD_ITEMS:
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product_id === item.product_id)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product_id === existItem.product_id ? item : x),
                    loading: false
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    loading: false

                }
            }
        case CART_REMOVE_ITEMS:
            const id = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product_id !== id),
                loading: false

            }
        default:
            return state

    }

}

export { cartReducer }
