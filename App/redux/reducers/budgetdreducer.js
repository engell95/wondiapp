import {FETCHING_DATA_BUDGET_D, FETCHING_DATA_SUCCESS_BUDGET_D, FETCHING_DATA_FAILURE_BUDGET_D} from '../constants'

const initialState =  {
    item: [],
    isFeching: true,
    error: false,
    fin:false
}

export default BudgetDReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_DATA_BUDGET_D:
            return {
                ...state,
                item: [],
                isFeching: true,
                fin:false
            }
        case FETCHING_DATA_SUCCESS_BUDGET_D:
            return {
                ...state,
                item: action.data,
                isFeching: false,
                fin:true
            }
        case FETCHING_DATA_FAILURE_BUDGET_D:
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