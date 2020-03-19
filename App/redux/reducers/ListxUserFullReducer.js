import {FETCHING_DATA_LISTXUSERFULL, FETCHING_DATA_SUCCESS_LISTXUSERFULL, FETCHING_DATA_FAILURE_LISTXUSERFULL} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default ListxuserfullReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_LISTXUSERFULL:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_LISTXUSERFULL:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_LISTXUSERFULL:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}