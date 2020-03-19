import {FETCHING_DATA_PREFERENCES, FETCHING_DATA_SUCCESS_PREFERENCES, FETCHING_DATA_FAILURE_PREFERENCES} from '../constants'
import {PostUserCatg} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_PREFERENCES}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_PREFERENCES, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_PREFERENCES}
}

export const fetchDataPreferences = (data) => {
    const user_id = data.user_id;
    const cat_empresa = data.cat_empresa;
    return (dispatch) => {
        dispatch(getData())
        PostUserCatg(user_id,cat_empresa)
        .then(([response, json]) => {
            //console.log(json)
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }	
}