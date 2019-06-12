import {FETCHING_DATA_SIGNUP, FETCHING_DATA_SUCCESS_SIGNUP, FETCHING_DATA_FAILURE_SIGNUP} from '../constants'

const initialState =  {
    data: [],
    isFeching: true,
    error: false
}

export default signupReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_SIGNUP:
            return {
                ...state,
                data: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_SIGNUP:
            return {
                ...state,
                data: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_SIGNUP:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}