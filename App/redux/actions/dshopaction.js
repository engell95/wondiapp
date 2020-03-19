import {FETCHING_DATA_SHOP_D, FETCHING_DATA_SUCCESS_SHOP_D, FETCHING_DATA_FAILURE_SHOP_D} from '../constants'
import {fetchShopD,Postfavemp,deletefavemp} from '../api'
import { ToastActionsCreators } from 'react-native-redux-toast';
//import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SHOP_D}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SHOP_D, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SHOP_D}
}

export const fetchDataShopD = (data) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchShopD(data)
        .then(([response, json]) => {
            dispatch(getDataSuccess(json))
        })
        .catch((error) => {
            dispatch(ToastActionsCreators.displayError(error.toString()))
        })
    }
}

export const fecthPostfavemp = (data) => {
    return (dispatch) => {
        Postfavemp(data)
        .then(([response, json]) => {
            console.log(json)
            const success = `${JSON.stringify(json.success)}`;
            if (success == 'false') {
                 Toast.show({
                    text: I18n.t('validate.error2'),
                    buttonText: 'Ok'
                })
            }
            else{
                Toast.show({
                    text: I18n.t('validate.successshop'),
                    buttonText: 'Ok'
                })
            }
        })
        .catch((error) => {
            Toast.show({
                text: I18n.t('validate.error2'),
                buttonText: 'Ok'
            })
        })
    }
}

export const fecthdeletefavemp = (data) => {
    return (dispatch) => {
        deletefavemp(data)
        .then(([response, json]) => {
            console.log(json)
            const success = `${JSON.stringify(json.success)}`;
            if (success == 'false') {
                 Toast.show({
                    text: I18n.t('validate.error2'),
                    buttonText: 'Ok'
                })
            }
            else{
                Toast.show({
                    text: I18n.t('validate.deteleshop'),
                    buttonText: 'Ok'
                })
            }
        })
        .catch((error) => {
            Toast.show({
                text: I18n.t('validate.error2'),
                buttonText: 'Ok'
            })
        })
    }
}