import {FETCHING_DATA_USER, FETCHING_DATA_SUCCESS_USER, FETCHING_DATA_FAILURE_USER} from '../constants'

const initialState =  {
    data: [],
    isFeching: true,
    error: false
}

export default userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_USER:
            return {
                ...state,
                data: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_USER:
            return {
                ...state,
                data: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_USER:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}