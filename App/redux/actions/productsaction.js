import {FETCHING_DATA_PRODUCTS, FETCHING_DATA_SUCCESS_PRODUCTS, FETCHING_DATA_FAILURE_PRODUCTS} from '../constants'
import {fetchProducts} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

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
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}