import {FETCHING_DATA_PREFERENCES, FETCHING_DATA_SUCCESS_PREFERENCES, FETCHING_DATA_FAILURE_PREFERENCES} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false,
}

export default PreferencesReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_PREFERENCES:
            return {
                ...state,
                item: [],
                isFeching: true,
            }
        case FETCHING_DATA_SUCCESS_PREFERENCES:
            return {
                ...state,
                item: action.data,
                isFeching: false,
            }
        case FETCHING_DATA_FAILURE_PREFERENCES:
            return {
                ...state,
                isFeching: false,
                error: true,
            }
        default:
        return state
    }
}