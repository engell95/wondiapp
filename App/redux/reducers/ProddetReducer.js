import {FETCHING_DATA_PRODDET, FETCHING_DATA_SUCCESS_PRODDET, FETCHING_DATA_FAILURE_PRODDET} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false,
}

export default PreferencesReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_PRODDET:
            return {
                ...state,
                item: [],
                isFeching: true,
            }
        case FETCHING_DATA_SUCCESS_PRODDET:
            return {
                ...state,
                item: action.data,
                isFeching: false,
            }
        case FETCHING_DATA_FAILURE_PRODDET:
            return {
                ...state,
                isFeching: false,
                error: true,
            }
        default:
        return state
    }
}