import {FETCHING_DATA_BESTPRICE, FETCHING_DATA_SUCCESS_BESTPRICE, FETCHING_DATA_FAILURE_BESTPRICE} from '../constants'
import {fetchBestprice} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_BESTPRICE}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_BESTPRICE, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_BESTPRICE}
}

export const fetchDatabestprice = () => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchBestprice()
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}