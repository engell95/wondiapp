import {FETCHING_DATA_USEREDIT, FETCHING_DATA_SUCCESS_USEREDIT, FETCHING_DATA_FAILURE_USEREDIT} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_USEREDIT:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_USEREDIT:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_USEREDIT:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}