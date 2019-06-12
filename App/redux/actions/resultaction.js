import {FETCHING_DATA_RESULT, FETCHING_DATA_SUCCESS_RESULT, FETCHING_DATA_FAILURE_RESULT} from '../constants'
import {fetchResult} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_RESULT}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_RESULT, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_RESULT}
}

export const fetchDataResult = (search) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchResult(search)
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
