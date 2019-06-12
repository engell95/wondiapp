import {FETCHING_DATA_PRODUCTS, FETCHING_DATA_SUCCESS_PRODUCTS, FETCHING_DATA_FAILURE_PRODUCTS} from '../constants'
import {fetchProducts} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_PRODUCTS}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_PRODUCTS, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_PRODUCTS}
}

export const fetchDataProducts = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchProducts(id)
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