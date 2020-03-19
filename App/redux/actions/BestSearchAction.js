import {FETCHING_DATA_BESTSEARCH, FETCHING_DATA_SUCCESS_BESTSEARCH, FETCHING_DATA_FAILURE_BESTSEARCH} from '../constants'
import {fetchBestsearch} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_BESTSEARCH}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_BESTSEARCH, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_BESTSEARCH}
}

export const fetchDatabestsearch = () => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchBestsearch()
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}