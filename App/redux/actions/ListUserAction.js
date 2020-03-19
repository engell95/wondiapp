import {FETCHING_DATA_LISTXUSER, FETCHING_DATA_SUCCESS_LISTXUSER, FETCHING_DATA_FAILURE_LISTXUSER} from '../constants'
import {fetchListprodxuser} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_LISTXUSER}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_LISTXUSER, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_LISTXUSER}
}

export const fetchDatalistuser = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchListprodxuser(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}