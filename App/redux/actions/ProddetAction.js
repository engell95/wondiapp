import {FETCHING_DATA_PRODDET, FETCHING_DATA_SUCCESS_PRODDET, FETCHING_DATA_FAILURE_PRODDET} from '../constants'
import {fetchproddet} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {
    return {type: FETCHING_DATA_PRODDET}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_PRODDET, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_PRODDET}
}

export const fetchDataproddet = () => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchproddet()
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}