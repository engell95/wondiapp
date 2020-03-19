import {FETCHING_DATA_HISTORY, FETCHING_DATA_SUCCESS_HISTORY, FETCHING_DATA_FAILURE_HISTORY} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default HistoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_HISTORY:
            return {
                ...state,
                item: [],
                isFeching: true,
                error: false
            }
        case FETCHING_DATA_SUCCESS_HISTORY:
            return {
                ...state,
                item: action.data,
                isFeching: 'false',
                error: false
            }
        case FETCHING_DATA_FAILURE_HISTORY:
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