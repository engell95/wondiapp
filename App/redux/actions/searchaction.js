import {FETCHING_DATA_SEARCH, FETCHING_DATA_SUCCESS_SEARCH, FETCHING_DATA_FAILURE_SEARCH} from '../constants'
import {fetchSearch} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SEARCH}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SEARCH, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SEARCH}
}

export const fetchDataSearch = (val) => {
    return (dispatch) => {
        dispatch(getData())
        fetchSearch(val)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}