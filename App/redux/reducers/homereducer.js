import {FETCHING_DATA_HOME, FETCHING_DATA_SUCCESS_HOME, FETCHING_DATA_FAILURE_HOME} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default HomeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_HOME:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_HOME:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_HOME:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}