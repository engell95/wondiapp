import {FETCHING_DATA_RESULT, FETCHING_DATA_SUCCESS_RESULT, FETCHING_DATA_FAILURE_RESULT} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default ResultReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_RESULT:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_RESULT:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_RESULT:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}