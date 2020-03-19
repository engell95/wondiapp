import {FETCHING_DATA_PROMO_PROD, FETCHING_DATA_SUCCESS_PROMO_PROD, FETCHING_DATA_FAILURE_PROMO_PROD} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false,
    fin:false
}

export default PromoReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_PROMO_PROD:
            return {
                ...state,
                item: [],
                isFeching: true,
                fin:false
            }
        case FETCHING_DATA_SUCCESS_PROMO_PROD:
            return {
                ...state,
                item: action.data,
                isFeching: false,
                fin:true
            }
        case FETCHING_DATA_FAILURE_PROMO_PROD:
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