import {FETCHING_DATA_SHOP, FETCHING_DATA_SUCCESS_SHOP, FETCHING_DATA_FAILURE_SHOP} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default ShopReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_SHOP:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_SHOP:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_SHOP:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}