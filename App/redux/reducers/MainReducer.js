import { FETCH_MAIN, FETCH_SUCCEEDED, FETCH_FAILED } from '../constants';

const initialState =  {
    item: [],
    succes: false,
    error: false,
}

export default movieReducers = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MAIN:
            return {
                ...state,
                item: [],
                succes: true,
            }
        case FETCH_SUCCEEDED:
            return {
                ...state,
                item: action.data,
                succes: false
            }
        case FETCH_FAILED:
            return {
                ...state,
                succes: false,
                error: true,
            }
        default:
        return state
    }
}