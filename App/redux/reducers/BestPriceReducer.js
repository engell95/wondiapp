import {FETCHING_DATA_BESTPRICE, FETCHING_DATA_SUCCESS_BESTPRICE, FETCHING_DATA_FAILURE_BESTPRICE} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default BestpriceReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_BESTPRICE:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_BESTPRICE:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_BESTPRICE:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}