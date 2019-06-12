import {FETCHING_DATA_HOME, FETCHING_DATA_SUCCESS_HOME, FETCHING_DATA_FAILURE_HOME} from '../constants'
import {fetchProductShop} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_HOME}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_HOME, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_HOME}
}

export const fetchDataHome = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchProductShop(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            Toast.show({
            text: I18n.t('validate.error2'),
            buttonText: 'Ok'
            })
        })
    }
}