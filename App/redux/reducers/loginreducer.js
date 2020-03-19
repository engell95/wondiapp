import {FETCHING_DATA_LOGIN, FETCHING_DATA_SUCCESS_LOGIN, FETCHING_DATA_FAILURE_LOGIN} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_LOGIN:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_LOGIN:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_LOGIN:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}