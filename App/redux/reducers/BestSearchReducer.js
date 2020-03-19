import {FETCHING_DATA_BESTSEARCH, FETCHING_DATA_SUCCESS_BESTSEARCH, FETCHING_DATA_FAILURE_BESTSEARCH} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false
}

export default bestsearchreducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_BESTSEARCH:
            return {
                ...state,
                item: [],
                isFeching: true
            }
        case FETCHING_DATA_SUCCESS_BESTSEARCH:
            return {
                ...state,
                item: action.data,
                isFeching: false
            }
        case FETCHING_DATA_FAILURE_BESTSEARCH:
            return {
                ...state,
                isFeching: false,
                error: true 
            }
        default:
        return state
    }
}