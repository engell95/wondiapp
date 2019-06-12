import {FETCHING_DATA_CATEGORY, FETCHING_DATA_SUCCESS_CATEGORY, FETCHING_DATA_FAILURE_CATEGORY} from '../constants'
import {fetchCategory} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_CATEGORY}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_CATEGORY, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_CATEGORY}
}

export const fetchDataCategory = () => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchCategory()
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
