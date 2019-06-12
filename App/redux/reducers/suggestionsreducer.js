import {FETCHING_DATA_SUGGESTIONS, FETCHING_DATA_SUCCESS_SUGGESTIONS, FETCHING_DATA_FAILURE_SUGGESTIONS} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default SuggestionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_SUGGESTIONS:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_SUGGESTIONS:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_SUGGESTIONS:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}