import {FETCHING_DATA_SHOP_D, FETCHING_DATA_SUCCESS_SHOP_D, FETCHING_DATA_FAILURE_SHOP_D} from '../constants'
import {fetchShopD} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SHOP_D}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SHOP_D, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SHOP_D}
}

export const fetchDataShopD = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchShopD(id)
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