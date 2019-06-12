import {FETCHING_DATA_SHOP_PRO, FETCHING_DATA_SUCCESS_SHOP_PRO, FETCHING_DATA_FAILURE_SHOP_PRO} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default ProductShopReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_SHOP_PRO:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_SHOP_PRO:
            return {
                ...state,
                item: action.data,
                isFeching: 'false'
            }
        case FETCHING_DATA_FAILURE_SHOP_PRO:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}