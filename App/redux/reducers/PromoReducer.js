import {FETCHING_DATA_PROMO, FETCHING_DATA_SUCCESS_PROMO, FETCHING_DATA_FAILURE_PROMO} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false,
    fin:false
}

export default PromoReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_PROMO:
            return {
                ...state,
                item: [],
                isFeching: true,
                fin:false
            }
        case FETCHING_DATA_SUCCESS_PROMO:
            return {
                ...state,
                item: action.data,
                isFeching: false,
                fin:true
            }
        case FETCHING_DATA_FAILURE_PROMO:
            return {
                ...state,
                isFeching: false,
                error: true,
                fin:true 
            }
        default:
        return state
    }
}