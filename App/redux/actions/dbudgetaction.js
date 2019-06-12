import {FETCHING_DATA_BUDGET_D, FETCHING_DATA_SUCCESS_BUDGET_D, FETCHING_DATA_FAILURE_BUDGET_D} from '../constants'
import {fetchBudgetD} from '../api'
import {Toast} from 'native-base';
import I18n from '../../config/LanguageService';

export const getData = () => {
    return {type: FETCHING_DATA_BUDGET_D}
}

export const getDataSuccess = (data) => {
    return {type: FETCHING_DATA_SUCCESS_BUDGET_D, data}
}

export const getDataFailure = (data) => {
    return {type: FETCHING_DATA_FAILURE_BUDGET_D}
}

export const fetchDataBudgetDet = (id) => {
    return (dispatch) => {
        
        dispatch(getData())

        fetchBudgetD(id)
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