import {FETCHING_DATA_PASS, FETCHING_DATA_SUCCESS_PASS, FETCHING_DATA_FAILURE_PASS} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_PASS:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_PASS:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_PASS:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}