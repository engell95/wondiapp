import {FETCHING_DATA_PROMOFULL, FETCHING_DATA_SUCCESS_PROMOFULL, FETCHING_DATA_FAILURE_PROMOFULL} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false,
    fin:false
}

export default PromofullReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_PROMOFULL:
            return {
                ...state,
                item: [],
                isFeching: true,
                fin:false
            }
        case FETCHING_DATA_SUCCESS_PROMOFULL:
            return {
                ...state,
                item: action.data,
                isFeching: false,
                fin:true
            }
        case FETCHING_DATA_FAILURE_PROMOFULL:
            return {
                ...state,
                isFeching: false,
                error: true,
                fin:true 
            }
        default:
        return state
    }
}