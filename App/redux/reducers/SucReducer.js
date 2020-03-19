import {FETCHING_DATA_SUC, FETCHING_DATA_SUCCESS_SUC, FETCHING_DATA_FAILURE_SUC} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default SucReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_SUC:
            return {
                ...state,
                item: [],
                isFeching: true,
                error: false
            }
        case FETCHING_DATA_SUCCESS_SUC:
            return {
                ...state,
                item: action.data,
                isFeching: false,
                error: false
            }
        case FETCHING_DATA_FAILURE_SUC:
            return {
                ...state,
                item: [],
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}