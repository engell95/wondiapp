import {FETCHING_DATA_SUGGESTIONS, FETCHING_DATA_SUCCESS_SUGGESTIONS, FETCHING_DATA_FAILURE_SUGGESTIONS} from '../constants'
import {fetchSuggestions} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {
    return {type: FETCHING_DATA_SUGGESTIONS}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SUGGESTIONS, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SUGGESTIONS}
}

export const fetchDataSuggestions = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchSuggestions(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}