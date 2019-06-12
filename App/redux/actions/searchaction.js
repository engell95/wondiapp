import {FETCHING_DATA_SEARCH, FETCHING_DATA_SUCCESS_SEARCH, FETCHING_DATA_FAILURE_SEARCH} from '../constants'
import {fetchSearch} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_SEARCH}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_SEARCH, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_SEARCH}
}

export const fetchDataSearch = () => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchSearch()
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