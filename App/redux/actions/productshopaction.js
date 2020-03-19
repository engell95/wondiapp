import {FETCHING_DATA_SHOP_PRO, FETCHING_DATA_SUCCESS_SHOP_PRO, FETCHING_DATA_FAILURE_SHOP_PRO} from '../constants'
import {fetchProductShop} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SHOP_PRO}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SHOP_PRO, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SHOP_PRO}
}

export const fetchDataProductShop = (id) => {
    return (dispatch) => {
        dispatch(getData())
        fetchProductShop(id)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}