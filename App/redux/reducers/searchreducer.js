import {FETCHING_DATA_SEARCH,FETCHING_DATA_SUCCESS_SEARCH,FETCHING_DATA_FAILURE_SEARCH} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default SearchReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_SEARCH:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_SEARCH:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_SEARCH:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}