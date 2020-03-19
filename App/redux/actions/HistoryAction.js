import {FETCHING_DATA_HISTORY, FETCHING_DATA_SUCCESS_HISTORY, FETCHING_DATA_FAILURE_HISTORY} from '../constants'
import {fetchhistory} from '../api';
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {
    return {type: FETCHING_DATA_HISTORY}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_HISTORY, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_HISTORY}
}

export const fetchDataHistory = (id) => {
    return (dispatch) => {
        dispatch(getData())
        fetchhistory(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}