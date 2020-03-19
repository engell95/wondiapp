import {FETCHING_DATA_SIMILARY, FETCHING_DATA_SUCCESS_SIMILARY, FETCHING_DATA_FAILURE_SIMILARY} from '../constants'
import {fetchSimilary} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SIMILARY}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SIMILARY, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SIMILARY}
}

export const fetchDatasimilary = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchSimilary(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}