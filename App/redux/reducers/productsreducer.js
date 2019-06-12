import {FETCHING_DATA_PRODUCTS, FETCHING_DATA_SUCCESS_PRODUCTS, FETCHING_DATA_FAILURE_PRODUCTS} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default ProductsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_PRODUCTS:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_PRODUCTS:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_PRODUCTS:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}