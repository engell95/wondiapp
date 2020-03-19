import {FETCHING_DATA_LISTXUSER, FETCHING_DATA_SUCCESS_LISTXUSER, FETCHING_DATA_FAILURE_LISTXUSER} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default ListxuserReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_LISTXUSER:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_LISTXUSER:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_LISTXUSER:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}