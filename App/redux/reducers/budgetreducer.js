import {FETCHING_DATA_BUDGET, FETCHING_DATA_SUCCESS_BUDGET, FETCHING_DATA_FAILURE_BUDGET} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false,
    fin:false
}

export default BudgetReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_BUDGET:
            return {
                ...state,
                item: [],
                isFeching: true,
                error:false,
                fin:false
            }
        case FETCHING_DATA_SUCCESS_BUDGET:
            return {
                ...state,
                item: action.data,
                isFeching: false,
                error:false,
                fin:true
            }
        case FETCHING_DATA_FAILURE_BUDGET:
            return {
                ...state,
                item: [],
                isFeching: false,
                error: true ,
                fin:true
            }
        default:
        return state
    }
}