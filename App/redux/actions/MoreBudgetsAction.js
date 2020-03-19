import {FETCHING_DATA_MOREBUDGET, FETCHING_DATA_SUCCESS_MOREBUDGET, FETCHING_DATA_FAILURE_MOREBUDGET} from '../constants'
import {fetchMorebudgets} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_MOREBUDGET}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_MOREBUDGET, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_MOREBUDGET}
}

export const fetchDatamorebudget = () => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchMorebudgets()
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}