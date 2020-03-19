import {FETCHING_DATA_SHOP_D, FETCHING_DATA_SUCCESS_SHOP_D, FETCHING_DATA_FAILURE_SHOP_D} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default ShopDReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_SHOP_D:
            return {
                ...state,
                item: [],
                isFeching: true,
                error: false
            }
        case FETCHING_DATA_SUCCESS_SHOP_D:
            return {
                ...state,
                item: action.data,
                isFeching: false,
                error: false
            }
        case FETCHING_DATA_FAILURE_SHOP_D:
            return {
                ...state,
                item: [],
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}