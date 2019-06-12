import {FETCHING_DATA_CATEGORY,FETCHING_DATA_SUCCESS_CATEGORY,FETCHING_DATA_FAILURE_CATEGORY} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default CategoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_CATEGORY:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_CATEGORY:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_CATEGORY:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}