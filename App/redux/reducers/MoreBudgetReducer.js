import {FETCHING_DATA_MOREBUDGET, FETCHING_DATA_SUCCESS_MOREBUDGET, FETCHING_DATA_FAILURE_MOREBUDGET} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default MorebudgetReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_MOREBUDGET:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_MOREBUDGET:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_MOREBUDGET:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}