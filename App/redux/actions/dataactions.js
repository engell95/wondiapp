import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE} from '../constants'
import {fetchShop} from '../api'
//import {Toast} from 'native-base';
//import I18n from '../../config/LanguageService';
import { ToastActionsCreators } from 'react-native-redux-toast';

export const getData = () => {
    return {type: FETCHING_DATA}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE}
}

export const fetchDataData = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchShop(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}