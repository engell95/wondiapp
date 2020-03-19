import {FETCHING_DATA_SUC, FETCHING_DATA_SUCCESS_SUC, FETCHING_DATA_FAILURE_SUC} from '../constants'
import {fetchSuc} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SUC}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SUC, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SUC}
}

export const fetchDataSuc = (data) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchSuc(data)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}