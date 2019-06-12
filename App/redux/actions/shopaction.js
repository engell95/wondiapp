import {FETCHING_DATA_SHOP, FETCHING_DATA_SUCCESS_SHOP, FETCHING_DATA_FAILURE_SHOP} from '../constants'
import {fetchShop} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SHOP}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SHOP, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SHOP}
}

export const fetchDataShop = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchShop(id)
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