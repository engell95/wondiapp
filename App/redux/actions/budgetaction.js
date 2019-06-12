import {FETCHING_DATA_BUDGET, FETCHING_DATA_SUCCESS_BUDGET, FETCHING_DATA_FAILURE_BUDGET} from '../constants'
import {fetchBudget} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_BUDGET}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_BUDGET, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_BUDGET}
}

export const fetchDataBudget = (id) => {
    return (dispatch) => {
        dispatch(getData())

        fetchBudget(id)
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