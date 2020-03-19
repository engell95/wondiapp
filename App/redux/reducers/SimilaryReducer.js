import {FETCHING_DATA_SIMILARY, FETCHING_DATA_SUCCESS_SIMILARY, FETCHING_DATA_FAILURE_SIMILARY} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default SimilaryReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_SIMILARY:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_SIMILARY:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_SIMILARY:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}