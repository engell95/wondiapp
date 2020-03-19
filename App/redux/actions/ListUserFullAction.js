import {FETCHING_DATA_LISTXUSERFULL, FETCHING_DATA_SUCCESS_LISTXUSERFULL, FETCHING_DATA_FAILURE_LISTXUSERFULL} from '../constants'
import {fetchListprodxuserfull} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_LISTXUSERFULL}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_LISTXUSERFULL, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_LISTXUSERFULL}
}

export const fetchDatalistuserfull = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchListprodxuserfull(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}